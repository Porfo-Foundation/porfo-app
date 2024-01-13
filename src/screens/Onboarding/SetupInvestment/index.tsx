import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Pressable,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import InvestmentCard from './InvestmentCard';
import Logo from '../../../assets/icons/svg/logo.svg';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {updateSelectedCoins} from '../../../redux/features/onBoardingSlice';
import {addPortfolio, getAllportfolios} from '../../../apiCalls/portfolio';
import {EmptyPortfolio} from '../../../helpers/portfolio';
import {updatePortfolios} from '../../../redux/features/mainSlice';
import {toggleLoader} from '../../../redux/features/popupSlice';
import ProgressBar from './pregressBar';
// import {updateUserAddress} from '../../../redux/features/authSlice';
import {ISelectedCoin} from '../../../interfaces/main';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {addSmartAccount} from '../../../apiCalls/auth';
import {ToastShowShort} from '../../../utils/toast';
const {width, height} = Dimensions.get('screen');

const SetupInvestment = ({next}: any) => {
  const [autoInvest, setAutoInvest] = useState(false);
  const {selectedCoins, portfolioName, baseCoin, stableCoin} = useAppSelector(
    state => state.onBoarding,
  );
  const {smartAccountAddress} = useAppSelector(state => state.auth);

  const [percetageValue, setPercentageValue] = useState(100);
  const [showProgressBar, setShowProgressBar] = useState<boolean>(true);
  // array to lock coin
  const [lockedCoin, setLockedCoin] = useState<string[]>([]);
  const [disableAllSlider, setDisableAllSlider] = useState(false);
  const [selectedCoinDetails, setSelectedCoinDetails] =
    useState<ISelectedCoin[]>(selectedCoins);

  const dispatch = useAppDispatch();

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
    if (autoInvest) {
      setAutoInvest(false);
      switchAnimation.value = withTiming(0, {
        duration: 100,
      });
    } else {
      setAutoInvest(true);
      switchAnimation.value = withTiming(1, {
        duration: 100,
      });
    }
  };

  useEffect(() => {
    setSelectedCoinDetails([...selectedCoins]);
  }, [selectedCoins]);

  const handleNext = async () => {
    const updatedSelectedCoins: any = selectedCoinDetails?.map(coin => {
      return {
        ...coin,
        percentage: coin.percentage.toString(),
      };
    });
    // console.log(updatedSelectedCoins, 'updatedSelectedCoins');
    dispatch(updateSelectedCoins(selectedCoinDetails));
    if (!smartAccountAddress) {
      return ToastShowShort('Wallet not found, please login again');
    }
    dispatch(toggleLoader());
    await addPortfolio(
      portfolioName,
      baseCoin.id,
      stableCoin.id,
      updatedSelectedCoins,
    );
    //adds smart account to userId
    await addSmartAccount(smartAccountAddress);
    const data = await getAllportfolios();
    dispatch(updatePortfolios([...data.portfolios, EmptyPortfolio]));
    // hide progressBar
    setShowProgressBar(false);
    dispatch(toggleLoader());
    // dispatch(updateUserAddress(smartAccountAddress));
    next();
  };
  return (
    <SafeAreaView className="flex-1 bg-background-100 py-1">
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
      <View className="justify-between h-full px-6 flex" style={{width: width}}>
        <View>
          <Text className="font-[PlusJakartaSans-SemiBold] text-xl text-[#FFFFFF] text-center mb-10">
            Lets setup investment
          </Text>
          {showProgressBar && (
            <ProgressBar selectedCoins={selectedCoinDetails} />
          )}
          <View className="flex flex-row items-center justify-between gap-x-2 my-2 mt-10">
            <Text className="font-[PlusJakartaSans-SemiBold] text-sm text-[#FFFFFF] text-center">
              {percetageValue}% of 100%
            </Text>
            <View className="flex-row items-center">
              <Text className="font-[PlusJakartaSans-semiBold] text-sm text-[#FFFFFF] mr-2">
                Auto invest
              </Text>
              <Pressable
                className="bg-[#F9AA4B] w-8 h-4 rounded-full flex flex-row items-center px-1"
                onPress={setSwitchValue}>
                <Animated.View
                  className="w-3 h-3 bg-[#171A3B] rounded-full"
                  style={switchStyle}
                />
              </Pressable>
            </View>
          </View>
          <View>
            <ScrollView className="w-full" style={{height: height - 450}}>
              {selectedCoinDetails?.map(
                (coin: ISelectedCoin, index: number) => (
                  <InvestmentCard
                    key={index}
                    data={coin}
                    setPercentageValue={setPercentageValue}
                    selectedCoins={selectedCoins}
                    lockedCoin={lockedCoin}
                    setLockedCoin={setLockedCoin}
                    index={index}
                    selectedCoinDetails={selectedCoinDetails}
                    setSelectedCoinDetails={setSelectedCoinDetails}
                    disableAllSlider={disableAllSlider}
                    setDisableAllSlider={setDisableAllSlider}
                  />
                ),
              )}
            </ScrollView>
          </View>
        </View>
        <View className="flex flex-row items-center justify-between pt-4">
          <Logo />
          <TouchableOpacity
            className="bg-[#4845F8] px-8 py-3 rounded-full mb-0"
            onPress={handleNext}>
            <Text className="font-[PlusJakartaSans-SemiBold] text-sm text-[#FFFFFF]">
              Create portfolio
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* </TouchableWithoutFeedback> */}
    </SafeAreaView>
  );
};

export default SetupInvestment;
