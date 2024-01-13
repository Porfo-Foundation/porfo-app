import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  Dimensions,
  Keyboard,
  ImageBackground,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {useQuery, useRealm} from '../../../realm';
import Send from '../../../assets/icons/svg/send-icon.svg';
import FromChat from './FromChat';
import ToChat from './ToChat';
// import DashboardLayout from '../DashboardLayout';
import {getDate, getTodaysDate} from '../../../utils/getDate';
import CustomLoadingAnimation from '../../../components/common/CustomLoadingAnimation';

import {useSocket} from '../../../context/SocketContext';
import {Chat} from '../../../realm/schema/chat.schema';
import {addChat} from '../../../realm/services/chat.service';
import {useAppSelector} from '../../../redux/hooks';
import {randomString} from '../../../utils/helperFunctions';
import {ToastShowShort} from '../../../utils/toast';
import {colorThemes} from '../../../constants/themeData';
import SendTransaction from './SendTransaction';
import BuyTransaction from './BuyTransaction';
import TimelineUpdates from './NewsUpdates';
// const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

let previousDate = '';
let isNewDate = true;

const Chatbot = () => {
  const [chatInput, setChatInput] = useState('');
  const [chatText, setChatText] = useState('');
  const [theeDotLoader, setThreeDotLoader] = useState<boolean>(false);
  const [isDisable, setIsDisable] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const {smartAccountAddress} = useAppSelector(state => state.auth);
  const {socket} = useSocket();
  // const [AllChats, setAllChats] = useState<Realm.Results<Chat>>();
  const realm = useRealm();
  const chats = useQuery(Chat).sorted('timeStamp');
  //Add event listener for keyboard open
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        scrollViewRef.current!.scrollToEnd({animated: true});
      },
    );

    return () => {
      // Remove the event listener when component unmounts
      keyboardDidShowListener.remove();
    };
  }, []);
  const handleSend = async () => {
    try {
      if (!socket?.connected) {
        return ToastShowShort(
          'Please check your internet connection (or Login again)',
        );
      }
      if (chatInput !== '') {
        setChatText(chatInput);
        setChatInput('');
        // setIsDisable(true);
        // setThreeDotLoader(true);
        const last3Msgs = chats
          ?.slice(-5)
          ?.map(chat => {
            const timeDiff = Date.now() - chat?.timeStamp;
            if (chat && timeDiff < 1000 * 60 * 5) {
              return {
                role: chat.role,
                content: chat.msg ? chat.msg : chat.data,
              };
            }
          })
          .filter(Boolean);
        socket?.emit('chat-message', [
          ...last3Msgs,
          {role: 'user', content: chatInput},
        ]);
        addChat(realm, {
          msg: chatInput,
          userAddress: smartAccountAddress,
          role: 'user',
          timeStamp: Date.now(),
          status: 'pending',
          type: 'user',
          taskId: randomString(10),
        });
      }
    } catch (error) {
      ToastShowShort('chat response error');
      setThreeDotLoader(false);
      setIsDisable(false);
    }
  };
  const {selectedTheme} = useAppSelector(state => state.selectedTheme);
  return (
    <View className="h-full bg-[#171717]">
      <ImageBackground
        source={require('../../../assets/images/ai-background-image.png')}
        className="w-full h-full">
        <KeyboardAvoidingView className="h-full">
          <View className="h-full justify-between">
            <Image
              source={require('../../../assets/images/ask-porfo-header.png')}
              className="-mt-4"
            />
            <View className="pr-2 pt-2 absolute top-16 right-0 w-screen">
              <ScrollView
                className="px-2"
                style={{height: height - 120}}
                // eslint-disable-next-line react-native/no-inline-styles
                contentContainerStyle={{paddingBottom: 12}}
                ref={scrollViewRef}
                showsVerticalScrollIndicator={false}
                onContentSizeChange={() => {
                  scrollViewRef.current?.scrollToEnd({animated: true});
                }}>
                {chats?.map((chat, index: number) => {
                  const date = getDate(chat.timeStamp);
                  if (previousDate !== date) {
                    previousDate = date;
                    isNewDate = true;
                  } else {
                    isNewDate = false;
                  }

                  return (
                    <View key={index} className="w-fit h-fit">
                      {isNewDate && (
                        <Text
                          className="self-center mb-4 mt-4"
                          style={{
                            color: colorThemes[selectedTheme].textTertiary,
                          }}>
                          {date === getTodaysDate() ? 'Today' : date}
                        </Text>
                      )}
                      {chat.role === 'user' ? (
                        <ToChat
                          text={chat.msg}
                          timeStamp={chat.timeStamp}
                          avatar={
                            chats[index + 1]?.role !== 'user' ? true : false
                          }
                        />
                      ) : (
                        <FromChat
                          type={chat.type}
                          msg={chat.msg}
                          data={chat.data}
                          timeStamp={chat.timeStamp}
                          taskId={chat.taskId}
                          status={chat.status}
                          avatar={
                            chats[index + 1]?.role !== 'bot' ? true : false
                          }
                        />
                      )}
                    </View>
                  );
                })}
                {theeDotLoader && (
                  <>
                    <ToChat text={chatText} timeStamp={Date.now()} />
                    <CustomLoadingAnimation />
                  </>
                )}
              </ScrollView>
            </View>
            <View
              className="rounded-lg flex flex-row items-center px-2 m-2 h-12"
              style={{
                backgroundColor: colorThemes[selectedTheme].buttonBackground,
              }}>
              <TextInput
                placeholder="Ask anything to AI"
                className="font-[PlusJakartaSans-semiBold] text-[#FFFFFF] flex-1 h-full"
                placeholderTextColor="#c0bfc9"
                value={chatInput}
                onChangeText={text => {
                  setChatInput(text);
                }}
              />
              <TouchableOpacity onPress={handleSend} disabled={isDisable}>
                <Image
                  source={require('../../../assets/images/ai-send-button.png')}
                  className="w-7 h-7"
                />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};

export default Chatbot;
