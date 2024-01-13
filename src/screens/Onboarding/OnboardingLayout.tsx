import {
  Dimensions,
  Pressable,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import BackIcon from '../../assets/icons/svg/back-purple.svg';
import DonutChart from './DonutChart';

import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import {exitAppConfirmation} from '../../utils/exitAppConfirmation';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
const {width, height} = Dimensions.get('screen');

export interface LayoutProps {
  children: React.ReactNode;
}

const OnboardingLayout = ({children}: LayoutProps) => {
  const [isTopContentVisible, setIsTopContentVisible] = useState(false);
  const insets = useSafeAreaInsets();
  // const PULL_THRESHOLD = height * 0.4;
  const position = useSharedValue(0);
  const imagePosition = useSharedValue(1);
  const imagePositionY = useSharedValue(0);
  //   onStart: (_, ctx) => {
  //     ctx.startY = position.value;
  //   },
  //   onActive: (e, ctx) => {
  //     position.value = ctx.startY + e.translationY;
  //   },
  //   onEnd: (e, ctx) => {
  //     if (!isTopContentVisible && Math.abs(e.translationY) > 10) {
  //       position.value = withTiming(
  //         height - 145 - (StatusBar.currentHeight || 0),
  //         {duration: 200},
  //         () => {
  //           runOnJS(setIsTopContentVisible)(true);
  //         },
  //       );
  //       imagePosition.value = withTiming(-1, {duration: 200}, () => {});
  //       imagePositionY.value = withTiming(-25, {duration: 200}, () => {});
  //     } else if (isTopContentVisible && Math.abs(e.translationY) > 10) {
  //       runOnJS(setIsTopContentVisible)(false);
  //       position.value = withTiming(0, {duration: 200}, () => {});
  //       imagePosition.value = withTiming(1, {duration: 200}, () => {});
  //       imagePositionY.value = withTiming(0, {duration: 200}, () => {});
  //     }
  //   },
  // });
  const viewBoxAnimation = useAnimatedStyle(() => ({
    height: position.value,
  }));
  const imageAnimation: any = useAnimatedStyle(() => ({
    transform: [{scaleY: imagePosition.value}],
    translateY: imagePositionY?.value,
  }));

  return (
    <View className="flex-1">
      <View style={{zIndex: 20}}>
        {/* <View className="flex flex-row items-center justify-between bg-[#000] dark:bg-[#000] pb-5 rounded-bl-[25px] rounded-br-[25px]">
            <View className="flex flex-row items-center">
              <Pressable className="p-4 pt-5" onPress={back}>
                <BackIcon />
              </Pressable>
              <View className="pt-12 pb-5">
                <Text className="font-[PlusJakartaSans-SemiBold] text-[#FFFCF2] opacity-70 text-sm">
                  Step {step} of {noOfScreens}
                </Text>
                <Text className="font-[PlusJakartaSans-Bold] text-[#FFFCF2] text-xl">
                  {title}
                </Text>
              </View>
            </View>
            <View className="pr-4 pt-5">
              <DonutChart
                color="#7C2DDC"
                min={currentScreen}
                max={noOfScreens}
                radius={20}
                strokeWidth={10}
              />
            </View>
          </View> */}
      </View>
      <View style={{paddingBottom: insets.bottom}} className="flex-1">
        {children}
      </View>
    </View>
  );
};

export default OnboardingLayout;
