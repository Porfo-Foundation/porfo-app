import {View, Text, Image, Linking, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import Timeline from '../../../assets/icons/svg/timeline.svg';
import {ICoinNews} from '../../../interfaces/coinNews';
import {useAppSelector} from '../../../redux/hooks';
import {getTimeInAgo} from '../../../utils/getTimeInAgo';
import useCoinList from '../../../hooks/reactQuery/apiHooks/useCoinList';
import CoinLogo from '../../../components/coindetails/CoinLogo';

type coinType = {
  coinData: any;
  coinNews: ICoinNews;
  coinId: string | undefined;
};
const NewsCard = ({coinData, coinNews, coinId}: coinType) => {
  const [coinLogo, setCoinLogo] = useState(
    'https://gfa.nyc3.digitaloceanspaces.com/testapp/testdir/default.png',
  );
  // const {data: coinList} = useCoinList();

  // useEffect(() => {
  //   coinList?.map(coin => {
  //     if (coin.coinId === coinId) {
  //       setCoinLogo(coin.logoURI);
  //     }
  //   });
  // }, [coinData, coinNews]);

  const openURL = (url: any) => {
    Linking.openURL(url)
      .then(data => {
        console.log('URL opened successfully', data);
      })
      .catch(err => {
        console.error('Error opening URL:', err);
      });
  };

  return (
    <View className="w-full h-fit border-b-2 border-[#2A2A2A] p-4 mt-5 mr-4">
      <TouchableOpacity onPress={() => openURL(coinNews.link)}>
        <View className="flex-row mt-2 gap-x-3">
          <View>
            <View className="flex flex-row justify-between">
              <Text className="font-[PlusJakartaSans-SemiBold] text-xs text-[#FFFFFF] opacity-50">
                {getTimeInAgo(coinNews.pubDate)}
              </Text>
              <Text className="font-[PlusJakartaSans-Bold] text-xs text-[#FFFFFF]">
                {coinNews.creator}
              </Text>
            </View>
            <View className="flex-row items-center">
              <View className="w-full overflow-hidden">
                <Text className="font-[PlusJakartaSans-SemiBold] text-sm text-[#FFFFFF] leading-5 mt-2">
                  <Text className='text-xl'>{coinNews.title.substring(0, 1)}</Text>{coinNews.title.substring(1, 200)}...
                </Text>
              </View>
            </View>
          </View>
        </View>
        <Text className="text-[#BE406A] self-end">Read More</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewsCard;
