import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import React from 'react';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';

import DocumentPicker from 'react-native-document-picker';

import Logo from '../../../assets/icons/svg/logo.svg';
import {useAppSelector} from '../../../redux/hooks';
import {ToastShowShort} from '../../../utils/toast';
import LottieView from 'lottie-react-native';
import LocateFile from '../../../assets/lottie/ShareFile.json';

const {width, height} = Dimensions.get('screen');

const VerifyRecovery = ({next}: any) => {
  const {filePath} = useAppSelector(state => state.fileShare);
  const shareRecoveryFile = async () => {
    // Define the share options
    const shareOptions = {
      title: 'Share .rcv File',
      url: `file://${filePath}`,
      type: 'application/octet-stream',
    };
    try {
      await Share.open(shareOptions);
    } catch (error) {
      console.log('error...', error);
      ToastShowShort('' + error);
    }
  };
  const pickRecoveryFile = async () => {
    try {
      const fileRes = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });
      await RNFS.readFile(fileRes.uri);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View
      className="justify-between h-full pb-6 flex"
      style={{width: width, height: height}}>
      <LottieView
        source={require('../../../assets/lottie/ShareFile.json')}
        autoPlay
        loop
        style={{width: width, height: '50%'}}
      />
      <View className="px-6">
        <Text className="font-[PlusJakartaSans-Bold] text-3xl text-[#FFFFFF]">
          Include Loved Ones
        </Text>
        <Text className="font-[PlusJakartaSans-SemiBold] text-md text-[#fff] mt-2">
          Involve people you trust to help you recover your wallet by entrusting
          them with your recovery file
        </Text>
        <View className="flex flex-row gap-x-[7%] justify-center">
          <TouchableOpacity
            onPress={pickRecoveryFile}
            className="flex-column justify-around py-3 bg-background-200 rounded-lg mt-4 w-[40%] items-center ">
            <LottieView
              source={LocateFile}
              autoPlay
              loop={false}
              style={{width: 50, height: 50}}
            />
            <Text className="font-[PlusJakartaSans-SemiBold] text-sm text-[#FFFFFF] ml-2">
              Locate File
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={shareRecoveryFile}
            className="flex-column justify-around bg-background-200 rounded-lg mt-4 w-[40%] items-center">
            <LottieView
              source={require('../../../assets/lottie/Share.json')}
              autoPlay
              loop={false}
              style={{width: 100, height: 100}}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex flex-row items-center justify-between pt-4">
        <Logo />
        <TouchableOpacity
          className={`${
            false ? 'bg-typography-alternate' : 'bg-[#4845F8]'
          } px-8 py-3 rounded-full mb-1`}
          onPress={next}>
          <Text className="font-[PlusJakartaSans-SemiBold] text-sm text-[#FFFFFF]">
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VerifyRecovery;
