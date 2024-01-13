import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {ICoin} from '../../interfaces/main';

type newCoinType = {
  coin: ICoin;
  handleSelect: () => void;
  isSelected: boolean;
};
const CoinComponent = ({coin, handleSelect, isSelected}: newCoinType) => {
  return (
    <Pressable onPress={handleSelect}>
      <View
        className={`h-10 w-full mt-2 rounded-md justify-center px-2 ${
          isSelected ? 'bg-semantic-success' : 'bg-typography-secondary'
        }`}>
        <Text className="dark:text-neutral-200">{coin.symbol}</Text>
      </View>
    </Pressable>
  );
};

export default CoinComponent;
