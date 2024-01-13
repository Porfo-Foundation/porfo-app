import {
  View,
  Text,
  Pressable,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import DashboardLayout from '../DashboardLayout';
import BackButton from '../../../assets/icons/svg/back-purple.svg';
import Logo from '../../../assets/icons/svg/logo.svg';
import CoinCard from './CoinCard';
import TradeRecommendationCard from './TradeRecommendationCard';
import TradeChart from './TradeChart';
import AboutCoin from './AboutCoin';
import PriceStatisticsCard from './PriceStatisticsCard';
import NewsCard from './NewsCard';
import AboutCoinDetailed from './AboutCoinDetailed';
import PriceStatisticsDetailed from './PriceStatisticsDetailed';
import {RouterProps} from '../../../interfaces/Navigation';
import {getCoinDetails} from '../../../apiCalls/coin';
import {getCoinNews} from '../../../apiCalls/coin';
import {toggleLoader} from '../../../redux/features/popupSlice';
import {useAppDispatch} from '../../../redux/hooks';
import {ICoin} from '../../../interfaces/main';
import {ICoinNews} from '../../../interfaces/coinNews';
import {coinGeckoDummyObject} from '../../../constants/coinGeckoDummyObject';
import useCoinDetails from '../../../hooks/reactQuery/apiHooks/useCoinDetails';
import useCoinNews from '../../../hooks/reactQuery/apiHooks/useCoinNews';

const {height} = Dimensions.get('screen');

const CoinDetails = ({route, navigation}: RouterProps) => {
  const dispatch = useAppDispatch();
  const coin: ICoin = route?.params?.coin;
  const {data: coinDataTemp, isLoading, isError} = useCoinDetails(coin?.coinId);
  const coinData = coinDataTemp ? coinDataTemp : coinGeckoDummyObject;
  const {data: coinNewsTemp} = useCoinNews(coin.symbol!);
  const coinNews = coinNewsTemp ? coinNewsTemp.news : [];
  const [contentVisible, setContentVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState<'about' | 'statistics'>(
    'about',
  );
  // const [coinData, setCoinData] = useState(coinGeckoDummyObject);
  // const [coinNews, setCoinNews] = useState<ICoinNews[]>([]);
  // if (isLoading || isError) {
  //   return (
  //     <View className="absolute top-[50%] left-[50%]">
  //       <ActivityIndicator size="large" color="#F9AA4B" />
  //     </View>
  //   );
  // }
  const [showCoinDetails, setShowCoinDetails] = useState(true);
  const topComponent = {
    about: <AboutCoinDetailed coinDetails={coinData} coinId={coin.coinId} />,
    statistics: <PriceStatisticsDetailed coinDetails={coinData} />,
  };

  // useEffect(() => {
  //   const getCoinData = async () => {
  //     try {
  //       dispatch(toggleLoader());
  //       const data = await getCoinDetails(coin.coinId!);
  //       const coinNewsData = await getCoinNews(coin.symbol!);
  //       setCoinData(data);
  //       setCoinNews(coinNewsData.news);
  //       setShowCoinDetails(true);
  //     } catch (error) {
  //       console.log('inside coinDetails...', error);
  //     } finally {
  //       dispatch(toggleLoader());
  //     }
  //   };
  //   getCoinData();
  // }, [dispatch, coin]);

  const formatDate = timestamp => {
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    return new Intl.DateTimeFormat('en-US', options).format(
      new Date(timestamp),
    );
  };

  if (isLoading || isError) {
    return (
      <View className="absolute top-[50%] left-[50%]">
        <ActivityIndicator size="large" color="#F9AA4B" />
      </View>
    );
  }
  return (
    <DashboardLayout
      component={topComponent[selectedCard]}
      openContent={contentVisible}
      onCloseContent={() => setContentVisible(false)}>
      <View style={{height: height - 130}}>
        <ScrollView className="px-4">
          <View className="flex-row justify-between items-center">
            <View className="flex-row gap-x-2 items-center">
              <Pressable
                onPress={() => {
                  navigation.goBack();
                }}>
                <BackButton />
              </Pressable>
            </View>
            <Logo />
          </View>
          <View className="pb-8">
            <Text
              className={`text-lg text-[#FFFFFF]`}>
              {formatDate(Date.now())}
            </Text>
            {showCoinDetails && (
              <CoinCard coinDetails={coinData} coinId={coin?.coinId} />
            )}
            <TradeRecommendationCard />
            {showCoinDetails && <TradeChart coinDetails={coinData} />}
            {showCoinDetails && (
              <AboutCoin
                coinDetails={coinData}
                coinId={coin.coinId}
                onPress={() => {
                  setSelectedCard('about');
                  setContentVisible(true);
                }}
              />
            )}
            {showCoinDetails && (
              <PriceStatisticsCard
                coinDetails={coinData}
                onPress={() => {
                  setSelectedCard('statistics');
                  setContentVisible(true);
                }}
              />
            )}
            <ScrollView horizontal>
              {coinNews?.map((news: any, index: number) => (
                <NewsCard
                  key={index}
                  coinData={coinData}
                  coinNews={news}
                  coinId={coin.coinId}
                />
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </DashboardLayout>
  );
};

export default CoinDetails;
