import {View, Text, Switch} from 'react-native';
import React, {useState} from 'react';
type propsType = {
  optionFirst: string;
  optionSecond: string;
};
const CustomToggleSwitch = ({optionFirst, optionSecond}: propsType) => {
  const [isUSDT, setIsUSDT] = useState(true);

  const handleSwitch = () => {
    setIsUSDT(!isUSDT);
  };
  return (
    <View className="flex-1 flex-row justify-center items-center text-center">
      <Text className="dark:text-neutral-200">
        {isUSDT ? optionFirst : optionSecond}
      </Text>
      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isUSDT ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={handleSwitch}
        value={isUSDT}
      />
    </View>
  );
};

export default CustomToggleSwitch;
