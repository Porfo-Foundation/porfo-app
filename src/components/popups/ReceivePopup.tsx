import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Share,
  Dimensions,
  Alert,
} from 'react-native';
import {useAppSelector} from '../../redux/hooks';
import QRCode from 'react-native-qrcode-svg';

import Copy from '../../assets/icons/svg/copy-button.svg';
import ShareIcon from '../../assets/icons/svg/share-icon.svg';
import Clipboard from '@react-native-clipboard/clipboard';
import colors from '../../../config/colors';
import {useAppDispatch} from '../../redux/hooks';
import {togglePopup} from '../../redux/features/popupSlice';
import { ToastShowShort } from '../../utils/toast';

const {width} = Dimensions.get('screen');

const ReceivePopup = () => {
  const dispatch = useAppDispatch();
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
    <View className="bg-[#0D2B59] rounded-md absolute bottom-0 right-0 left-0 top-auto">
      <TouchableOpacity
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
      </TouchableOpacity>
      <View className="items-center pt-5 pb-8">
        <View className="my-5 border-2 border-neutral-800 p-4">
          <QRCode
            value={`${smartAccountAddress}`}
            size={200}
            color={colors.neutral[100]}
            backgroundColor="#0D2B59"
          />
        </View>
        <Text className="font-[PlusJakartaSans-semiBold] text-base text-[#FFFFFF] text-center">
          Scan to get receive address
        </Text>
        <Text className="text-neutral-100 opacity-50 text-xm">
          Hi. This is my wallet address. It can work on any evm chain and has
          been generated using Porfo.
        </Text>
        <View className="flex-row items-center gap-x-2 mt-4">
          <View className="bg-[#FEFDFD1A] p-2 rounded">
            <Text className="font-[PlusJakartaSans-semiBold] text-sm text-[#FFFFFF] opacity-80">
              {smartAccountAddress}
            </Text>
          </View>
        </View>
        <View className="flex flex-row justify-center gap-x-2 mt-2">
          <TouchableOpacity
            activeOpacity={0.8}
            className="bg-[#171A3B] p-2 rounded"
            onPress={() => {
              if (smartAccountAddress) {
                Clipboard.setString(smartAccountAddress);
                ToastShowShort('Copied');
              }
            }}>
            <Copy />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            className="bg-[#171A3B] p-2 rounded"
            onPress={shareSmartAccount}>
            <ShareIcon width={20} height={20} />
          </TouchableOpacity>
        </View>
        <Text className="font-[PlusJakartaSans-semiBold] text-xs text-[#FFFFFF] opacity-50 mt-1 mx-1 text-center">
          Do check out the app and have yourself a safe investing in crypto.
        </Text>
        <Text className="font-[PlusJakartaSans-semiBold] text-xs text-[#FFFFFF] opacity-50 mt-4 text-center">
          * Block/Time will be calculated after the transaction
        </Text>
        <Text className="font-[PlusJakartaSans-semiBold] text-xs text-[#FFFFFF] opacity-50 text-center">
          is generated and broadcasted
        </Text>
      </View>
    </View>
  );
};

export default ReceivePopup;
