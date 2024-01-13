import React from 'react';
import {Pressable, Text} from 'react-native';
import {ICoin} from '../../interfaces/main';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {
  updateBaseCoin,
  updateStableCoin,
  updatePreviousIndex,
} from '../../redux/features/coinSlice';

type selectedCoinType = Omit<ICoin, 'isSelected'> & {
  isSelected: boolean;
};

type newCoinType = {
  coinType: string;
};
const CoinDisplay = ({coinType}: newCoinType) => {
  const {baseCoin, stableCoin} = useAppSelector(state => state.coin);
  return (
    <Text className="dark:text-neutral-200 font-bold">
      Selected Coin:{' '}
      {coinType === 'baseCoin' ? baseCoin.symbol : stableCoin.symbol}
    </Text>
  );
};

export default CoinDisplay;
