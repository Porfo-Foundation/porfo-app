import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '../../redux/hooks';
import {togglePopup} from '../../redux/features/popupSlice';

const {width} = Dimensions.get('screen');
const WatchAddressPopup = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
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
          Add an Address to watch
        </Text>
        <TextInput
          className="font-[PlusJakartaSans-SemiBold text-[#FFFFFF] bg-[#30496e] rounded-lg"
          placeholder="0xabc....."
          placeholderTextColor="#999999"
        />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('AddNew')}
          className="bg-[#4845F8] px-16 py-2 rounded-full mt-8 mb-4">
          <Text className="font-[PlusJakartaSans-semiBold] text-lg text-[#FFFFFF] text-center">
            Add
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WatchAddressPopup;
