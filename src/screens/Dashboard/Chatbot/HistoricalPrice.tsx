import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useRef} from 'react';
import CoinLogo from '../../../components/coindetails/CoinLogo';
import {convertAndShareImage} from '../../../utils/shareData';
import useCoinList from '../../../hooks/reactQuery/apiHooks/useCoinList';

const HistoricalPrice = ({data}: any) => {
  const viewRef = useRef<any>();
  const {data: coinList} = useCoinList();
  if (data.error) {
    return <Text className="text-neutral-100">{data.error}</Text>;
  }

  const coinData = coinList?.find(coin => coin.coinId === data.coinId);

  const formatTimestamp = (timestamp: number) => {
    if (timestamp) {
      const date = new Date(timestamp);
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];

      const day = date.getDate();
      const month = months[date.getMonth()];
      const year = date.getFullYear();

      return `${day} ${month} ${year}`;
    }
  };
  return (
    // <Text className="text-neutral-100">Historical Price...</Text>
    <View
      className="w-[250px] w-max-[70vw] flex flex-col justify-between items-start m-2"
      ref={viewRef}>
      <View className="w-full flex flex-row justify-between items-center">
        <View className="flex flex-row justify-between items-center w-[90%]">
          <CoinLogo
            symbol={
              coinData?.symbol ||
              'https://gfa.nyc3.digitaloceanspaces.com/testapp/testdir/default.png'
            }
          />
          <Text className="text-neutral-100 ml-2 break-words">
            {coinData?.name} ({coinData?.symbol.toUpperCase()})
          </Text>
        </View>
        <View className="w-fit h-full flex flex-row items-center self-end">
          <TouchableOpacity onPress={() => convertAndShareImage(viewRef)}>
            <Image
              source={require('../../../assets/images/share-new.png')}
              className="w-6 h-6"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View className="w-full flex flex-row justify-between items-center">
        <Text className="text-neutral-100">
          {formatTimestamp(data?.prices[0][0])} the Price was around
        </Text>
      </View>
      <View className="w-full flex flex-row justify-between items-center">
        <Text className="text-neutral-100 text-lg font-bold">
          ${data.prices[0][1].toLocaleString()}
        </Text>
      </View>
      <View className="p-2 border-2 border-neutral-100 rounded-3xl self-start">
        <Text className="text-neutral-100 text-xs">TIME MACHINE</Text>
      </View>
    </View>
  );
};

export default HistoricalPrice;
