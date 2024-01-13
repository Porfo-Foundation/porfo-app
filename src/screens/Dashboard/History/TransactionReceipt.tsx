import React, {useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  ToastAndroid,
} from 'react-native';
import Logo from '../../../assets/icons/svg/logo.svg';
import {convertAndShareImage} from '../../../utils/shareData';
import Copy from '../../../assets/icons/svg/copy-button.svg';
import RightTick from '../../../assets/icons/svg/transaction-right-tick.svg';
import Clipboard from '@react-native-clipboard/clipboard';
import {RouterProps} from '../../../interfaces/Navigation';
import {getTime} from '../../../utils/getTime';
import {getDate} from '../../../utils/getDate';
import CoinLogo from '../../../components/coindetails/CoinLogo';
import { ToastShowShort } from '../../../utils/toast';
const TransactionReceipt = ({route, navigation}: RouterProps) => {
  const txnRes: any = route?.params?.txnReceipt;
  const coin = txnRes?.coin;
  const getGasFees = () => {
    const fees = ((txnRes.gas * txnRes.gasPrice) / Math.pow(10, 18)).toFixed(5);
    return fees;
  };
  const chainObj: any = {
    1: {
      symbol: 'ETH',
    },
    5: {
      symbol: 'ETH',
    },
    56: {
      symbol: 'BSC',
    },
    137: {
      symbol: 'MATIC',
    },
  };

  const viewRef = useRef<any>();
  return (
    <View className="w-full h-full p-2" ref={viewRef}>
      <View className="border-b-2 border-[#666262] pb-4">
        <View className="w-full h-12 flex flex-row justify-between mt-4 items-center px-2">
          <Logo />
          <Text className="text-neutral-100 text-sm">
            {getDate(txnRes?.txTime)}{' '}
            {txnRes?.txTime !== undefined
              ? getTime(txnRes?.txTime)
              : '12.36 pm'}
          </Text>
        </View>
        <Text className="text-neutral-100 text-lg self-center">
          Transfer Receipt
        </Text>
      </View>
      <View className="flex-1 justify-start items-center">
        <ImageBackground
          className="w-[300px] h-[350px]"
          resizeMode="contain"
          imageStyle={{
            opacity: 0.15,
            alignSelf: 'center',
            marginTop: 110,
          }}
          source={require('../../../assets/images/transaction-background-image.png')}>
          <View className="w-full flex flex-col mb-4 pb-4 border-b-2 border-[#474747]">
            <View className="w-full h-16 flex flex-row justify-center items-center mt-4">
              <RightTick width={80} height={80} />
              {/* <Image
                source={require('../../../assets/images/transaction-tick.gif')}
                style={{width: 100, height: 100}}
              /> */}
            </View>
            <View className="w-full flex flex-row justify-between items-center mt-4">
              <Text className="text-neutral-100 text-sm">
                Transaction Hash:
              </Text>
              <Text className="text-neutral-100">
                {txnRes?.hash?.substring(0, 8)}...
                {txnRes?.hash?.substring(txnRes?.hash?.length - 8)}
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  Clipboard.setString(txnRes?.hash);
                  ToastShowShort('Copied');
                }}>
                <Copy />
              </TouchableOpacity>
            </View>
            <View className="w-full flex flex-row justify-between items-center mt-2">
              <CoinLogo logoURI={coin?.logoURI!} chainId={coin?.chainId} />
              <Text className="text-neutral-100 text-lg">Amount:</Text>
              <Text className="text-neutral-100">
                {txnRes?.value} {coin?.name} ($
                {(txnRes?.value * coin?.usdPrice).toFixed(2)})
              </Text>
            </View>
          </View>
          <View className="w-full flex flex-row justify-between items-center my-4 pb-4 border-b-2 border-[#474747]">
            <View className="flex flex-col justify-center items-center">
              <Text className="text-neutral-100">From</Text>
              <View className="w-12 h-12 mt-1 rounded-full justify-center items-center border-2 border-[#474747]">
                <Image
                  source={require('../../../assets/images/arrow-up-right.png')}
                  className="w-[45px] h-[45px]"
                />
              </View>
            </View>
            <View className="flex flex-row justify-between">
              <Text className="text-neutral-100 mr-4">
                {txnRes?.fromAddress?.substring(0, 12)}...
                {txnRes?.fromAddress?.substring(
                  txnRes?.fromAddress?.length - 12,
                )}
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  Clipboard.setString(txnRes?.fromAddress);
                  ToastShowShort('Copied');
                }}>
                <Copy />
              </TouchableOpacity>
            </View>
          </View>
          <View className="w-full flex flex-row justify-between items-center my-4 pb-4 border-b-2 border-[#474747]">
            <View className="flex flex-col justify-center items-center">
              <Text className="text-neutral-100">To</Text>
              <View className="w-12 h-12 mt-1 rounded-full justify-center items-center border-2 border-[#474747]">
                <Image
                  source={require('../../../assets/images/arrow-down-right.png')}
                  className="w-[45px] h-[45px]"
                />
              </View>
            </View>
            <View className="flex flex-row justify-between">
              <Text className="text-neutral-100 mr-4">
                {txnRes?.toAddress?.substring(0, 12)}...
                {txnRes?.toAddress?.substring(txnRes?.toAddress?.length - 12)}
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  Clipboard.setString(txnRes?.toAddress);
                  ToastShowShort('Copied');
                }}>
                <Copy />
              </TouchableOpacity>
            </View>
          </View>
          <View className="w-full flex flex-col border-b-2 border-[#474747] pb-4">
            <View className="w-full flex flex-row justify-between mt-4">
              <Text className="text-neutral-100">Block No: </Text>
              <Text className="text-neutral-100">{txnRes?.blockNumber}</Text>
            </View>
            <View className="w-full flex flex-row justify-between mt-4">
              <Text className="text-neutral-100">Chain: </Text>
              <Text className="text-neutral-100">
                {chainObj[txnRes?.chainId].symbol}
              </Text>
            </View>
            <View className="w-full flex flex-row justify-between mt-4">
              <Text className="text-neutral-100">Gas Fees: </Text>
              <Text className="text-neutral-100">${getGasFees()}</Text>
            </View>
          </View>
        </ImageBackground>
      </View>
      <View className="w-full h-10 flex flex-row justify-end">
        <TouchableOpacity onPress={() => convertAndShareImage(viewRef)}>
          <Image
            source={require('../../../assets/images/share-new.png')}
            className="w-6 h-6"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TransactionReceipt;
