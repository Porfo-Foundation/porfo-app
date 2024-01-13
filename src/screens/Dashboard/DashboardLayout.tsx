import {View, Dimensions, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {useAppSelector} from '../../redux/hooks';
import {colorThemes} from '../../constants/themeData';
export interface LayoutProps {
  children: React.ReactNode;
  component?: any;
  openContent: boolean;
  onCloseContent: () => void;
}
const {width, height} = Dimensions.get('screen');

const DashboardLayout = ({
  children,
  component,
  openContent,
  onCloseContent,
}: LayoutProps) => {
  const [isTopContentVisible, setIsTopContentVisible] = useState(false);
  const PULL_THRESHOLD = height * 0.4;
  const position = useSharedValue(0);
  const imagePosition = useSharedValue(1);
  const imagePositionY = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startY = position.value;
    },
    onActive: (e, ctx) => {
      position.value = ctx.startY + e.translationY;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onEnd: (e, ctx) => {
      const reachedThreshold = position.value > PULL_THRESHOLD;
      if (!isTopContentVisible && Math.abs(e.translationY) > 10) {
        position.value = withTiming(
          height - 80 - (StatusBar.currentHeight || 0),
          {duration: 200},
          () => {
            runOnJS(setIsTopContentVisible)(true);
          },
        );
        imagePosition.value = withTiming(-1, {duration: 200}, () => {});
        imagePositionY.value = withTiming(-25, {duration: 200}, () => {});
      } else if (isTopContentVisible && Math.abs(e.translationY) > 10) {
        runOnJS(setIsTopContentVisible)(false);
        runOnJS(onCloseContent)();
        position.value = withTiming(0, {duration: 200}, () => {
          // runOnJS(setIsTopContentVisible)(false);
        });
        imagePosition.value = withTiming(1, {duration: 200}, () => {});
        imagePositionY.value = withTiming(0, {duration: 200}, () => {});
      }
    },
  });
  const viewBoxAnimation = useAnimatedStyle(() => ({
    height: position.value,
  }));
  const imageAnimation: any = useAnimatedStyle(() => ({
    transform: [{scaleY: imagePosition.value}],
    translateY: imagePositionY?.value,
  }));

  useEffect(() => {
    // console.log('Test Contet', openContent);
    // console.log('status bar', StatusBar.currentHeight);
    if (openContent) {
      // console.log('test');
      position.value = withTiming(
        height - 80 - (StatusBar.currentHeight || 0),
        {duration: 200},
        () => {
          runOnJS(setIsTopContentVisible)(true);
        },
      );
      imagePosition.value = withTiming(-1, {duration: 200}, () => {});
      imagePositionY.value = withTiming(-25, {duration: 200}, () => {});
    } else {
      runOnJS(setIsTopContentVisible)(false);
      position.value = withTiming(0, {duration: 200}, () => {
        // runOnJS(setIsTopContentVisible)(false);
      });
      imagePosition.value = withTiming(1, {duration: 200}, () => {});
      imagePositionY.value = withTiming(0, {duration: 200}, () => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openContent]);
  // console.log(imageAnimation, 'IMAGE ANIM');

  const {selectedTheme} = useAppSelector(state => state.selectedTheme);
  return (
    <GestureHandlerRootView className="flex-1">
      <View className="flex-1">
        <Animated.View>
          <Animated.ScrollView
            className="bg-[#0D2B59] dark:bg-[#0D2B59]"
            style={[viewBoxAnimation]}>
            <>{component}</>
          </Animated.ScrollView>
          <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.Image
              source={require('../../assets/images/pull-down.png')}
              // eslint-disable-next-line react-native/no-inline-styles
              style={[{width: width, height: 30}, imageAnimation]}
            />
          </PanGestureHandler>
        </Animated.View>
        <View
          className="flex-1"
          style={{backgroundColor: colorThemes[selectedTheme]?.background}}>
          {!isTopContentVisible && <>{children}</>}
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default DashboardLayout;
