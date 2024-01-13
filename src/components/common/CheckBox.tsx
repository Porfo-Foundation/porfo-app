import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
type propsType = {
  isChecked: boolean;
  setIsChecked: any;
};

const CheckBox = ({isChecked, setIsChecked}: propsType) => {
  const handleIsChecked = () => {
    setIsChecked(!isChecked);
  };
  return (
    <TouchableOpacity onPress={handleIsChecked}>
      {isChecked ? (
        <Image
          source={require('../../assets/images/checkbox.png')}
          className="w-7 h-7"
        />
      ) : (
        <View className="w-6 h-6 border-2 border-[#2D2D2D] bg-[#101010] rounded-sm"></View>
      )}
    </TouchableOpacity>
  );
};

export default CheckBox;
