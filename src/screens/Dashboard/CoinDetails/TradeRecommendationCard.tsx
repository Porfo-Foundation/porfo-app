import {View, Text, TouchableOpacity, Image, Modal} from 'react-native';
import React, {useState} from 'react';
import Arrow from '../../../assets/icons/svg/right-arrow.svg';
import ArrowForward from '../../../assets/icons/svg/arrow-forward.svg';
import BTC from '../../../assets/icons/svg/btc.svg';
import ETH from '../../../assets/icons/svg/eth.svg';
import Swap from '../../../assets/icons/svg/swap.svg';
import {TextInput} from 'react-native-gesture-handler';

const TradeRecommendationCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <View className="relative w-fit h-fit mt-2">
      <View className="w-full h-[220px] rounded-xl absolute border-2 z-[10] bg-[#000000] opacity-90 justify-center items-center">
        <Text className="text-neutral-100 text-2xl">Coming Soon</Text>
      </View>
      <TouchableOpacity
        className="w-full h-[220px] rounded-xl px-3 py-5 -z-1"
        activeOpacity={0.8}
        onPress={() => setIsModalOpen(true)}>
        <Modal
          visible={isModalOpen}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setIsModalOpen(false)}>
          <View className="rounded-md">
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setIsModalOpen(false)}>
              <Image
                source={require('../../../assets/images/pull-down-blue.png')}
                // style={{width: width - 32}}
                resizeMode="contain"
                className="rounded-t-md"
              />
            </TouchableOpacity>
            <View className="p-3 px-5">
              <View className="flex flex-row justify-between items-center">
                <View>
                  <View className="flex items-center flex-row gap-x-4">
                    <BTC />
                    <Text className="font-[PlusJakartaSans-SemiBold] text-lg text-[#FFFFFF]">
                      BTC
                    </Text>
                  </View>
                  <View className="flex-row gap-x-2">
                    <Text className="font-[PlusJakartaSans-SemiBold] text-xs text-[#FFFFFF] opacity-60">
                      Balance:{' '}
                    </Text>
                    <Text className="font-[PlusJakartaSans-SemiBold] text-xs text-[#FFFFFF]">
                      2.284 BTC
                    </Text>
                  </View>
                </View>
                <View className="flex flex-col items-end justify-center">
                  <Text className="font-[PlusJakartaSans-SemiBold] text-3xl text-[#3BEE4C] text-center">
                    + 7%
                  </Text>
                  <Text className="font-[PlusJakartaSans-SemiBold] text-xs text-[#FFFFFF] w-2/3 text-center">
                    Instant on initial value
                  </Text>
                </View>
              </View>
              <Text className="text-lg text-[#FFFFFF] mt-2">
                Portfolio Name
              </Text>
              <TextInput
                className="text-[#FFFFFF] bg-[#30496e] rounded-lg"
                placeholder="Lorem project"
                placeholderTextColor="#999999"
              />
              <View className="flex flex-row items-center justify-center my-2">
                <Swap />
              </View>
              <Text className="text-lg text-[#FFFFFF]">Portfolio Name</Text>
              <TextInput
                className="font-[PlusJakartaSans-SemiBold text-[#FFFFFF] bg-[#30496e] rounded-lg"
                placeholder="Lorem project"
                placeholderTextColor="#999999"
              />
              <View className="flex-row justify-center mt-2 pb-12">
                <TouchableOpacity
                  activeOpacity={0.8}
                  className="bg-[#4845F8] px-16 py-2 rounded-lg">
                  <Text className="text-lg text-[#FFFFFF]">Swap</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <View className="flex-row items-center justify-between">
          <Text className="font-[PlusJakartaSans-SemiBold] text-xl text-[#FFFFFF] opacity-50">
            Trade Recommendation
          </Text>
          <Arrow />
        </View>
        <View className="mt-3 flex-row items-center gap-x-6 justify-between">
          <View className="flex items-center flex-row gap-x-2">
            <BTC />
            <View>
              <Text className="font-[PlusJakartaSans-SemiBold] text-xs text-[#FFFFFF]">
                BTC
              </Text>
              <Text className="font-[PlusJakartaSans-SemiBold] text-xs text-semantic-error">
                $24,689
              </Text>
            </View>
          </View>
          <ArrowForward />
          <View className="flex items-center flex-row gap-x-2">
            <ETH />
            <View>
              <Text className="font-[PlusJakartaSans-SemiBold] text-xs text-[#FFFFFF]">
                ETH
              </Text>
              <Text className="font-[PlusJakartaSans-SemiBold] text-xs text-semantic-success">
                $4,321
              </Text>
            </View>
          </View>
        </View>
        <View className="flex flex-row justify-between items-end">
          <View className="mt-2 flex-col justify-between items-start">
            <View className="pb-3 flex-1">
              <Text className=" text-xs text-[#FFFFFF] opacity-50">
                Current Holdings
              </Text>
              <Text className="font-[PlusJakartaSans-SemiBold] text-lg text-[#FFFFFF]">
                3.228
              </Text>
            </View>
            <View className="flex flex-row gap-x-4">
              <View>
                <Text className="font-[PlusJakartaSans-Regular] text-[10px] text-[#FFFFFF] opacity-50">
                  USD Value
                </Text>
                <Text className="font-[PlusJakartaSans-SemiBold] text-sm text-[#FFFFFF]">
                  3.228
                </Text>
              </View>
              <View>
                <Text className="font-[PlusJakartaSans-Regular] text-[10px] text-[#FFFFFF] opacity-50">
                  USD Value
                </Text>
                <Text className="font-[PlusJakartaSans-SemiBold] text-sm text-[#FFFFFF]">
                  3.228
                </Text>
              </View>
            </View>
          </View>
          <View className="flex-row h-14 items-center gap-x-2 bg-[#2B2933] pr-6 border-t-2 border-l-2 border-b-2 border-[#E94560] rounded-tl-xl rounded-bl-xl -mr-3 py-1 w-48">
            <View className="flex-row items-end">
              <Text className="font-[PlusJakartaSans-SemiBold] text-3xl text-[#3BEE4C]">
                + 7
              </Text>
              <Text className="font-[PlusJakartaSans-Regular] text-sm text-[#3BEE4C]">
                %
              </Text>
            </View>
            <View>
              <Text className="font-[PlusJakartaSans-Regular] text-sm text-[#ffffff] opacity-70">
                Instant on
              </Text>
              <Text className="font-[PlusJakartaSans-Regular] text-sm text-[#ffffff] opacity-70">
                intial value
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default TradeRecommendationCard;
