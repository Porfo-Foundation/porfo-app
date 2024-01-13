import {View, Text, Pressable} from 'react-native';
import React, {useState} from 'react';

type propsType = {
  amount: number;
  name: string;
  usdPrice: number;
};
const CurrencySwitch = ({amount, name, usdPrice}: propsType) => {
  const [currencyAmount, setCurrencyAmount] = useState(amount);
  const [currencyName, setCurrencyName] = useState(name);
  const handlePress = () => {
    if (currencyName === 'USDT') {
      if (usdPrice !== 0) {
        setCurrencyAmount(currencyAmount / usdPrice);
        setCurrencyName(name);
      } else {
        setCurrencyAmount(0);
        setCurrencyName(name);
      }
    } else {
      setCurrencyAmount(currencyAmount * usdPrice);
      setCurrencyName('USDT');
    }
  };
  return (
    <View className="flex w-full p-4 items-center">
      <Pressable onPress={handlePress}>
        <Text className="dark:text-neutral-200">
          {currencyAmount} {currencyName}
        </Text>
      </Pressable>
    </View>
  );
};

export default CurrencySwitch;
