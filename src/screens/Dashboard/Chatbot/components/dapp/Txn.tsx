import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
} from 'react-native';

import React, {useContext, useState} from 'react';
import {WalletContext} from '../../../../../context/WalletContext';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import {getTimeDifference} from '../../../../../utils/getTime';
import useCoinList from '../../../../../hooks/reactQuery/apiHooks/useCoinList';
import Loader from '../../../../../components/common/Loader';
import {EmptyCoin} from '../../../../../helpers/coin';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import useBalances from '../../../../../hooks/reactQuery/apiHooks/useBalances';
import {sendDappTxn} from '../../../../../helpers/transactions';
import {respondDappTrxn} from '../../../../../apiCalls/dapp';
import {useQueryClient} from '@tanstack/react-query';
import {capitalizeFirstLetter} from '../../../../../utils/helperFunctions';
import {ToastShowShort} from '../../../../../utils/toast';

const Txn = ({data, taskId, status}: any) => {
  const {data: coinList} = useCoinList();
  const {data: balanceData, isLoading, isError} = useBalances();
  const {invalidateQueries} = useQueryClient();

  const {smartAccounts} = useContext(WalletContext);
  const [showRejectButton, setShowRejectButton] = useState(true);
  const {
    txnExpiry,
    connectionHash,
    chainId,
    txn: {
      to,
      value,
      data: txnData,
      //  gasLimit
    },
    dAppName,
    dAppLogoUrl,
  } = data;
  const [showActivityIndicator, setShowActivityIndicator] = useState(false);
  const [buttonText, setButtonText] = useState('Accept');
  // const [isDisabled, setIsDisabled] = useState(false);
  // console.log('txnExpiry', new Date(txnExpiry).toLocaleString());
  const timeDifference = getTimeDifference(new Date(txnExpiry));
  // console.log('timeDifference', timeDifference);
  const [isActive, setisActive] = useState(
    status === 'pending' && timeDifference > 0,
  );
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
  if (isLoading || isError) {
    return (
      <View className="w-[300px] w-max-[70vw] flex flex-col justify-between items-start p-2 gap-4 mr-2">
        <Loader />
      </View>
    );
  }
  const coinData =
    coinList!.find(coin => coin?.address.toLowerCase() === to.toLowerCase()) ||
    EmptyCoin;
  const coinBalance =
    balanceData.balances?.find(
      coin => coin?.coin.address.toLowerCase() === to.toLowerCase(),
    )?.value || 0;
  return (
    <View className="w-[300px] w-max-[70vw] flex flex-col justify-between items-start p-2 gap-4 mr-2">
      <View className="w-full flex flex-row justify-between">
        <View className="flex flex-row items-center">
          <Image
            source={require('../../../../../assets/images/send.png')}
            className="w-8 h-8 mr-1"
            resizeMode="stretch"
          />
          <Text className="text-neutral-100">Txn Request</Text>
        </View>
        {isActive && (
          <View className="flex flex-row items-center">
            <CountdownCircleTimer
              isPlaying
              size={40}
              strokeWidth={5}
              duration={timeDifference}
              colors={['#004777', '#F7B801', '#A30000', '#A30000']}
              colorsTime={[7, 5, 2, 0]}
              onComplete={() => {
                setisActive(false);
                return {shouldRepeat: false};
              }}>
              {({remainingTime}) => (
                <Text className="  text-neutral-200">{remainingTime}</Text>
              )}
            </CountdownCircleTimer>
          </View>
        )}
        <View className="flex flex-row items-center">
          <View>
            <Image
              source={{
                uri: 'https://gfa.nyc3.digitaloceanspaces.com/testapp/testdir/default.png',
              }}
              className="w-8 h-8 mr-1"
            />
          </View>
          <Text className="text-neutral-100 mr-2">Main Wallet</Text>
        </View>
      </View>
      <View className="w-full flex flex-row justify-between">
        <View className="flex flex-row justify-between">
          {/* <CoinLogo logoURI={coinData?.logoURI!} /> */}
          <View className="flex flex-col justify-start ml-2">
            <Text className="text-neutral-100">
              {coinData.symbol ? value / Math.pow(10, coinData?.decimals) : '?'}{' '}
              {coinData?.symbol}
            </Text>
            <Text className="text-neutral-100 text-[10px] opacity-50">
              $
              {coinData.symbol
                ? (
                    (value / Math.pow(10, coinData?.decimals)) *
                    coinData?.usdPrice
                  ).toLocaleString()
                : '?'}
            </Text>
          </View>
        </View>
        <View className="flex flex-col">
          <View className="flex flex-row justify-between gap-2">
            <Image
              source={{
                uri: 'https://gfa.nyc3.digitaloceanspaces.com/testapp/testdir/default.png',
              }}
              className="w-6 h-6 mr-0"
            />
            <Text className="text-neutral-100">
              {to.substring(0, 8)}...
              {to.substring(to.length - 4)}
            </Text>
          </View>
        </View>
      </View>
      <View className="w-full flex flex-row justify-between">
        <View className="flex flex-col justify-start">
          <Text className="text-neutral-100 opacity-50">Fee</Text>
          <Text className="text-neutral-100">$0.12</Text>
        </View>
        <View className="flex flex-col justify-start">
          <Text className="text-neutral-100 opacity-50">Requester</Text>
          <View className="flex flex-row justify-between ">
            {/* <CoinLogo logoURI={dAppLogoUrl} size="small" /> */}
            <Text className="text-neutral-100">
              {capitalizeFirstLetter(dAppName)}
            </Text>
          </View>
        </View>
        <View className="flex flex-col">
          <Text className="text-neutral-100 text-xs opacity-60">Pay By</Text>
          <View className="flex flex-row justify-between gap-2">
            <Text className="text-neutral-100 text-xs">PORFO</Text>
            <Pressable
              disabled
              className={`w-8 h-4 rounded-full flex flex-row items-center px-1 ${
                payByPorfo ? 'bg-[#F9AA4B]' : 'bg-[#dddddd]'
              }`}
              onPress={setSwitchValue}>
              <Animated.View
                className="w-3 h-3 bg-[#171A3B] rounded-full"
                style={switchStyle}
              />
            </Pressable>
            <Text className="text-neutral-100 text-xs">SELF</Text>
          </View>
        </View>
      </View>
      {isActive ? (
        <View className="flex flex-row w-full justify-center items-center gap-x-2">
          <TouchableOpacity
            disabled={!isActive}
            className={`w-[65%] h-9 ${
              buttonText === 'COMPLETED'
                ? 'bg-[#14411c]'
                : buttonText === 'REJECTED'
                ? 'bg-[#5d5b74]'
                : 'bg-[#12102d]'
            } items-center self-start rounded-md justify-center`}
            onPress={async () => {
              try {
                let sAccountOnChain;
                if (coinData.symbol) {
                  sAccountOnChain = smartAccounts[coinData?.chainId!];
                } else {
                  sAccountOnChain = smartAccounts[chainId];
                }
                if (!sAccountOnChain) {
                  return ToastShowShort('Chain Not Supported');
                }

                if (
                  value / 10 ** coinData?.decimals > coinBalance &&
                  coinData.symbol
                ) {
                  return ToastShowShort('Insufficient balance');
                }

                setShowActivityIndicator(true);
                setShowRejectButton(false);
                // const txnReceipt =
                const response = await respondDappTrxn(
                  connectionHash,
                  taskId,
                  true,
                );
                if (response.code === 'EXPIRED') {
                  return ToastShowShort('Connection Expired');
                }
                await sendDappTxn(sAccountOnChain, value, to, txnData);

                invalidateQueries({queryKey: ['AIChats']});
                // if (txnReceipt?.status === 1) {
                setisActive(false);
                // setIsDisabled(true);
                setShowActivityIndicator(false);
                setButtonText('COMPLETED');
                // }
              } catch (error) {
                setShowActivityIndicator(false);
                setButtonText('TRY AGAIN');
                console.log('error in sending transation...', error);
                ToastShowShort('' + error);
              }
            }}>
            {showActivityIndicator ? (
              <ActivityIndicator size="large" color="#F9AA4B" />
            ) : (
              <Text className="text-neutral-100">{buttonText}</Text>
            )}
          </TouchableOpacity>
          {showRejectButton && (
            <TouchableOpacity
              className="bg-[#db0f1a] h-8 w-[30%] items-center self-center rounded-md justify-center"
              onPress={async () => {
                try {
                  const response = await respondDappTrxn(
                    connectionHash,
                    taskId,
                    false,
                  );
                  console.log(response);
                  if (response.code === 'EXPIRED') {
                    return ToastShowShort('Connection Expired');
                  }
                  await invalidateQueries({queryKey: ['AIChats']});
                  setisActive(false);
                  setButtonText('REJECTED');
                  setShowRejectButton(false);
                } catch (err) {
                  console.log(err);
                }
                // setIsDisabled(true);
              }}>
              <Text className="text-neutral-100">REJECT</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View className="flex flex-row w-full justify-center items-center gap-x-2">
          <Text className="text-neutral-100">Transaction Expired</Text>
        </View>
      )}
    </View>
  );
};

export default Txn;
