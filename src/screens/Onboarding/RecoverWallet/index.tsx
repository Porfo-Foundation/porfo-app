import {View, Text, Dimensions, TouchableOpacity, Modal} from 'react-native';
import React, {useEffect, useState} from 'react';
import RNFS from 'react-native-fs';
import CryptoJS from 'crypto-js';
import DocumentPicker from 'react-native-document-picker';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {hasJsonStructure} from '../../../utils/helperFunctions';
import {toggleLoader} from '../../../redux/features/popupSlice';
import {createSmartAccount, createWallet} from '../../../helpers/wallet';
import {addSmartAccount, checkSmartAccount} from '../../../apiCalls/auth';
import {updateWalletAddress} from '../../../redux/features/authSlice';
import {
  updatePrivateKey,
  updateSmartAccountAddress,
} from '../../../redux/features/authSlice';
import {ToastShowShort} from '../../../utils/toast';
import {updateFileRecovered} from '../../../redux/features/fileShareSlice';
// import {localAuthentication} from '../../../helpers/localAuthentication';
const {width} = Dimensions.get('screen');

const RecoverWallet = ({next}: any) => {
  const dispatch = useAppDispatch();
  const {customerObject} = useAppSelector(state => state.onBoarding);
  const {isFileRecovered} = useAppSelector(state => state.fileShare);
  const [fileData, setFileData] = useState('');
  const [enterMPIN, setEnterMPIN] = useState(false);
  const [MPin, setMPin] = useState(['', '', '', '', '', '']);
  const [showMPin, setShowMPin] = useState(['', '', '', '', '', '']);

  useEffect(() => {
    const decryptFileData = async () => {
      try {
        const bytes = CryptoJS.AES.decrypt(fileData, MPin.join(''));
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        if (!originalText || hasJsonStructure(originalText)) {
          const KeywordsArray = JSON.parse(originalText);
          if (KeywordsArray.length === 2) {
            dispatch(toggleLoader());
            const wallet = await createWallet(
              customerObject.user.id!,
              KeywordsArray,
            );
            if (!wallet) {
              return;
            }
            //saving wallet address to redux
            dispatch(updateWalletAddress(wallet.address));
            const smartAccount = await createSmartAccount(wallet, 5);
            if (!smartAccount) {
              return;
            }
            let address = await smartAccount.getAccountAddress();
            if (!address) {
              return;
            }
            const {isSmartAccountValid} = await checkSmartAccount(
              address.toLowerCase(),
            );
            if (!isSmartAccountValid) {
              ToastShowShort('No Smart Account Found, Creating new Account');
              addSmartAccount(address.toLowerCase());
            }
            dispatch(updateSmartAccountAddress(address.toLowerCase()));
            dispatch(updateWalletAddress(wallet.address.toLowerCase()));
            dispatch(updatePrivateKey(wallet.privateKey));
            dispatch(toggleLoader());
            ToastShowShort('Recovery File Verified');
            setEnterMPIN(false);
            next();
          } else {
            ToastShowShort('Wrong MPIN or File');
          }
        }
      } catch (e) {
        ToastShowShort('Wrong MPIN or File');
        dispatch(toggleLoader());
        console.log(e);
      }
    };
    if (MPin.join('').length === 6) {
      decryptFileData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [MPin]);

  const pickRecoveryFile = async () => {
    try {
      const fileRes = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });
      const data = await RNFS.readFile(fileRes.uri, 'utf8');
      setFileData(data);
      setEnterMPIN(true);
      dispatch(updateFileRecovered(false));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (isFileRecovered) {
      pickRecoveryFile();
    }
  }, []);

  return (
    <View className="w-screen h-full" style={{width: width}}>
      <View className="flex-1 flex flex-col">
        {!enterMPIN ? (
          <View className="w-full">
            <Text className="font-[PlusJakartaSans-SemiBold] text-xl text-[#FFFFFF] text-center mt-6">
              Verify Recovery File
            </Text>
            <TouchableOpacity
              onPress={pickRecoveryFile}
              className="flex-row justify-center py-3 border border-[#505050] bg-background-200 rounded-md mt-4 mx-6">
              {/* <Save fill={colors.neutral[100]} /> */}
              <Text className="text-[#ffffff] font-[PlusJakartaSans-SemiBold] text-lg text-center">
                Select File
              </Text>
            </TouchableOpacity>
            <View className="flex flex-row justify-center items-center mt-4">
              <Text className="text-semantic-warning">
                * File should start with Porfo
              </Text>
            </View>
          </View>
        ) : (
          <Modal
            animationType="slide"
            transparent={true}
            visible={enterMPIN}
            onRequestClose={() => setEnterMPIN(false)}>
            <View className="flex justify-between absolute top-auto bottom-0 left-0 right-0 border-t-2 border-neutral-900 rounded-tl-2xl rounded-tr-2xl">
              <View className="mt-6 px-6">
                <Text className="font-[PlusJakartaSans-SemiBold] text-base text-[#FEFDFD] mb-1">
                  Enter MPIN
                </Text>
                <View className="flex-row items-center mt-4">
                  {Array(6)
                    .fill(' ')
                    .map((_, idx) => (
                      <View
                        className="bg-[#2E304E] rounded-md border border-[#393B57] flex flex-row items-center px-2 flex-1 mr-2 h-12 justify-center"
                        key={idx}>
                        <Text className="font-[PlusJakartaSans-SemiBold] text-[#ffffff]">
                          {showMPin[idx]}
                        </Text>
                      </View>
                    ))}
                </View>
              </View>
              <View className="bg-background-200 flex-row flex-wrap gap-y-3 rounded-t-3xl ml-0 pb-8 mt-5">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit, idx) => (
                  <TouchableOpacity
                    onPress={() => {
                      const emptyIndex = MPin.findIndex(item => item === '');
                      if (emptyIndex !== -1) {
                        const updatedArray = [...MPin];
                        const showUpdatedArray = [...showMPin];
                        updatedArray[emptyIndex] = digit.toString();
                        showUpdatedArray[emptyIndex] = '*';
                        setMPin(updatedArray);
                        setShowMPin(showUpdatedArray);
                      }
                    }}
                    key={idx}
                    style={{width: width / 3}}
                    className="flex-row justify-center py-3 rounded-md">
                    <Text className="text-[#ffffff] font-[PlusJakartaSans-SemiBold] text-lg">
                      {digit}
                    </Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity
                  onPress={() => {
                    const emptyIndex = MPin.findIndex(item => item === '');
                    if (emptyIndex === -1) {
                      const updatedArray = [...MPin];
                      const showUpdatedArray = [...showMPin];
                      updatedArray[MPin.length - 1] = '';
                      showUpdatedArray[showMPin.length - 1] = '';
                      setMPin(updatedArray);
                      setShowMPin(showUpdatedArray);
                    } else {
                      const updatedArray = [...MPin];
                      const showUpdatedArray = [...showMPin];
                      updatedArray[emptyIndex - 1] = '';
                      showUpdatedArray[emptyIndex - 1] = '';
                      setMPin(updatedArray);
                      setShowMPin(showUpdatedArray);
                    }
                  }}
                  style={{width: width / 3}}
                  className="flex-row justify-center py-3 rounded-md">
                  <Text className="text-[#ffffff] font-[PlusJakartaSans-SemiBold] text-lg">
                    x
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    const digit = 0;
                    const emptyIndex = MPin.findIndex(item => item === '');
                    if (emptyIndex !== -1) {
                      const updatedArray = [...MPin];
                      const showUpdatedArray = [...showMPin];
                      updatedArray[emptyIndex] = digit.toString();
                      showUpdatedArray[emptyIndex] = '*';
                      setMPin(updatedArray);
                      setShowMPin(showUpdatedArray);
                    }
                  }}
                  style={{width: width / 3}}
                  className="flex-row justify-center py-3 rounded-md">
                  <Text className="text-[#ffffff] font-[PlusJakartaSans-SemiBold] text-lg">
                    0
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {}}
                  style={{width: width / 3}}
                  className="flex-row justify-center py-3 rounded-md">
                  <Text className="text-[#ffffff] font-[PlusJakartaSans-SemiBold] text-lg"></Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
      </View>
    </View>
  );
};

export default RecoverWallet;
