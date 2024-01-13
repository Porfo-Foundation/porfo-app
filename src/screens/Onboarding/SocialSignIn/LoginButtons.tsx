import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  Image,
  Dimensions,
} from 'react-native';
import React, {useEffect} from 'react';

import Whatsapp from '../../../assets/icons/svg/whatsapp.svg';
import Google from '../../../assets/icons/svg/google-login.svg';
import {useNotp} from '../../../hooks/useNotp';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {toggleLoader} from '../../../redux/features/popupSlice';
import {loginWithNOTP} from '../../../apiCalls/auth';
import {loginWithGoogle} from '../../../apiCalls/auth';
import {
  updateCustomerObject,
  updateIsRecoveryAvailable,
} from '../../../redux/features/onBoardingSlice';
import {updateTokens} from '../../../redux/features/authSlice';
import {colorThemes} from '../../../constants/themeData';
import LottieView from 'lottie-react-native';
const {width} = Dimensions.get('screen');

const LoginButtons = ({next}: any) => {
  const dispatch = useAppDispatch();
  const {selectedTheme} = useAppSelector(state => state.selectedTheme);
  const {notpLinkData, notpCheckData, startCheck} = useNotp();
  const handleNotpLogin = async () => {
    try {
      console.log('Loging in With NOTP');
      Linking.openURL(notpLinkData.waLink);
      dispatch(toggleLoader());
      startCheck(notpLinkData.org);
    } catch (e) {
      console.log('handlenotplogin..catch');
      console.log(e);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      dispatch(toggleLoader());
      console.log('Loging in With Google');
      const customerData = await loginWithGoogle();
      dispatch(toggleLoader());
      dispatch(updateTokens(customerData.tokens));
      dispatch(updateCustomerObject(customerData));
      dispatch(updateIsRecoveryAvailable(customerData.isRecoveryAvailable));
      next();
    } catch (e) {
      console.log(e);
      dispatch(toggleLoader());
    }
  };

  useEffect(() => {
    const handleNotpVerificationSuccess = async () => {
      try {
        if (notpCheckData.waId) {
          console.log('NOTP Verification Success');
          const customerData = await loginWithNOTP(
            notpCheckData.waId,
            notpCheckData.waProfile.name,
          );
          dispatch(toggleLoader());
          dispatch(updateTokens(customerData.tokens));
          dispatch(updateCustomerObject(customerData));
          dispatch(updateIsRecoveryAvailable(customerData.isRecoveryAvailable));
          next();
        }
      } catch (e) {
        console.log(e);
      }
    };
    handleNotpVerificationSuccess();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notpCheckData]);

  return (
    <View
      className="px-5 h-screen relative justify-between"
      style={{backgroundColor: colorThemes[selectedTheme].background}}>
      <LottieView
        source={require('../../../assets/lottie/UserLogin.json')}
        autoPlay
        loop
        style={{width: width, height: '50%'}}
      />
      <Text
        className="font-[PlusJakartaSans-Bold] text-3xl"
        style={{color: colorThemes[selectedTheme].textPrimary}}>
        Enter with style
      </Text>
      <Text
        className="font-[PlusJakartaSans-semiBold] mt-2"
        style={{color: colorThemes[selectedTheme].textPrimary}}>
        Forget fear of forgetting keys and remove burden of remembering long
        keys
      </Text>
      <View className="w-full flex flex-row justify-center gap-x-5 mt-5">
        <TouchableOpacity
          className="w-10 h-10 justify-center items-center rounded-md border-2 border-neutral-100"
          onPress={handleNotpLogin}>
          <Image
            source={require('../../../assets/images/whatsapp-login.png')}
            className="w-8 h-8"
          />
        </TouchableOpacity>
        <TouchableOpacity
          className="w-10 h-10 justify-center items-center rounded-md border-2 border-neutral-100"
          onPress={handleGoogleLogin}>
          <Image
            source={require('../../../assets/images/google-login.png')}
            className="w-8 h-8"
          />
        </TouchableOpacity>
        <TouchableOpacity className="w-10 h-10 justify-center items-center rounded-md border-2 border-neutral-100 opacity-30">
          <Image
            source={require('../../../assets/images/x-login.png')}
            className="w-8 h-8"
          />
        </TouchableOpacity>
        <TouchableOpacity className="w-10 h-10 justify-center items-center rounded-md border-2 border-neutral-100 opacity-30">
          <Image
            source={require('../../../assets/images/discord-login.png')}
            className="w-8 h-8"
          />
        </TouchableOpacity>
      </View>
      <View className="w-full flex flex-row items-center justify-center px-2 gap-x-2 mt-4">
        <View
          className="w-[40%] h-[0.5px]"
          style={{
            backgroundColor: colorThemes[selectedTheme].textMuted,
          }}
        />
        <Text
          className="font-[PlusJakartaSans-semiBold]"
          style={{color: colorThemes[selectedTheme].textPrimary}}>
          or
        </Text>
        <View
          className="w-[40%] h-[0.5px]"
          style={{
            backgroundColor: colorThemes[selectedTheme].textMuted,
          }}
        />
      </View>
      <View className="w-full h-20 rounded-md justify-center px-2 mt-2 bg-[#2D2D2D]">
        <Text
          className="font-[PlusJakartaSans-semiBold]"
          style={{color: colorThemes[selectedTheme].textMuted}}>
          Import using seed phrase
        </Text>
      </View>
      <TouchableOpacity
        className="py-3 rounded-full mb-2 mt-5"
        activeOpacity={0.7}
        style={{
          backgroundColor: colorThemes[selectedTheme].textSecondary,
        }}>
        <Text
          className="font-[PlusJakartaSans-Bold] text-lg text-center text-white"
          style={{
            color: colorThemes[selectedTheme].textPrimary,
          }}>
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginButtons;
