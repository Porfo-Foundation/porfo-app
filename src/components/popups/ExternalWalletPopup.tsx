import React, {useState} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import {useAppDispatch} from '../../redux/hooks';
import {togglePopup} from '../../redux/features/popupSlice';
import {addEOA, getEOAs} from '../../apiCalls/wallet';
import {updateEOAs} from '../../redux/features/mainSlice';
import { ToastShowShort } from '../../utils/toast';

const {width} = Dimensions.get('screen');
const ExternalWalletPopup = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const dispatch = useAppDispatch();
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
      <View className="pt-5 pb-8 px-6">
        <Text className="font-[PlusJakartaSans-semiBold] text-lg text-[#FFFFFF] mb-2">
          Connect to External Wallet
        </Text>
        <TextInput
          className="font-[PlusJakartaSans-SemiBold text-[#FFFFFF] bg-[#30496e] rounded-lg"
          placeholder="Wallet Address"
          placeholderTextColor="#999999"
          value={walletAddress}
          onChangeText={text => setWalletAddress(text)}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={async () => {
            try {
              const res = await addEOA(walletAddress);
              // const {walletAddress, add, info} = res;
              ToastShowShort(res.info);
              //shows EOA instantly
              const data = await getEOAs();
              dispatch(updateEOAs(data.EOAs));
              //TODO: Remove this after React Query is implemented
              //updates EOA after 10 seconds
              setTimeout(async () => {
                const data2 = await getEOAs();
                dispatch(updateEOAs(data2.EOAs));
              }, 10000);
              dispatch(togglePopup());
            } catch (error) {
              ToastShowShort('Internal Server error');
            }
          }}
          className="bg-[#4845F8] px-16 py-2 rounded-full mt-8 mb-4">
          <Text className="font-[PlusJakartaSans-semiBold] text-lg text-[#FFFFFF] text-center">
            Connect
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ExternalWalletPopup;
