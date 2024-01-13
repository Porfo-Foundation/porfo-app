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
import ExplorerIcon from '../../assets/icons/svg/swap-explorer-icon.svg';
import ReceiptShare from '../../assets/icons/svg/download-receipt.svg';
import SuccessLogo from '../../assets/icons/svg/success.svg';
import RightArrow from '../../assets/icons/svg/right-arrow-swap.svg';
import Copy from '../../assets/icons/svg/copy-button.svg';
import {convertAndShareImage} from '../../utils/shareData';
import {showAmount} from '../../helpers/showAmount';
import Clipboard from '@react-native-clipboard/clipboard';
import {chainMap} from '../../constants/chain';
import {ToastShowShort} from '../../utils/toast';
import {colorThemes} from '../../constants/themeData';
const {width} = Dimensions.get('screen');

const SwapReceiptPopup = () => {
  const dispatch = useAppDispatch();
  const {selectedTransaction} = useAppSelector(
    state => state.selectedTransaction,
  );
  const sendCoin = selectedTransaction?.sendCoin;
  const receiveCoin = selectedTransaction?.recieveCoin;
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
      <View className="flex flex-col" ref={viewRef}>
        <View className="w-full h-12 flex flex-row justify-between mt-2 p-2 border-b-[0.5px] items-end">
          <View className="flex flex-row justify-start items-end gap-2">
            <TransaferLogo />
            <Text
              className="font-bold text-xl"
              style={{
                color: colorThemes[selectedTheme].textDefault,
              }}>
              Transfer
            </Text>
          </View>
          <Text
            className="font-bold text-lg"
            style={{
              color: colorThemes[selectedTheme].textDefault,
            }}>
            {getDate(selectedTransaction?.txTime)}
          </Text>
        </View>
        <View className="flex flex-col mt-3 justify-start items-center">
          <SuccessLogo width={100} height={100} />
        </View>
        <View className="flex flex-row w-full justify-between px-1 items-center mt-5">
          <View className="flex flex-row w-[40%] h-16 items-center justify-between bg-[#EB8C1E] rounded-2xl">
            <Image
              source={{uri: sendCoin?.logoURI}}
              className="ml-2 w-12 h-12"
            />
            <View className="flex flex-col h-16 items-center justify-center">
              <Text
                className="text-md font-bold"
                style={{
                  color: colorThemes[selectedTheme].textPrimary,
                }}>
                {showAmount(selectedTransaction?.sendValue)}
              </Text>
              <Text
                className="text-xs"
                style={{
                  color: colorThemes[selectedTheme].textPrimary,
                }}>
                ($
                {showAmount(
                  selectedTransaction?.sendValue * sendCoin?.usdPrice,
                )}
                )
              </Text>
            </View>
            <View
              className="flex flex-col h-16 justify-between items-center py-2 rounded-tr-2xl rounded-br-2xl"
              style={{
                backgroundColor: colorThemes[selectedTheme].background,
              }}>
              <Text
                className="text-xs -rotate-90"
                style={{
                  color: colorThemes[selectedTheme].textPrimary,
                }}>
                {sendCoin?.symbol}
              </Text>
              <Image
                source={chainMap[sendCoin?.chainId]?.image}
                className="w-5 h-5 -rotate-90"
              />
            </View>
          </View>
          <View className="flex flex-row">
            <RightArrow width={40} height={40} />
          </View>
          <View className="flex flex-row w-[40%] h-16 items-center justify-between bg-[#3897E3] rounded-2xl">
            <View
              className="flex flex-col h-16 justify-between items-center py-2 rounded-tl-2xl rounded-bl-2xl"
              style={{
                backgroundColor: colorThemes[selectedTheme].background,
              }}>
              <Image
                source={chainMap[receiveCoin?.chainId]?.image}
                className="w-5 h-5 rotate-90"
              />
              <Text
                className="text-xs rotate-90"
                style={{
                  color: colorThemes[selectedTheme].textPrimary,
                }}>
                {receiveCoin?.symbol}
              </Text>
            </View>
            <View className="flex flex-col h-16 items-center justify-center">
              <Text
                className="text-md font-bold"
                style={{
                  color: colorThemes[selectedTheme].textPrimary,
                }}>
                {showAmount(selectedTransaction?.recieveValue)}
              </Text>
              <Text
                className="text-xs"
                style={{
                  color: colorThemes[selectedTheme].textPrimary,
                }}>
                ($
                {showAmount(
                  selectedTransaction?.recieveValue * receiveCoin?.usdPrice,
                )}
                )
              </Text>
            </View>
            <Image
              source={{uri: receiveCoin?.logoURI}}
              className="w-12 h-12 mr-2"
            />
          </View>
        </View>
        <View className="flex flex-row justify-between px-4 mt-5">
          <View className="flex flex-col">
            <Text
              className=""
              style={{
                color: colorThemes[selectedTheme].textDefault,
              }}>
              Swap Rate
            </Text>
            <Text
              className=""
              style={{
                color: colorThemes[selectedTheme].textDefault,
              }}>
              {showAmount(
                selectedTransaction?.recieveValue /
                  selectedTransaction?.sendValue,
              )}{' '}
              {receiveCoin?.symbol}/{sendCoin?.symbol}
            </Text>
          </View>
          <View className="flex flex-col">
            <Text
              className=""
              style={{
                color: colorThemes[selectedTheme].textDefault,
              }}>
              Slippage
            </Text>
            <Text
              className=""
              style={{
                color: colorThemes[selectedTheme].textDefault,
              }}>
              1.2% ($0.10)
            </Text>
          </View>
        </View>
        <View className="flex flex-col p-4 mt-2">
          <Text
            className=""
            style={{
              color: colorThemes[selectedTheme].textDefault,
            }}>
            Transaction Hash
          </Text>
          <View className="flex flex-row w-full justify-between items-center">
            <Text
              className="mt-2"
              style={{
                color: colorThemes[selectedTheme].textDefault,
              }}>
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
        <View className="flex flex-row p-4 justify-between items-center pb-10 mb-10 border-b-[0.5px]">
          <View className="flex flex-col">
            <Text
              className="opacity-50"
              style={{
                color: colorThemes[selectedTheme].textDefault,
              }}>
              Gas Fees
            </Text>
            <Text
              className=""
              style={{
                color: colorThemes[selectedTheme].textDefault,
              }}>
              ${getGasFees()}
            </Text>
          </View>
          <View className="flex flex-col">
            <Text
              className="opacity-50"
              style={{
                color: colorThemes[selectedTheme].textDefault,
              }}>
              Timestamp
            </Text>
            <Text
              className=""
              style={{
                color: colorThemes[selectedTheme].textDefault,
              }}>
              {getDate(selectedTransaction?.txTime)}
              {', '}
              {selectedTransaction?.txTime !== undefined
                ? getTime(selectedTransaction?.txTime)
                : '12.36 pm'}
            </Text>
          </View>
        </View>
      </View>
      <View className="flex flex-row justify-center gap-16 mb-5">
        <TouchableOpacity className="flex flex-row w-20 items-center self-center mb-2">
          <ExplorerIcon width={40} height={40} />
          <Text
            className="font-bold break-words ml-2"
            style={{
              color: colorThemes[selectedTheme].textDefault,
            }}>
            View On Explorer
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => convertAndShareImage(viewRef)}
          className="flex flex-row w-20 items-center self-center mb-2">
          <ReceiptShare width={40} height={40} />
          <Text
            className="font-bold break-words ml-2"
            style={{
              color: colorThemes[selectedTheme].textDefault,
            }}>
            Download and Share
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SwapReceiptPopup;
