import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import DashboardLayout from '../DashboardLayout';
import PullDownPage from './PullDownPage';
import BackButton from '../../../assets/icons/svg/back-white.svg';

const {width, height} = Dimensions.get('screen');

const FillGasTank = ({navigation}: any) => {
  const [contentVisible, setContentVisible] = useState(false);
  const percentages = [10, 20, 30, 50, 70, 100];
  return (
    <DashboardLayout
      component={<PullDownPage />}
      openContent={contentVisible}
      onCloseContent={() => setContentVisible(false)}>
      <View
        className="w-full flex flex-col justify-between items-center py-2"
        style={{height: height - 60}}>
        <View className="w-full h-8 flex items-center flex-row px-4 gap-x-4">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackButton />
          </TouchableOpacity>
          <Text className="text-[#fff] font-[PlusJakartaSans-SemiBold] text-xl">
            Fill Gas Tank
          </Text>
        </View>
        <View className="w-full h-[35%]">
          <View className="flex-row items-center justify-between px-10 my-2">
            <View>
              <Text className="text-[#fff] font-[PlusJakartaSans-Bold] text-md">
                Current Balance
              </Text>
              <View className="flex flex-row items-end">
                <Text className="text-[#fff] font-[PlusJakartaSans-Bold] text-xl">
                  7,115,200
                </Text>
                <Text className="text-[#fff] font-[PlusJakartaSans-SemiBold] text-xs pb-0.5">
                  .00
                </Text>
              </View>
            </View>
            <View>
              <Text className="text-[#fff] font-[PlusJakartaSans-Bold] text-md">
                Gas Tank Balance
              </Text>
              <View className="flex flex-row items-end">
                <Text className="text-[#fff] font-[PlusJakartaSans-Bold] text-xl">
                  135,800
                </Text>
                <Text className="text-[#fff] font-[PlusJakartaSans-SemiBold] text-xs pb-0.5">
                  .00
                </Text>
              </View>
            </View>
          </View>
          <View className="px-6">
            <View className="flex-row justify-around">
              {percentages?.map((percentage, idx) => (
                <TouchableOpacity
                  className="bg-[#CC584C] px-1.5 py-0.5 rounded"
                  key={idx}>
                  <Text className="text-[#fff] font-[PlusJakartaSans-Bold] text-xs">
                    {percentage}%
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TextInput className="bg-[#D9D9D9] py-1 rounded mt-4" />
          </View>
          <View className="items-center justify-center">
            <TouchableOpacity className="bg-[#CC584C] px-1.5 py-0.5 rounded mt-3">
              <Text className="text-[#fff] font-[PlusJakartaSans-Bold] px-6 py-1 pb-1.5">
                ADD FUEL
              </Text>
            </TouchableOpacity>
            <View className="flex-row gap-x-1 mt-4">
              <Text className="text-[#fff] font-[PlusJakartaSans-Bold]">
                Not have enough Porfo?
              </Text>
              <TouchableOpacity>
                <Text className="text-[#EEB155]  font-[PlusJakartaSans-Bold]">
                  Buy Now
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View className="relative w-full h-[55%] flex flex-col justify-start">
          <View className="h-[300px] w-[350px] relative items-center">
            <View className="absolute z-30 w-full justify-center mt-[80px]">
              <View className="ml-[120px]">
                <Text className="text-[#fff] font-[PlusJakartaSans-Bold] text-md">
                  FUEL
                </Text>
                <View className="flex flex-row items-end">
                  <Text className="text-[#fff] font-[PlusJakartaSans-Bold] text-md">
                    135,800.00
                  </Text>
                </View>
              </View>
            </View>
            <Image
              source={require('../../../assets/images/fuel_porfo_2.png')}
              className="w-[100%] h-full self-end"
              resizeMode="contain"
            />
          </View>
          <View className="absolute bottom-6 top-auto left-0 right-0 w-full h-16 flex flex-row justify-between items-center">
            <Image
              source={require('../../../assets/images/logo_pulldown.png')}
              className="w-28"
              resizeMode="contain"
            />
            <TouchableOpacity onPress={() => navigation.navigate('Chatbot')}>
              <Image
                source={require('../../../assets/images/ask_porfo.png')}
                className="h-10 w-32"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </DashboardLayout>
  );
};

export default FillGasTank;
