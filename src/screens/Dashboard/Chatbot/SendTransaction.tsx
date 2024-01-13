import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {colorThemes} from '../../../constants/themeData';
import {useAppSelector} from '../../../redux/hooks';
import CoinLogo from '../../../components/coindetails/CoinLogo';
import {ToastShowShort} from '../../../utils/toast';
import {sendTransaction} from '../../../helpers/transactions';
import {showAmount} from '../../../helpers/showAmount';
const SendTransaction = ({data, coinData, smartAccounts, coinBalance}: any) => {
  const {selectedTheme} = useAppSelector(state => state.selectedTheme);
  const [showActivityIndicator, setShowActivityIndicator] = useState(false);
  const [buttonText, setButtonText] = useState('ACCEPT');
  const [isDisabled, setIsDisabled] = useState(false);
  const [showRejectButton, setShowRejectButton] = useState(true);
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

  const handleSendTransaction = async () => {
    try {
      const sAccountOnChain = smartAccounts[coinData?.chainId!];
      console.log(
        sAccountOnChain,
        ' Smart Account Details on chain ',
        coinData.chainId!,
      );
      if (!sAccountOnChain) {
        return ToastShowShort('Smart Account not Found');
      }
      if (data.txnData.value / 10 ** coinData?.decimals > coinBalance) {
        return ToastShowShort('Insufficient balance');
      }
      setShowActivityIndicator(true);
      setShowRejectButton(false);
      if (data.action === 'transferNative') {
        const txnReceipt = await sendTransaction(
          sAccountOnChain,
          data.txnData.value,
          data.txnData.to,
          coinData?.address,
          coinData,
          null,
        );
        if (txnReceipt?.status === 1) {
          setIsDisabled(true);
          setShowActivityIndicator(false);
          setButtonText('COMPLETED');
        }
      } else if (data.action === 'transferERC20') {
        const txnReceipt = await sendTransaction(
          sAccountOnChain,
          data.txnData.value,
          data.txnData.toAddress,
          coinData.address,
          coinData,
          null,
        );
        if (txnReceipt?.status === 1) {
          setIsDisabled(true);
          setShowActivityIndicator(false);
          setButtonText('COMPLETED');
        }
      }
    } catch (error) {
      setShowActivityIndicator(false);
      setButtonText('TRY AGAIN');
      setShowRejectButton(false);
      console.log('error in sending transation...', error);
      ToastShowShort('' + error);
    }
  };

  return (
    <View className="w-[300px] bg-[#000000] rounded-2xl p-4">
      <View className="w-full flex flex-row justify-between">
        <Text
          className="font-[PlusJakartaSans-semiBold] text-3xl"
          style={{color: colorThemes[selectedTheme].actionsheetBackground}}>
          Send
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
      <View className="w-full flex flex-row justify-between mt-4 items-center">
        <View className="flex flex-row gap-x-2 items-center">
          <CoinLogo symbol={coinData.symbol} size={'medium'} />
          <View className="flex flex-col">
            <View className="flex flex-row w-16 items-end justify-start">
              <Text
                className="font-[PlusJakartaSans-semiBold] text-lg"
                style={{
                  color: colorThemes[selectedTheme].actionsheetBackground,
                }}>
                {showAmount(
                  data.txnData.value / Math.pow(10, coinData?.decimals),
                )}
              </Text>
              <Text
                className="font-[PlusJakartaSans-semiBold] text-md"
                style={{color: colorThemes[selectedTheme].textMuted}}>
                {coinData?.symbol}
              </Text>
            </View>
            <Text
              className="font-[PlusJakartaSans-semiBold] text-md"
              style={{color: colorThemes[selectedTheme].textMuted}}>
              $
              {showAmount(
                (data.txnData.value / Math.pow(10, coinData?.decimals)) *
                  coinData?.usdPrice,
              )}
            </Text>
          </View>
        </View>
        <View>
          <Text
            className="font-[PlusJakartaSans-semiBold] text-md"
            style={{color: colorThemes[selectedTheme].actionsheetBackground}}>
            Example.porfo
          </Text>
          <Text
            className="font-[PlusJakartaSans-semiBold] text-md"
            style={{color: colorThemes[selectedTheme].textTertiary}}>
            {data.txnData.to.substring(0, 8)}...{' '}
            {data.txnData.to.substring(data?.txnData?.to?.length - 4)}
          </Text>
        </View>
      </View>
      <View className="w-full flex flex-row items-center mt-4">
        <View className="flex flex-row bg-[#E2E2E2] items-center rounded-3xl p-2 justify-between">
          <View className="flex flex-row items-center gap-x-2">
            <View className="p-2 rounded-full bg-[#ffffff]">
              <Image
                source={require('../../../assets/images/watch-image.png')}
                className="w-8 h-8 rounded-full"
              />
            </View>
            <View className="flex flex-col items-start">
              <Text
                className="font-[PlusJakartaSans-Bold] text-lg text-center"
                style={{
                  color: colorThemes[selectedTheme].background,
                }}>
                Gas Saver
              </Text>
              <Text
                className="font-[PlusJakartaSans-Bold] text-xs text-center"
                style={{
                  color: colorThemes[selectedTheme].background,
                }}>
                0.002 ETH ($0.12)
              </Text>
            </View>
          </View>
          <Image
            source={require('../../../assets/images/pink-down-arrow.png')}
            className="w-5 h-4 ml-4"
          />
        </View>
        <View className="ml-2 items-start">
          <Pressable
            disabled
            className={`w-14 h-5 rounded-full flex flex-row items-center ${
              payByPorfo ? 'bg-[#BE406A]' : 'bg-[#BE406A]'
            }`}
            onPress={setSwitchValue}>
            <Animated.View
              className="w-8 h-8 bg-[#FFFCF2] rounded-full justify-center items-center"
              style={switchStyle}>
              <Image
                source={require('../../../assets/images/ETH.png')}
                className="w-6 h-6"
              />
            </Animated.View>
          </Pressable>
          <Text
            className="font-[PlusJakartaSans-Bold] text-md text-center ml-2"
            style={{
              color: colorThemes[selectedTheme].textPrimary,
            }}>
            eth
          </Text>
        </View>
      </View>
      <View className="w-full flex flex-row justify-between mt-8">
        {showRejectButton && (
          <TouchableOpacity
            onPress={() => {
              setButtonText('REJECTED');
              setShowRejectButton(false);
              setIsDisabled(true);
            }}
            className="w-[48%] py-2 rounded-full"
            activeOpacity={0.7}
            style={{
              backgroundColor: colorThemes[selectedTheme].textTertiary,
            }}>
            <Text
              className="font-[PlusJakartaSans-Bold] text-lg text-center"
              style={{
                color: colorThemes[selectedTheme].textPrimary,
              }}>
              REJECT
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          disabled={isDisabled}
          onPress={handleSendTransaction}
          className={`${
            buttonText === 'ACCEPT' ? 'w-[48%]' : 'w-[100%]'
          } py-2 rounded-full flex flex-row gap-x-2 justify-center ${
            buttonText === ('ACCEPT' || 'TRY AGAIN')
              ? 'opacity-100'
              : 'opacity-50'
          }`}
          activeOpacity={0.7}
          style={{
            backgroundColor: colorThemes[selectedTheme].textSecondary,
          }}>
          <Image
            source={require('../../../assets/images/thunder-image.png')}
            className="w-6 h-8"
          />
          {showActivityIndicator ? (
            <ActivityIndicator size="large" color="#B13F60" />
          ) : (
            <Text
              className="font-[PlusJakartaSans-Bold] text-lg text-center"
              style={{
                color: colorThemes[selectedTheme].textPrimary,
              }}>
              {buttonText}
            </Text>
          )}
        </TouchableOpacity>
      </View>
      {/* <View className="w-full flex flex-row justify-center mt-4">
        <Image
          source={require('../../../assets/images/thunder-image.png')}
          className="w-6 h-8"
        />
        <Text
          className="font-[PlusJakartaSans-Bold] text-lg text-center"
          style={{
            color: colorThemes[selectedTheme].textPrimary,
          }}>
          Bolt Mode Available
        </Text>
      </View> */}
    </View>
  );
};

export default SendTransaction;
