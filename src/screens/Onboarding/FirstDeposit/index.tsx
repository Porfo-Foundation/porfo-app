import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
const {width, height} = Dimensions.get('screen');
import Logo from '../../../assets/icons/svg/logo.svg';
import {updateUserAddress} from '../../../redux/features/authSlice';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import Clipboard from '@react-native-clipboard/clipboard';
import Copy from '../../../assets/icons/svg/copy.svg';
import DonutChart from '../DonutChart';
import QRCode from 'react-native-qrcode-svg';
import colors from '../../../../config/colors';
import {togglePopup, updatepopupName} from '../../../redux/features/popupSlice';
import LottieView from 'lottie-react-native';
import {colorThemes} from '../../../constants/themeData';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const FirstDeposit = ({next, handleEnd, screenIndex}: any) => {
  const [timer, setTimer] = useState(60);
  const {selectedTheme} = useAppSelector(state => state.selectedTheme);
  useEffect(() => {
    const interval = setInterval(() => {
      if (screenIndex === 5) {
        if (timer > 0) {
          setTimer(prevCount => prevCount - 1);
        } else {
          clearInterval(interval);
        }
      }
    }, 1000);
    return clearInterval(interval);
  }, [timer, screenIndex]);
  const dispatch = useAppDispatch();
  const {smartAccountAddress} = useAppSelector(state => state.auth);
  const finish = () => {
    dispatch(updateUserAddress(smartAccountAddress));
    handleEnd();
  };
  return (
    <View className="justify-between h-full flex" style={{width: width}}>
      <LottieView
        source={require('../../../assets/lottie/DepositSavings.json')}
        autoPlay
        loop
        style={{width: width, height: '50%'}}
      />
      <View>
        {/* <Text
          className="font-[PlusJakartaSans-SemiBold] text-3xl mt-[-40px]"
          style={{color: colorThemes[selectedTheme].textPrimary}}>
          The First Deposit
        </Text> */}
        {/* <Text className="font-[PlusJakartaSans-SemiBold] text-md text-[#999999] mt-2">
          Usually the hardest, but necessary step. Deposit your first dollar on
          the below address.
        </Text> */}
        <View className="flex-row items-center w-full justify-between -mt-10">
          <View
            className="rounded-r-full w-[75%] items-center h-10 justify-center"
            style={{backgroundColor: colorThemes[selectedTheme].textSecondary}}>
            <Text className="font-[PlusJakartaSans-semiBold] text-sm text-[#FFFFFF] opacity-80">
              {`${
                smartAccountAddress?.slice(0, 12) +
                '..........' +
                smartAccountAddress?.slice(-12)
              }`}
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            className="px-3 rounded-l-lg w-[20%] h-10 justify-center"
            style={{backgroundColor: colorThemes[selectedTheme].textSecondary}}
            onPress={() => {
              if (smartAccountAddress) {
                Clipboard.setString(smartAccountAddress);
              }
            }}>
            <Copy />
          </TouchableOpacity>
        </View>
        {/* <View className="flex flex-row justify-center mt-8">
          <QRCode
            value={`${smartAccountAddress}`}
            size={200}
            color={colors.neutral[100]}
            backgroundColor="#0D2B59"
          />
        </View> */}
      </View>
      {/* <View className="flex-row gap-x-2 justify-center mt-8 items-center">
        <Text className="font-[PlusJakartaSans-SemiBold] text-xs text-[#ffffff] text-center">
          New to crypto world?
        </Text>
        <Pressable
          onPress={() => {
            dispatch(updatepopupName('SwapCoins'));
            dispatch(togglePopup());
          }}>
          <Text className="font-[PlusJakartaSans-SemiBold] text-sm text-[#e14726] text-center">
            BUY NOW
          </Text>
        </Pressable>
      </View> */}
      {/* <View className="flex items-center my-4 flex-row justify-center gap-x-4 hidden">
        <DonutChart
          color="#7C2DDC"
          min={timer}
          max={60}
          radius={20}
          strokeWidth={10}
        />
        <Text className="font-[PlusJakartaSans-SemiBold] text-xs text-[#999999] text-center mt-1">
          Waiting for your first coin deposit
        </Text>
      </View> */}
      {/* <View className="flex flex-row items-center justify-between">
        <Logo />
        <View className="flex flex-row gap-x-4 items-center mb-2">
          <TouchableOpacity
            className="border border-[#4845F8] px-8 py-3 rounded-full"
            onPress={finish}>
            <Text className="font-[PlusJakartaSans-SemiBold] text-sm text-[#FFFFFF]">
              Skip
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-[#4845F8] px-8 py-3 rounded-full"
            onPress={finish}>
            <Text className="font-[PlusJakartaSans-SemiBold] text-sm text-[#FFFFFF]">
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </View> */}
      <View className="w-full p-5">
        <Text
          className="font-[PlusJakartaSans-SemiBold] text-2xl"
          style={{color: colorThemes[selectedTheme].textPrimary}}>
          Your Identity
        </Text>
        <Text
          className="font-[PlusJakartaSans-SemiBold] text-xs mt-2"
          style={{color: colorThemes[selectedTheme].textMuted}}>
          Claim Your Identity
        </Text>
        <Text
          className="font-[PlusJakartaSans-SemiBold] text-xs"
          style={{color: colorThemes[selectedTheme].textMuted}}>
          Use your unique identity to explore Web3
        </Text>
        <View
          className="w-full flex flex-row rounded-full h-10 items-center mt-3"
          style={{
            backgroundColor: colorThemes[selectedTheme].textPrimary,
          }}>
          <TextInput
            autoCapitalize="none"
            placeholder="Enter UserName"
            placeholderTextColor="gray"
            className="font-[PlusJakartaSans-SemiBold] w-[80%] text-lg h-full px-4"
            style={{color: colorThemes[selectedTheme].textDefault}}
          />
          <View className="w-16 h-full rounded-r-full justify-center">
            <Text
              className="font-[PlusJakartaSans-SemiBold] text-lg"
              style={{color: colorThemes[selectedTheme].textSecondary}}>
              .porfo
            </Text>
          </View>
        </View>
        <Text
          className="font-[PlusJakartaSans-SemiBold] text-xs ml-4 mt-1"
          style={{color: colorThemes[selectedTheme].successGreen}}>
          Username Available
        </Text>
        <Text
          className="font-[PlusJakartaSans-SemiBold] text-lg mt-3"
          style={{color: colorThemes[selectedTheme].textTertiary}}>
          Main Wallet
        </Text>
        <Text
          className="font-[PlusJakartaSans-SemiBold] text-xs mt-2"
          style={{color: colorThemes[selectedTheme].textPrimary}}>
          main@username.porfo
        </Text>
        <Text
          className="font-[PlusJakartaSans-SemiBold] text-lg mt-3"
          style={{color: colorThemes[selectedTheme].textTertiary}}>
          Vault
        </Text>
        <Text
          className="font-[PlusJakartaSans-SemiBold] text-xs mt-2"
          style={{color: colorThemes[selectedTheme].textPrimary}}>
          vault@username.porfo
        </Text>
        <TouchableOpacity
          onPress={finish}
          className="w-full h-10 rounded-full justify-center items-center mt-5"
          style={{backgroundColor: colorThemes[selectedTheme].textSecondary}}>
          <Text
            className="font-[PlusJakartaSans-SemiBold] text-lg"
            style={{color: colorThemes[selectedTheme].textPrimary}}>
            Go To Dashboard
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FirstDeposit;
