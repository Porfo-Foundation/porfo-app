import {View, Text, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import CurrencySwitch from './CurrencySwitch';
import {ICoinBalance} from '../../interfaces/main';
import {ICoin} from '../../interfaces/main';
import {ISelectedCoin} from '../../interfaces/main';

type propsType = {
  name: string;
  porfolioCoins: ISelectedCoin[] | undefined;
  baseCoin: ICoin;
  coinBalance: ICoinBalance[];
};
const PortfolioCard = ({
  name,
  porfolioCoins,
  baseCoin,
  coinBalance,
}: propsType) => {
  const [portfolioBalance, setPortfolioBalance] = useState<number>(0);
  useEffect(() => {
    let totalBalance: number = 0;
    porfolioCoins?.map((coin: ISelectedCoin) => {
      coinBalance.map((obj: ICoinBalance) => {
        if (obj.symbol === coin.coin.symbol) {
          totalBalance += obj.value * coin.coin.usdPrice;
        }
      });
    });
    setPortfolioBalance(totalBalance);
  }, [porfolioCoins, baseCoin, coinBalance]);
  return (
    <View className="flex-1 w-screen p-4 ">
      <View className="h-2/3 border-2 bg-semantic-info dark:border-neutral-700 p-1 flex justify-between items-center rounded-md">
        <Text className="dark:text-neutral-700">{name}</Text>
        <CurrencySwitch
          amount={portfolioBalance}
          name={baseCoin.symbol}
          usdPrice={baseCoin.usdPrice}
        />
        <Text className="dark:text-neutral-700">+{90}%</Text>
        <Pressable className="w-1/2 h-[30px] rounded-md bg-typography-secondary dark:text-neutral-700 justify-center items-center">
          <Text className="dark:text-neutral-200">Buy</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default PortfolioCard;
