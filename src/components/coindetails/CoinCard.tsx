import {View, Text, Image} from 'react-native';
import React, {useState} from 'react';
import CoinChart from './CoinChart';
import {ISelectedCoin} from '../../interfaces/main';

type propsType = {
  coin: ISelectedCoin;
};
const CoinCard = ({coin}: propsType) => {
  const [logoURI, setlogoURI] = useState(coin.coin.logoURI);
  return (
    <View className="flex-1 h-full items-center">
      <View className="w-[70px] h-[70px] border-2 dark:border-neutral-700 rounded-full justify-center items-center">
        <Image
          source={{uri: `${logoURI}`}}
          className="w-[67px] h-[67px] rounded-full"
          onError={() => {
            setlogoURI(
              'https://gfa.nyc3.digitaloceanspaces.com/testapp/testdir/default.png',
            );
          }}
        />
      </View>
      <Text className="dark:text-neutral-200 border-b-2 dark:border-neutral-700">
        {coin.coin.name}
      </Text>
      <View className="flex-1 w-full mt-4">
        <CoinChart />
      </View>
    </View>
  );
};

export default CoinCard;
