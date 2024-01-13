import {View, Text} from 'react-native';
import React from 'react';

const TimeStamp = ({timestamp}: any) => {
  return (
    <View className="flex flex-row items-center justify-center my-4">
      <Text className="bg-[#002F67] font-[PlusJakartaSans-SemiBold] text-[#FFFFFF] text-[10px] text-center px-2 py-1 rounded-full">
        01-01-2022
      </Text>
    </View>
  );
};

export default TimeStamp;
