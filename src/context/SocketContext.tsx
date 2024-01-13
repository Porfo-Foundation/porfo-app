import React, {createContext, useContext, useEffect, useState} from 'react';
import socketio from 'socket.io-client';
import {socketAPI} from '../config/config';
import {randomString} from '../utils/helperFunctions';
import {Wallet} from 'ethers';
import {ToastAndroid} from 'react-native';
import {useAppSelector} from '../redux/hooks';
import {createWalletFromPrivateKey} from '../helpers/wallet';
import {useRealm} from '../realm';
import {addChat} from '../realm/services/chat.service';

const getNonceAndSignature = async (wallet: Wallet | null) => {
  const nonce = randomString();
  const signature = await wallet?.signMessage(nonce);
  return {
    nonce: nonce,
    signature: signature,
  };
};
// Function to establish a socket connection with authorization token
const getSocket = async (wallet: Wallet | null) => {
  const auth = await getNonceAndSignature(wallet);

  // Create a socket connection with the provided URI and authentication
  const socket = socketio(socketAPI, {
    withCredentials: true,
    autoConnect: true,
    auth: auth,
  });
  return socket;
};

// Create a context to hold the socket instance
const SocketContext = createContext<{
  socket: ReturnType<typeof socketio> | null;
}>({
  socket: null,
});

// Custom hook to access the socket instance from the context
const useSocket = () => useContext(SocketContext);
// SocketProvider component to manage the socket instance and provide it through context
const SocketProvider = ({children}: {children: React.ReactNode}) => {
  // State to store the socket instance
  const [socket, setSocket] = useState<ReturnType<typeof socketio> | null>(
    null,
  );

  const {privateKey} = useAppSelector(state => state.auth);
  // Set up the socket connection when the component mounts
  useEffect(() => {
    if (!privateKey) {
      return;
    }
    const socketSetter = async () => {
      const wallet = await createWalletFromPrivateKey(privateKey);
      setSocket(await getSocket(wallet));
    };
    socketSetter();
  }, [privateKey]);

  //get realm DB
  const realm = useRealm();
  // mount and unmount listeners
  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on('connect', () => {
      // realm.write(() => {
      //   realm.deleteAll();
      // });
      console.log('connected');
    });

    socket.on('ai-message', async (data: any) => {
      // console.log('chat-message', data);
      // dispatch(updateChats(data));
      // const saved =
      await addChat(realm, data);
      // console.log('saved Chat Message', saved);
    });

    socket.on('socket-error-event', errMsg => {
      console.log('socket-error-event', errMsg);
      ToastAndroid.show(errMsg, ToastAndroid.SHORT);
    });

    socket.on('disconnect', () => {
      console.log('socket disconnected');
    });
    return () => {
      socket.off('connect');
      socket.off('chat-message');
      socket.off('socket-error-event');
      socket.off('disconnect');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);
  return (
    <SocketContext.Provider value={{socket}}>{children}</SocketContext.Provider>
  );
};

// Export the SocketProvider component and the useSocket hook for other components to use
export {SocketProvider, useSocket};
