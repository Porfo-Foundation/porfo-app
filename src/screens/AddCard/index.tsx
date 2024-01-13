import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import DashboardLayout from '../Dashboard/DashboardLayout';
import Add from '../../assets/icons/svg/add.svg';
import Edit from '../../assets/icons/svg/edit.svg';
import Dropdown from '../../assets/icons/svg/dropdown-orange.svg';
import LeftArrowButton from '../../assets/icons/svg/left-arrow-button.svg';

const AddCard = ({navigation}: any) => {
  const [contentVisible, setContentVisible] = useState(false);
  return (
    <DashboardLayout
      openContent={contentVisible}
      onCloseContent={() => setContentVisible(false)}
      component={
        <View>
          <Text>Test</Text>
        </View>
      }>
      <SafeAreaView>
        <ScrollView>
          <View className="flex-row items-center justify-between mx-4">
            <View className="gap-y-4">
              <Text className="font-[PlusJakartaSans-SemiBold] text-xl text-[#FFFFFF]">
                Welcome, Soneshwar
              </Text>
              <Text className="font-[PlusJakartaSans-SemiBold] text-xs text-[#FFFFFF]">
                soneshwar.porfo
              </Text>
            </View>
            <View>
              {/* <Image source={require('../../assets/images/pfp.png')} /> */}
            </View>
          </View>
          <View className="flex-row items-center gap-x-1 my-2 mx-4">
            <View className="flex-1 bg-[#171A3B] p-3 flex-row gap-x-2 rounded-xl">
              <View>
                <Image source={require('../../assets/images/qr-code.png')} />
              </View>
              <View className="justify-between flex-1">
                <View className="flex-row justify-between items-start">
                  <View>
                    <Text className="font-[PlusJakartaSans-SemiBold] text-xl text-[#FFFFFF]">
                      Savings
                    </Text>
                    <Text className="font-[PlusJakartaSans-SemiBold] text-xs text-[#FFFFFF]">
                      savings@soneshwar.porfo
                    </Text>
                  </View>
                  <View>
                    <Edit />
                  </View>
                </View>
                <View className="flex-row justify-between items-center">
                  <View className="flex-row items-center gap-x-2">
                    <Image
                      source={require('../../assets/images/icon-1.png')}
                      className="w-6 h-6"
                    />
                    <Image
                      source={require('../../assets/images/icon-1.png')}
                      className="w-6 h-6"
                    />
                    <Image
                      source={require('../../assets/images/icon-1.png')}
                      className="w-6 h-6"
                    />
                  </View>
                  <Add />
                </View>
              </View>
            </View>
          </View>
          <View className="mx-4 my-3">
            <Text className="font-[PlusJakartaSans-SemiBold] text-lg text-[#FFFFFF]">
              Account Type
            </Text>
            <View className="border border-[#3897E3] p-2 w-full mt-2 flex-row items-center justify-between">
              <Text className="font-[PlusJakartaSans-SemiBold] text-lg text-[#FFFFFF]">
                One Time Payment
              </Text>
              <Dropdown />
            </View>
            <Text className="font-[PlusJakartaSans-SemiBold] text-lg text-[#FFFFFF] mt-3">
              Account Name
            </Text>
            <View className="border border-[#3897E3] w-full mt-2 flex-row items-center justify-between">
              <TextInput className="font-[PlusJakartaSans-SemiBold] text-lg text-[#FFFFFF] w-full px-2" />
            </View>
            <Text className="font-[PlusJakartaSans-SemiBold] text-lg text-[#FFFFFF] mt-3">
              Account Address
            </Text>
            <View className="border border-[#3897E3] w-full mt-2 flex-row items-center justify-between">
              <TextInput className="font-[PlusJakartaSans-SemiBold] text-lg text-[#FFFFFF] w-full px-2" />
            </View>
            <Text className="font-[PlusJakartaSans-SemiBold] text-lg text-[#FFFFFF] mt-3">
              Opening Balance
            </Text>
            <View className="border border-[#3897E3] w-full mt-2 flex-row items-center justify-between">
              <TextInput className="font-[PlusJakartaSans-SemiBold] text-lg text-[#FFFFFF] w-full px-2" />
            </View>
            <View className="items-center">
              <TouchableOpacity className="bg-[#3897E3] rounded w-fit my-6">
                <Text className="font-[PlusJakartaSans-SemiBold] text-lg text-[#FFFFFF] px-8 py-2">
                  Save Card
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <LeftArrowButton />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </DashboardLayout>
  );
};

export default AddCard;
