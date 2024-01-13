import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
import React from 'react';
import Copy from '../../../assets/icons/svg/copy.svg';
import Detail from '../../../assets/icons/svg/details.svg';
import Spin from '../../../assets/icons/svg/spin.svg';

const {width} = Dimensions.get('screen');

const Details = () => {
  return (
    <View className="bg-[#344A71] p-4 rounded-xl">
      <View className="flex-row justify-between">
        <View className="flex flex-row items-center gap-x-2">
          <Image
            source={require('../../../assets/images/avatar-default.png')}
          />
          <View>
            <Text className="font-[PlusJakartaSans-semiBold] text-lg text-[#FFFFFF]">
              0x489a…9bec
            </Text>
            <View className="flex-row gap-x-4 mt-1">
              <Text className="font-[PlusJakartaSans-semiBold] text-xs text-[#b8b8b8]">
                Followers{' '}
                <Text className="font-[PlusJakartaSans-SemiBold] text-xs text-[#FFFFFF]">
                  {' '}
                  631
                </Text>
              </Text>
              <Text className="font-[PlusJakartaSans-semiBold] text-xs text-[#b8b8b8]">
                TVF{' '}
                <Text className="font-[PlusJakartaSans-SemiBold] text-xs text-[#FFFFFF]">
                  {' '}
                  $16,214,222
                </Text>
              </Text>
            </View>
          </View>
        </View>
        <View className="flex-row gap-x-1">
          <Copy />
          <Detail />
        </View>
      </View>
      <Text className="font-[PlusJakartaSans-semiBold] text-sm text-[#b8b8b8] my-5">
        This user has not added a bio yet
      </Text>
      <View className="flex-row gap-x-6">
        <View>
          <Text className="font-[PlusJakartaSans-semiBold] text-xs text-[#b8b8b8]">
            TVF
          </Text>
          <Text className="font-[PlusJakartaSans-SemiBold] text-xs text-[#FFFFFF]">
            $16,214,222
          </Text>
        </View>
        <View>
          <Text className="font-[PlusJakartaSans-semiBold] text-xs text-[#b8b8b8]">
            Followers
          </Text>
          <Text className="font-[PlusJakartaSans-SemiBold] text-xs text-[#FFFFFF]">
            $16,214,222
          </Text>
        </View>
        <TouchableOpacity
          className="border border-[#4845F8] items-center py-1 px-10 rounded-full"
          activeOpacity={0.8}>
          <Text className="font-[PlusJakartaSans-SemiBold] text-sm text-[#ffffff]">
            Follow
          </Text>
        </TouchableOpacity>
      </View>
      <View className="my-6 flex-row">
        <Text className="font-[PlusJakartaSans-semiBold] text-2xl text-[#FFFFFF]">
          $369,600,388
        </Text>
        <Spin />
      </View>
      <Image
        source={require('../../../assets/icons/svg/graph-small.png')}
        style={{width: width - 64}}
      />
    </View>
  );
};

export default Details;
