import {View, Text, TouchableOpacity, Share, Alert} from 'react-native';
import React from 'react';
import {useAppSelector} from '../../../redux/hooks';
import {colorThemes} from '../../../constants/themeData';

import QRCode from 'react-native-qrcode-svg';
import Clipboard from '@react-native-clipboard/clipboard';
import {ToastShowShort} from '../../../utils/toast';

const ActionsheetReceive = () => {
  const {selectedTheme} = useAppSelector(state => state.selectedTheme);
  const {smartAccountAddress} = useAppSelector(state => state.auth);

  const shareSmartAccount = async () => {
    try {
      await Share.share({
        message:
          `Hi. This is my wallet address. It can work on any evm chain and has
          been generated using Porfo.Address: ` + smartAccountAddress,
      });
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };
  return (
    <View className="items-center pt-5 pb-8">
      <Text
        className="font-[PlusJakartaSans-SemiBold] text-center text-xl"
        style={{
          color: colorThemes[selectedTheme].textDefault,
        }}>
        Your Address
      </Text>
      <View className="my-5 p-4">
        <QRCode
          value={`${smartAccountAddress}`}
          size={200}
          color={colorThemes[selectedTheme].background}
        />
      </View>
      <Text
        className="font-[PlusJakartaSans-semiBold] text-base text-center"
        style={{color: colorThemes[selectedTheme].textDefault}}>
        Scan to get receive address
      </Text>
      <View className="flex-row items-center gap-x-2 mt-4">
        <View className="p-2 rounded">
          <Text
            className="font-[PlusJakartaSans-semiBold] text-sm opacity-80"
            style={{color: colorThemes[selectedTheme].textDefault}}>
            {smartAccountAddress}
          </Text>
        </View>
      </View>
      <View className="flex flex-row justify-center gap-x-2 mt-2">
        <TouchableOpacity
          activeOpacity={0.8}
          className="p-2 rounded"
          onPress={() => {
            if (smartAccountAddress) {
              Clipboard.setString(smartAccountAddress);
              ToastShowShort('Copied');
            }
          }}>
          {colorThemes[selectedTheme].copySecondary}
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          className="p-2 rounded"
          onPress={shareSmartAccount}>
          {colorThemes[selectedTheme].shareSecondary}
        </TouchableOpacity>
      </View>
      <Text
        className="font-[PlusJakartaSans-semiBold] text-xs opacity-50 mt-4 text-center"
        style={{color: colorThemes[selectedTheme].textDefault}}>
        * This address is unique to your wallet and can be used to receive any
        ERC20 Token or ETH, BNB, MATIC and other EVM based tokens
      </Text>
    </View>
  );
};

export default ActionsheetReceive;
