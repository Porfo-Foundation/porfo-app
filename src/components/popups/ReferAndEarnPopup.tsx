import React, {useState} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Share,
  ToastAndroid,
  Dimensions,
} from 'react-native';

//icons

import ShareIcon from '../../assets/icons/svg/share-icon.svg';
import Clipboard from '@react-native-clipboard/clipboard';
import {useAppDispatch} from '../../redux/hooks';
import {togglePopup} from '../../redux/features/popupSlice';
import { ToastShowShort } from '../../utils/toast';

const {width} = Dimensions.get('screen');

const ReferAndEarnPopup = () => {
  const dispatch = useAppDispatch();
  const [referalCode, setReferalCode] = useState(
    'http://www.giottus.com/?referalcode',
  );

  const shareReferalCode = async () => {
    try {
      await Share.share({
        message: '' + referalCode,
      });
    } catch (error) {
      console.log('Referandearn error...', error);
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
      <View className="pt-5 pb-8 px-2 w-full">
        <View className="flex flex-col items-center ">
          <Image
            source={require('../../assets/images/gift.png')}
            className="w-28 h-24"
          />
          <Text className="text-neutral-100 mt-3 font-bold text-lg">
            Refer and Earn Porfo Tokens
          </Text>
          <Text className="text-neutral-100 opacity-50 mt-5">
            TEXT FOR REFERRER, WRITE HERE USING GPT
          </Text>
        </View>
        <Text className="text-neutral-100 mx-3 font-bold mt-16">
          Your Referal Link
        </Text>
        <View className="flex flex-col w-full justify-center items-center mt-4">
          <View className="flex flex-row w-[95%] h-12 justify-between items-center bg-[#ffffff] p-2 rounded mx-3">
            <Text className="font-[PlusJakartaSans-semiBold] text-sm">
              {referalCode.substring(0, 30)}.....
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              className="w-24 h-8 bg-primary-600 justify-center items-center rounded-md"
              onPress={() => {
                if (referalCode) {
                  Clipboard.setString(referalCode);
                  ToastShowShort('Copied');
                }
              }}>
              <Text>Copy Code</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            className="flex flex-row w-[95%] bg-[#0f0e29] p-2 rounded mx-3 mt-4 h-12 justify-center items-center"
            onPress={shareReferalCode}>
            <Text className="text-neutral-100">SHARE NOW</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity className="mt-6 self-center">
          <Text className="text-[#251d42]">Terms and Condition Applied</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReferAndEarnPopup;
