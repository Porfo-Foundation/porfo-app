import React from 'react';
import {Text, View} from 'react-native';

const CoinPnl = ({pnlPercentage}: {pnlPercentage: number | undefined}) => {
  if (pnlPercentage === 0 || !pnlPercentage) {
    return (
      <View className={'flex-row p-1  items-end'}>
        <Text
          className={
            'font-[PlusJakartaSans-SemiBold] text-sm text-[#FFFFFF] opacity-50'
          }>
          --- %
        </Text>
      </View>
    );
  }
  return (
    <View className={'flex-row p-1  items-end'}>
      <Text
        className={`font-[PlusJakartaSans-SemiBold] text-sm  ${
          pnlPercentage < 0 ? 'text-semantic-error' : 'text-semantic-success'
        } `}>
        {pnlPercentage?.toFixed(2)} %
      </Text>
    </View>
  );
};

export default CoinPnl;
