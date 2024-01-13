import {View, Text, ImageBackground, ScrollView} from 'react-native';
import React from 'react';
import InactivePortfolioCard from '../Dashboard/DashboardLanding/InactivePortfolioCard';
import Logo from '../../assets/icons/svg/logo.svg';

const SocialPage = () => {
  return (
    <ScrollView contentContainerStyle={{paddingVertical: 16}}>
      <Text
        className={`text-lg text-[#FFFFFF] ml-1 mb-6 px-4`}>
        Social Board
      </Text>
      <ImageBackground
        imageStyle={{
          borderRadius: 8,
          marginHorizontal: 16,
        }}
        source={require('../../assets/images/referral-message-bg.png')}>
        <View className="p-6">
          <Text
            className={`font-[PlusJakartaSans-Bold] text-xl text-[#FFFFFF] ml-1 w-4/6 mb-2`}>
            30% Commission for friends referral
          </Text>
          <Text
            className={`font-[PlusJakartaSans-SemiBold] text-xs text-[#999999] ml-1 w-1/2`}>
            Transaction fees to earn for every trade from a referral
          </Text>
        </View>
      </ImageBackground>
      <Text
        className={`text-lg text-[#FFFFFF] ml-1 my-4 px-4`}>
        Suggestion
      </Text>
      <InactivePortfolioCard horizontal />
      <InactivePortfolioCard horizontal />
      <Text
        className={`text-lg text-[#FFFFFF] ml-1 my-4 px-4`}>
        My Wallet
      </Text>
      <View className="mx-4 pb-6">
        <View className="bg-[#1C416D] rounded-lg px-4 py-6 flex flex-row mb-6">
          <View className="border-r border-[#d9d9d923] pr-12 mr-12">
            <View className="mb-6">
              <Text
                className={`font-[PlusJakartaSans-Bold] text-xl text-[#FFFFFF]`}>
                567.36
              </Text>
              <Text
                className={`font-[PlusJakartaSans-SemiBold] text-sm text-[#999999]`}>
                USDT
              </Text>
            </View>
            <View>
              <Text
                className={`font-[PlusJakartaSans-Bold] text-xl text-[#FFFFFF]`}>
                +99.99
              </Text>
              <Text
                className={`font-[PlusJakartaSans-SemiBold] text-sm text-[#999999]`}>
                Total Revenue
              </Text>
            </View>
          </View>
          <View>
            <View className="mb-6">
              <Text
                className={`font-[PlusJakartaSans-Bold] text-xl text-[#FFFFFF]`}>
                267.53
              </Text>
              <Text
                className={`font-[PlusJakartaSans-SemiBold] text-sm text-[#999999]`}>
                SNAP
              </Text>
            </View>
            <View>
              <Text
                className={`font-[PlusJakartaSans-Bold] text-xl text-[#FFFFFF]`}>
                23.12
              </Text>
              <Text
                className={`font-[PlusJakartaSans-SemiBold] text-sm text-[#999999]`}>
                Revenue Today
              </Text>
            </View>
          </View>
        </View>
        <Logo />
      </View>
    </ScrollView>
  );
};

export default SocialPage;
