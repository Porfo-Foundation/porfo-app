import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, Pressable} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {colorThemes} from '../../../constants/themeData';
import {useAppSelector} from '../../../redux/hooks';
const BuyTransaction = () => {
  const {selectedTheme} = useAppSelector(state => state.selectedTheme);
  const [payByPorfo, setPayByPorfo] = useState(false);

  const switchAnimation = useSharedValue(0);
  const switchPos = useDerivedValue(() => {
    return interpolate(switchAnimation.value, [0, 1], [0, 14]);
  });
  const switchStyle = useAnimatedStyle(() => {
    return {
      translateX: switchPos.value,
    };
  });

  const setSwitchValue = () => {
    if (payByPorfo) {
      setPayByPorfo(false);
      switchAnimation.value = withTiming(0, {
        duration: 100,
      });
    } else {
      setPayByPorfo(true);
      switchAnimation.value = withTiming(1, {
        duration: 100,
      });
    }
  };

  return (
    <View className="w-[330px] bg-[#000000] rounded-2xl p-4">
      <View className="w-full flex flex-row justify-between">
        <Text
          className="font-[PlusJakartaSans-semiBold] text-3xl"
          style={{color: colorThemes[selectedTheme].actionsheetBackground}}>
          Buy
        </Text>
        <View className="flex flex-row items-center gap-x-2 bg-[#191919] rounded-full px-3">
          <Text
            className="font-[PlusJakartaSans-semiBold] text-md"
            style={{color: colorThemes[selectedTheme].actionsheetBackground}}>
            Main Wallet
          </Text>
          <Image
            source={require('../../../assets/images/down-arrow.png')}
            className="w-4 h-2"
          />
        </View>
      </View>
      <View className="w-full flex flex-col justify-between mt-4 items-start">
        <View className="flex flex-row gap-x-2 items-center">
          <Image
            source={require('../../../assets/images/ETH.png')}
            className="w-8 h-8"
          />
          <Text
            className="font-[PlusJakartaSans-semiBold] text-lg"
            style={{color: colorThemes[selectedTheme].textMuted}}>
            ETH
          </Text>
        </View>
        <View className="flex flex-row items-center gap-x-2 mt-2">
          <Text
            className="font-[PlusJakartaSans-semiBold] text-2xl"
            style={{color: colorThemes[selectedTheme].actionsheetBackground}}>
            $150 +
          </Text>
          <Text
            className="font-[PlusJakartaSans-semiBold] text-md"
            style={{color: colorThemes[selectedTheme].textMuted}}>
            0.6ETH (fee)
          </Text>
          <Image
            source={require('../../../assets/images/bothside-corner-arrow.png')}
            className="w-8 h-8"
          />
        </View>
      </View>
      <View className="w-full flex flex-row items-center mt-4 justify-between">
        <View className="flex flex-col items-start">
          <Text
            className="font-[PlusJakartaSans-Bold] text-md text-center"
            style={{
              color: colorThemes[selectedTheme].textMuted,
            }}>
            view on
          </Text>
          <Text
            className="font-[PlusJakartaSans-Bold] text-lg text-center"
            style={{
              color: colorThemes[selectedTheme].textTertiary,
            }}>
            etherscan
          </Text>
        </View>
        <View className="ml-2 items-start gap-y-2">
          <Text
            className="font-[PlusJakartaSans-Bold] text-md text-center"
            style={{
              color: colorThemes[selectedTheme].textPrimary,
            }}>
            Pay using
          </Text>
          <Pressable
            disabled
            className={`w-14 h-6 rounded-full flex flex-row items-center ${
              payByPorfo ? 'bg-[#53348245]' : 'bg-[#53348245]'
            }`}
            onPress={setSwitchValue}>
            <Animated.View
              className="w-8 h-8 bg-[#533482] rounded-full justify-center items-center"
              style={switchStyle}>
              <Image
                source={require('../../../assets/images/etherium-logo.png')}
                className="w-6 h-6"
              />
            </Animated.View>
          </Pressable>
          <Text
            className="font-[PlusJakartaSans-semiBold] text-md text-center"
            style={{
              color: colorThemes[selectedTheme].textSecondary,
            }}>
            ETH
          </Text>
        </View>
      </View>
      <View className="w-full flex flex-row justify-between my-4">
        <TouchableOpacity
          className="w-[48%] py-2 rounded-full border-2 border-[#2D2D2D]"
          activeOpacity={0.7}
          style={{
            backgroundColor: colorThemes[selectedTheme].background,
          }}>
          <Text
            className="font-[PlusJakartaSans-Bold] text-lg text-center"
            style={{
              color: colorThemes[selectedTheme].textPrimary,
            }}>
            Reject
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-[48%] py-2 rounded-full flex flex-row justify-center items-center"
          activeOpacity={0.7}
          style={{
            backgroundColor: colorThemes[selectedTheme].textTertiary,
          }}>
          <Text
            className="font-[PlusJakartaSans-Bold] text-lg text-center"
            style={{
              color: colorThemes[selectedTheme].textPrimary,
            }}>
            Confirm
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BuyTransaction;
