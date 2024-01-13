import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
import {ICoinBalance, ICoin} from '../../../interfaces/main';
import {showAmount} from '../../../helpers/showAmount';
import CoinLogoDown from '../../../components/coindetails/CoinLogoDown';
import {EmptyCoin} from '../../../helpers/coin';
import {updatepopupName} from '../../../redux/features/popupSlice';
import {updateSwapCoin} from '../../../redux/features/coinSlice';
import {togglePopup} from '../../../redux/features/popupSlice';
import GreenArrow from '../../../assets/icons/svg/green-arrow-up.svg';
import RedArrow from '../../../assets/icons/svg/red-arrow-down.svg';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {colorThemes} from '../../../constants/themeData';

import SendArrow from '../../../assets/icons/svg/send-arrow.svg';
import ReceiveArrow from '../../../assets/icons/svg/receive-arrow.svg';
import CoinInfo from '../../../assets/icons/svg/info.svg';
import {useAppSelector, useAppDispatch} from '../../../redux/hooks';
import {updateSelectedBalance} from '../../../redux/features/mainSlice';

const {width} = Dimensions.get('window');
const AssetsCard = ({
  balance,
  navigation,
  scrollRef,
}: {
  balance: ICoinBalance;
  navigation: any;
  scrollRef: any;
}) => {
  const dispatch = useAppDispatch();
  // const [isSwapOpen, setIsSwapOpen] = useState(false);
  // const [isScanOpen, setIsScanOpen] = useState(false);
  // const [isBuyOpen, setIsBuyOpen] = useState(false);
  // const [isReceiveOpen, setIsReceiveOpen] = useState(false);
  const {selectedTheme} = useAppSelector(state => state.selectedTheme);
  const [openCoinDetails, setOpenCoinDetails] = useState(false);
  const coin: ICoin =
    typeof balance?.coin === 'string' ? EmptyCoin : balance?.coin;

  const X_AXIS_THRESHOLD = width * 0.1;
  const translateX = useSharedValue(0);
  const buyCoin = () => {
    dispatch(updateSwapCoin(coin));
    // setIsBuyOpen(true);
    dispatch(updatepopupName('BuyPopup'));
    dispatch(togglePopup());
  };
  const swapCoin = () => {
    dispatch(updateSwapCoin(coin));
    // setIsSwapOpen(true);
    dispatch(updatepopupName('SwapPopup'));
    dispatch(togglePopup());
  };
  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: event => {
      translateX.value = event.translationX;
    },
    onEnd: () => {
      console.log(translateX.value, X_AXIS_THRESHOLD);
      if (translateX.value < X_AXIS_THRESHOLD * -1) {
        runOnJS(buyCoin)();
        translateX.value = withTiming(0);
      } else if (translateX.value > X_AXIS_THRESHOLD) {
        runOnJS(swapCoin)();
        translateX.value = withTiming(0);
      } else {
        translateX.value = withTiming(0);
      }
    },
  });

  const handleSend = () => {
    dispatch(updateSelectedBalance(balance));
    // setIsScanOpen(true);
    dispatch(updatepopupName('SendPopup'));
    dispatch(togglePopup());
  };

  // const panGesture = Gesture.Pan()
  //   .onUpdate(event => {
  //     translateX.value = event.translationX;
  //   })
  //   .onEnd(() => {
  //     if (translateX.value < X_AXIS_THRESHOLD * -1) {
  //       runOnJS(buyCoin)();
  //       translateX.value = withTiming(0);
  //     } else if (translateX.value < X_AXIS_THRESHOLD) {
  //       runOnJS(swapCoin)();
  //       translateX.value = withTiming(0);
  //     } else {
  //       translateX.value = withTiming(0);
  //     }
  //   })
  //   .simultaneousWithExternalGesture(scrollRef);
  const viewStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));
  return (
    // <View className="my-1.5">
    //   <View className="absolute h-full justify-center right-0">
    //     <Image
    //       source={require('../../../assets/images/buy-button.png')}
    //       className="h-14 w-4"
    //       resizeMode="stretch"
    //     />
    //   </View>
    //   <View className="absolute h-full justify-center left-0">
    //     <Image
    //       source={require('../../../assets/images/swap-button.png')}
    //       className="h-14 w-4"
    //       resizeMode="stretch"
    //     />
    //   </View>
    //   <PanGestureHandler
    //     failOffsetY={[-5, 5]}
    //     activeOffsetX={[-5, 5]}
    //     onGestureEvent={panGesture}
    //     simultaneousHandlers={scrollRef}>
    //     <Animated.View style={[viewStyle, {backgroundColor: '#0d2b59'}]}>
    //       <TouchableOpacity
    //         onPress={() =>
    //           navigation.navigate('CoinDetails', {
    //             coin: coin,
    //             balance: balance,
    //           })
    //         }
    //         className="w-full px-4 flex flex-row justify-between items-center self-center pb-3 pt-1 border-b border-[#1E3251] py-3">
    //         <View className="flex flex-row">
    //           <CoinLogoDown logoURI={coin?.logoURI} chainId={coin?.chainId} />
    //           <View className="flex flex-col justify-center items-start ml-2">
    //             <Text className="text-neutral-100 font-bold text-[16px] font-[PlusJakartaSans-Bold]">
    //               {coin?.symbol}
    //             </Text>
    //             <Text className="text-neutral-100 opacity-50 text-xs font-bold font-[PlusJakartaSans-SemiBold]">
    //               {coin?.name}
    //             </Text>
    //           </View>
    //         </View>
    //         <View className="flex-row gap-x-4">
    //           <View className="flex flex-col justify-center items-end">
    //             <Text className="text-neutral-100 font-[PlusJakartaSans-SemiBold]">
    //               {showAmount(balance?.value)}
    //             </Text>
    //             <Text className="text-neutral-100 opacity-50 font-[PlusJakartaSans-SemiBold] text-xs">
    //               ${showAmount(balance?.value * coin?.usdPrice)}
    //             </Text>
    //           </View>
    //         </View>
    //       </TouchableOpacity>
    //     </Animated.View>
    //   </PanGestureHandler>
    // </View>
    <View className="my-1.5">
      <View className="absolute h-full justify-center right-0">
        <Image
          source={require('../../../assets/images/buy-button.png')}
          className="h-14 w-4"
          resizeMode="stretch"
        />
      </View>
      <View className="absolute h-full justify-center left-0">
        <Image
          source={require('../../../assets/images/swap-button.png')}
          className="h-14 w-4"
          resizeMode="stretch"
        />
      </View>
      <PanGestureHandler
        failOffsetY={[-5, 5]}
        activeOffsetX={[-5, 5]}
        onGestureEvent={panGesture}
        // simultaneousHandlers={scrollRef}
      >
        <Animated.View
          style={[
            viewStyle,
            {
              backgroundColor: colorThemes[selectedTheme]['background'],
            },
          ]}>
          <TouchableOpacity
            onPress={() => setOpenCoinDetails(!openCoinDetails)}
            className="w-full px-4 flex flex-col justify-between items-center self-center pb-1 pt-1 border-b">
            <View
              className={`w-full p-2 ${
                openCoinDetails && 'bg-[#0B0B0B] rounded-md'
              }`}>
              <View className="w-full flex flex-row justify-between items-center">
                <View className="flex flex-row">
                  <CoinLogoDown symbol={coin?.symbol} chainId={coin?.chainId} />
                  <View className="flex flex-col justify-center items-start ml-2">
                    <Text
                      className="text-xs font-bold font-[PlusJakartaSans-SemiBold]"
                      style={{
                        color: colorThemes[selectedTheme]['textPrimaryMuted'],
                      }}>
                      {coin?.name}
                    </Text>
                    <Text
                      className="font-bold text-[16px] font-[PlusJakartaSans-Bold]"
                      style={{
                        color: colorThemes[selectedTheme]['textPrimary'],
                      }}>
                      {showAmount(balance?.value)} {coin?.symbol}
                    </Text>
                  </View>
                </View>
                <View className="flex-row gap-x-4">
                  <View className="flex flex-col justify-center items-end">
                    <Text
                      className="font-[PlusJakartaSans-SemiBold] text-[16px]"
                      style={{
                        color: colorThemes[selectedTheme]['textPrimary'],
                      }}>
                      ${showAmount(balance?.value * coin?.usdPrice)}
                    </Text>
                    <View className="flex-row items-center">
                      <Text
                        className="font-[PlusJakartaSans-SemiBold] text-xs"
                        style={{
                          color: colorThemes[selectedTheme]['textPrimaryMuted'],
                        }}>
                        {balance?.pnl?.toFixed(2)} %
                      </Text>
                      {balance?.pnl < 0 ? <RedArrow /> : <GreenArrow />}
                    </View>
                  </View>
                </View>
              </View>
              {openCoinDetails && (
                <View
                  className="w-full px-4 flex flex-row justify-between items-center mt-2 self-center pb-1 pt-1 border-t"
                  style={{
                    borderTopColor:
                      colorThemes[selectedTheme]['buttonBackground'],
                  }}>
                  <TouchableOpacity
                    onPress={handleSend}
                    className="justify-center items-center"
                    style={{
                      borderBottomColor:
                        colorThemes[selectedTheme]['buttonBackground'],
                    }}>
                    <SendArrow />
                    <Text
                      className="font-bold text-[14px] font-[PlusJakartaSans-semiBold] mt-1"
                      style={{
                        color: colorThemes[selectedTheme]['textPrimary'],
                      }}>
                      Send
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(updatepopupName('ReceivePopup'));
                      dispatch(togglePopup());
                    }}
                    className="justify-center items-center"
                    style={{
                      borderBottomColor:
                        colorThemes[selectedTheme]['buttonBackground'],
                    }}>
                    <ReceiveArrow />
                    <Text
                      className="font-bold text-[14px] font-[PlusJakartaSans-semiBold] mt-1"
                      style={{
                        color: colorThemes[selectedTheme]['textPrimary'],
                      }}>
                      Receive
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(updatepopupName('BuyPopup'));
                      dispatch(togglePopup());
                    }}
                    className="justify-center items-center"
                    style={{
                      borderBottomColor:
                        colorThemes[selectedTheme]['buttonBackground'],
                    }}>
                    <Image
                      source={require('../../../assets/icons/svg/buy-dark-theme.png')}
                      className="w-5 h-5"
                    />
                    <Text
                      className="font-bold text-[14px] font-[PlusJakartaSans-semiBold] mt-1"
                      style={{
                        color: colorThemes[selectedTheme]['textPrimary'],
                      }}>
                      Buy
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(updateSwapCoin(coin));
                      dispatch(updatepopupName('SwapPopup'));
                      dispatch(togglePopup());
                    }}
                    className="justify-center items-center"
                    style={{
                      borderBottomColor:
                        colorThemes[selectedTheme]['buttonBackground'],
                    }}>
                    <Image
                      source={require('../../../assets/images/swap-arrow.png')}
                      className="w-6 h-5"
                    />
                    <Text
                      className="font-bold text-[14px] font-[PlusJakartaSans-semiBold] mt-1"
                      style={{
                        color: colorThemes[selectedTheme]['textPrimary'],
                      }}>
                      Swap
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('CoinDetails', {
                        coin: coin,
                        balance: balance,
                      })
                    }
                    className="justify-center items-center"
                    style={{
                      borderBottomColor:
                        colorThemes[selectedTheme]['buttonBackground'],
                    }}>
                    <CoinInfo />
                    <Text
                      className="font-bold text-[14px] font-[PlusJakartaSans-semiBold] mt-1"
                      style={{
                        color: colorThemes[selectedTheme]['textPrimary'],
                      }}>
                      Details
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default AssetsCard;
