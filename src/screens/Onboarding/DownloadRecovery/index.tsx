import {View, Text, Dimensions, TouchableOpacity, Platform} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppSelector} from '../../../redux/hooks';
import RNFS from 'react-native-fs';
import CryptoJS from 'crypto-js';
import {check, PERMISSIONS, request} from 'react-native-permissions';
import {updateFilePath} from '../../../redux/features/fileShareSlice';
import {useAppDispatch} from '../../../redux/hooks';

import {hasJsonStructure} from '../../../utils/helperFunctions';
import {ToastShowShort} from '../../../utils/toast';
// import {localAuthentication} from '../../../helpers/localAuthentication';

const {width} = Dimensions.get('screen');
// const keyboardDigits = Array.from({length: 10}, (_, idx) => idx).sort(
//   () => Math.random() - 0.5,
// );

const DownloadRecovery = ({next}: any) => {
  const dispatch = useAppDispatch();
  const {keywords, MPIN} = useAppSelector(state => state.onBoarding);
  const [externalStoragePermission, setExternalStoragePermission] =
    useState('');

  const [fileData, setFileData] = useState('');
  const [enterMPIN, setEnterMPIN] = useState(false);
  const [MPin, setMPin] = useState(['', '', '', '', '', '']);
  const [showMPin, setShowMPin] = useState(['', '', '', '', '', '']);

  useEffect(() => {
    if (Platform.OS === 'android' && Platform.Version >= 30) {
      setExternalStoragePermission('granted');
    } else if (Platform.OS === 'ios') {
      setExternalStoragePermission('granted');
    } else {
      check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then(permision => {
        setExternalStoragePermission(permision);
        if (permision !== 'granted') {
          request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
        }
      });
      // request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
    }
  }, []);

  // useEffect to verify
  useEffect(() => {
    const decryptFileData = async () => {
      try {
        const bytes = CryptoJS.AES.decrypt(fileData, MPin.join(''));
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        if (!originalText || hasJsonStructure(originalText)) {
          const KeywordsArray = JSON.parse(originalText);
          if (
            KeywordsArray[0] === keywords[0] &&
            KeywordsArray[1] === keywords[1]
          ) {
            ToastShowShort('Recovery File Verified');
            next();
          } else {
            ToastShowShort('Wrong MPIN or File');
          }
        }
      } catch (e) {
        ToastShowShort('Wrong MPIN or File');
        console.log(e);
      }
    };
    if (MPin.join('').length === 6) {
      decryptFileData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [MPin, fileData]);

  const downloadRecoveryFile = async () => {
    try {
      const fileName = `porfo_${Math.random()
        .toString(36)
        .substring(2, 7)}.rcv`;
      let path =
        (Platform.OS === 'android'
          ? RNFS.DownloadDirectoryPath
          : RNFS.DocumentDirectoryPath) +
        '/' +
        fileName;
      // save file name in redux
      dispatch(updateFilePath(path));
      if (!keywords[0] || !keywords[1]) {
        ToastShowShort('Something went wrong');
      }
      const string = CryptoJS.AES.encrypt(
        JSON.stringify(keywords),
        MPIN,
      ).toString();
      await RNFS.writeFile(path, string, 'utf8');
      ToastShowShort('File Downloaded');
      // now verify recovery fil
      setTimeout(() => {
        verifyRecoveryFile(path);
      }, 2000);

      //TODO: Try to add this show download folder
      // await Linking.sendIntent('android.intent.action.VIEW', {
    } catch (e) {
      ToastShowShort('Something went wrong');
      console.log('inside catch block download error:.... ' + e);
    }
  };

  // verify downloaded file
  const verifyRecoveryFile = async (filePath: string) => {
    try {
      // const fileRes = await DocumentPicker.pickSingle({
      //   type: [DocumentPicker.types.allFiles],
      // });
      const data = await RNFS.readFile(filePath, 'utf8');
      setFileData(data);
      setEnterMPIN(true);
    } catch (e) {
      console.log(e);
    }
  };
  // grant permision to access external storage
  const givePermision = () => {
    request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
    check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then(permision => {
      setExternalStoragePermission(permision);
    });
  };

  return (
    <View className="w-screen h-full">
      {externalStoragePermission === 'granted' ? (
        <View className="justify-between h-full flex" style={{width: width}}>
          {!enterMPIN ? (
            <View className="px-6">
              <Text className="font-[PlusJakartaSans-SemiBold] text-xl text-[#FFFFFF] text-center">
                Download your recovery File
              </Text>
              <Text className="font-[PlusJakartaSans-SemiBold] text-xs text-[#999999] text-center mt-1">
                You will need this file to recover your wallet in case you
                forget your keywords
              </Text>
              <TouchableOpacity
                onPress={downloadRecoveryFile}
                className="flex-row justify-center py-3 border border-[#505050] bg-background-200 rounded-md mt-4 ">
                {/* <Save fill={colors.neutral[100]} /> */}
                <Text className="text-[#ffffff] font-[PlusJakartaSans-SemiBold] text-lg text-center">
                  Download
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View className="flex-1 flex justify-between">
              <View className="mt-6 px-6">
                <Text className="font-[PlusJakartaSans-SemiBold] text-base text-[#FEFDFD] mb-1">
                  Enter MPIN
                </Text>
                <View className="flex-row items-center">
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
              <View className="bg-background-200 flex-row flex-wrap gap-y-3 rounded-t-3xl ml-0 pb-8">
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
          )}
        </View>
      ) : (
        <View className="w-full">
          <TouchableOpacity
            onPress={givePermision}
            className="w-full flex-row justify-center py-3 border border-[#505050] bg-background-200 rounded-md mt-4">
            {/* <Save fill={colors.neutral[100]} /> */}
            <Text className="font-[PlusJakartaSans-SemiBold] text-neutral-100 text-lg text-center">
              Give Permission to access
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default DownloadRecovery;
