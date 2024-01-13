import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useAppDispatch} from '../../../redux/hooks';
import {togglePopup, updatepopupName} from '../../../redux/features/popupSlice';
import Likes from '../../../assets/icons/svg/likes.svg';

const ReferAndEarn = () => {
  const dispatch = useAppDispatch();
  const referalArray = [
    {address: '0x12345....89765adbee4', value: 4.78},
    {address: '0x12345....89765adbee4', value: 4.78},
    {address: '0x12345....89765adbee4', value: 4.78},
    {address: '0x12345....89765adbee4', value: 4.78},
    {address: '0x12345....89765adbee4', value: 4.78},
    {address: '0x12345....89765adbee4', value: 4.78},
    {address: '0x12345....89765adbee4', value: 4.78},
    {address: '0x12345....89765adbee4', value: 4.78},
    {address: '0x12345....89765adbee4', value: 4.78},
  ];
  return (
    <View className="w-full px-2">
      <View className="w-[99%] h-36 bg-[#F59300] flex flex-row self-center rounded-md mt-4 px-2 justify-between border-2">
        <View className="flex flex-col mt-5 justify-between pb-5">
          <View className="flex flex-row">
            <Text className="h-12 w-20 break-all text-neutral-100">
              Total No of Referals
            </Text>
            <Text className="text-neutral-100 font-bold text-3xl">12</Text>
          </View>
          <Text className="text-neutral-100">Your Friends, Your Rewards</Text>
        </View>
        <View className="flex flex-col justify-between items-center mb-4">
          <Image
            source={require('../../../assets/images/likes.png')}
            className="mt-2"
          />
          <TouchableOpacity
            onPress={() => {
              dispatch(updatepopupName('ReferAndEarn'));
              dispatch(togglePopup());
            }}
            className="w-[100px] h-8 justify-center items-center bg-[#382461] rounded-md">
            <Text className="text-neutral-100">INVITE NOW</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text className="text-neutral-100 text-xl font-bold mt-4">
        Top Referals
      </Text>
      {referalArray.map((referal: any, index: number) => {
        return (
          <View
            key={index}
            className="w-[99%] flex flex-row justify-between items-center border-b-2 py-2 pr-3 border-neutral-100">
            <Text className="text-neutral-100">{referal.address}</Text>
            <Text className="text-neutral-100">{referal.value}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default ReferAndEarn;
