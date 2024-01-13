import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import React, {useRef} from 'react';

import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {togglePopup} from '../../redux/features/popupSlice';
import TransaferLogo from '../../assets/icons/svg/receipt-logo.svg';
import {getDate} from '../../utils/getDate';
import {getTime} from '../../utils/getTime';
import ReceiptShare from '../../assets/icons/svg/download-receipt.svg';
import SuccessLogo from '../../assets/icons/svg/success.svg';
import DownArrow from '../../assets/icons/svg/down-arrow-new.svg';
import Copy from '../../assets/icons/svg/copy-button.svg';
import {convertAndShareImage} from '../../utils/shareData';
import {showAmount} from '../../helpers/showAmount';
import Clipboard from '@react-native-clipboard/clipboard';
import {ToastShowShort} from '../../utils/toast';
import {colorThemes} from '../../constants/themeData';
const {width} = Dimensions.get('screen');

const TransactionReceiptPopup = () => {
  const dispatch = useAppDispatch();
  const {selectedTransaction} = useAppSelector(
    state => state.selectedTransaction,
  );
  const coin = selectedTransaction?.coin;
  const viewRef = useRef<any>();
  const getGasFees = () => {
    const fees = showAmount(
      (selectedTransaction.gas * selectedTransaction.gasPrice) / 10 ** 18,
    );
    return fees;
  };
  const {selectedTheme} = useAppSelector(state => state.selectedTheme);
  return (
    <ScrollView>
      {/* <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          dispatch(togglePopup());
        }}>
        <Image
          source={require('../../assets/images/pull-down-blue.png')}
          style={{width: width}}
          resizeMode="stretch"
          className="rounded-t-md"
        />
      </TouchableOpacity> */}
      <View className="flex flex-col" ref={viewRef}>
        <View className="w-full h-12 flex flex-row justify-between mt-2 p-2 border-b-[0.5px] border-[#ffffff] items-end">
          <View className="flex flex-row justify-start items-end gap-2">
            <TransaferLogo />
            <Text
              className="font-bold text-xl"
              style={{color: colorThemes[selectedTheme].textDefault}}>
              Transfer
            </Text>
          </View>
          <Text
            className="font-bold text-lg"
            style={{color: colorThemes[selectedTheme].textDefault}}>
            {getDate(selectedTransaction?.txTime)}
          </Text>
        </View>
        <View className="flex flex-col mt-3 justify-start items-center">
          <SuccessLogo width={100} height={100} />
          <View className="flex flex-row items-center mt-2">
            <Text
              className="text-3xl"
              style={{color: colorThemes[selectedTheme].textDefault}}>
              {showAmount(selectedTransaction?.value)}
            </Text>
            <Text
              className="text-lg"
              style={{color: colorThemes[selectedTheme].textDefault}}>
              {coin?.name}
            </Text>
          </View>

          <Text
            className="text-md"
            style={{color: colorThemes[selectedTheme].textDefault}}>
            ($
            {showAmount(selectedTransaction?.value * coin?.usdPrice)})
          </Text>
        </View>
        <View className="flex flex-col w-full justify-center items-center mt-5 ">
          <View className="flex flex-row w-[95%] h-12 items-center rounded-full bg-[#EB8C1E]">
            <View className="w-10 h-10 rounded-full bg-[#171A3B] ml-1 flex flex-row justify-center items-center">
              <Text
                className="text-lg"
                style={{color: colorThemes[selectedTheme].textPrimary}}>
                ?
              </Text>
            </View>
            <View className="flex flex-col ml-2 justify-center items-start">
              <Text
                className=""
                style={{color: colorThemes[selectedTheme].textPrimary}}>
                Anonymous
              </Text>
              <Text
                className="mr-4"
                style={{color: colorThemes[selectedTheme].textPrimary}}>
                {selectedTransaction?.fromAddress?.substring(0, 15)}...
                {selectedTransaction?.fromAddress?.substring(
                  selectedTransaction?.fromAddress?.length - 15,
                )}
              </Text>
            </View>
          </View>
          <View className="flex flex-row mt-5">
            <DownArrow width={40} height={40} />
          </View>

          <View className="flex flex-row w-[95%] h-12 items-center rounded-full bg-[#3897E3] mt-5">
            <View className="w-10 h-10 rounded-full bg-[#171A3B] ml-1 flex flex-row justify-center items-center">
              <Text className="text-neutral-100 text-lg">?</Text>
            </View>
            <View className="flex flex-col ml-2 justify-center items-start">
              <Text className="text-neutral-100">Anonymous</Text>
              <Text className="text-neutral-100 mr-4">
                {selectedTransaction?.toAddress?.substring(0, 15)}...
                {selectedTransaction?.toAddress?.substring(
                  selectedTransaction?.toAddress?.length - 15,
                )}
              </Text>
            </View>
          </View>
        </View>
        <View className="flex flex-col p-4 mt-2">
          <Text
            className=""
            style={{color: colorThemes[selectedTheme].textDefault}}>
            Transaction Hash
          </Text>
          <View className="flex flex-row w-full justify-between items-center">
            <Text
              className="mt-2"
              style={{color: colorThemes[selectedTheme].textDefault}}>
              {selectedTransaction?.hash?.substring(0, 15)}...............
              {selectedTransaction?.hash?.substring(
                selectedTransaction?.hash?.length - 15,
              )}
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                Clipboard.setString(selectedTransaction?.hash);
                ToastShowShort('Copied');
              }}>
              <Copy />
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex flex-row p-4 justify-between items-center">
          <View className="flex flex-col">
            <Text
              className="opacity-50"
              style={{color: colorThemes[selectedTheme].textDefault}}>
              Gas Fees
            </Text>
            <Text
              className=""
              style={{color: colorThemes[selectedTheme].textDefault}}>
              ${getGasFees()}
            </Text>
          </View>
          <View className="flex flex-col">
            <Text
              className="opacity-50"
              style={{color: colorThemes[selectedTheme].textDefault}}>
              Timestamp
            </Text>
            <Text
              className=""
              style={{color: colorThemes[selectedTheme].textDefault}}>
              {getDate(selectedTransaction?.txTime)}
              {', '}
              {selectedTransaction?.txTime !== undefined
                ? getTime(selectedTransaction?.txTime)
                : '12.36 pm'}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => convertAndShareImage(viewRef)}
        className="flex flex-row items-center self-center mb-2">
        <ReceiptShare width={40} height={40} />
        <Text
          className="font-bold break-words ml-2"
          style={{color: colorThemes[selectedTheme].textDefault}}>
          Download and Share
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default TransactionReceiptPopup;
