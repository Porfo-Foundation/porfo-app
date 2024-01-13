import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RouterProps} from '../../interfaces/Navigation';
import {ICoin} from '../../interfaces/main';
import {ICoinBalance} from '../../interfaces/main';
import CoinChart from '../Dashboard/CoinDetails/CoinChart';
import {coinGeckoDummyObject} from '../../constants/coinGeckoDummyObject';
import useCoinDetails from '../../hooks/reactQuery/apiHooks/useCoinDetails';
import CoinLogo from '../../components/coindetails/CoinLogo';
import RenderHTML from 'react-native-render-html';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {showAmount} from '../../helpers/showAmount';
import UpArrow from '../../assets/icons/svg/coin-details-up-green.svg';
import DownArrow from '../../assets/icons/svg/coin-details-down-red.svg';
import {colorThemes} from '../../constants/themeData';
import {updateSelectedBalance} from '../../redux/features/mainSlice';
import {updatepopupName, togglePopup} from '../../redux/features/popupSlice';
import BottomBarBack from '../../components/common/BottomBarBack';
import useCoinNews from '../../hooks/reactQuery/apiHooks/useCoinNews';
import useTransactions from '../../hooks/reactQuery/apiHooks/useTransactions';
import NewsCard from '../Dashboard/CoinDetails/NewsCard';
import HistoryCard from '../Dashboard/History/HistoryCard';
import Slider from '@react-native-community/slider';

const {width} = Dimensions.get('screen');

const CoinInfo = ({route, navigation}: RouterProps) => {
  const {selectedTheme} = useAppSelector(state => state.selectedTheme);
  const dispatch = useAppDispatch();
  const coin: ICoin = route?.params?.coin;
  const balance: ICoinBalance = route?.params?.balance;
  const {data: coinNewsTemp} = useCoinNews(coin.symbol!);
  const {data: transactionsData} = useTransactions();
  const transactions = transactionsData?.transactions;
  const coinNews = coinNewsTemp ? coinNewsTemp.news : [];
  const {data: coinDataTemp, isLoading, isError} = useCoinDetails(coin?.coinId);
  const coinData = coinDataTemp ? coinDataTemp : coinGeckoDummyObject;
  const timelines = ['1H', '1D', '1W', '1M', '1Y', 'All'];
  const [selectedTimeline, setSelectedTimeline] = useState(timelines[0]);
  const [showInDetails, setShowInDetails] = useState(false);
  const [sliderData, setSliderData] = useState(70);
  const [showGraph, setShowGraph] = useState(false);
  const [priceTime, setPriceTime] = useState(new Date().toLocaleString());
  const [coinPrice, setCoinPrice] = useState(0);

  const showContent = (content: string) => {
    return {
      html: `
    <div style='color:white; font-size: 14px; text-align: justify;'>
      ${content} 
    </div>`,
    };
  };
  const tabs = ['Updates', 'History', 'PNL'];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [coinTransactions, setCoinTransactions] = useState([]);

  useEffect(() => {
    const filterData = transactions?.filter(transaction => {
      if (transaction?.txnType === 'CROSS-SWAP') {
        if (
          transaction?.fromCoin.id === coin?.id ||
          transaction?.toCoin.id === coin?.id
        ) {
          return transaction;
        }
      } else if (transaction?.txnType === 'SWAPPED') {
        if (
          transaction?.sendCoin?.id === coin?.id ||
          transaction?.recieveCoin.id === coin?.id
        )
          return transaction;
      } else {
        if (transaction?.coin.id === coin?.id) {
          return transaction;
        }
      }
    });
    setCoinTransactions(filterData);
  }, []);

  const handleSend = () => {
    dispatch(updateSelectedBalance(balance));
    // setIsScanOpen(true);
    dispatch(updatepopupName('SendPopup'));
    dispatch(togglePopup());
  };

  const handleSliderChange = value => {
    setSliderData(value);
  };

  const handleShowGraph = () => {
    setShowGraph(!showGraph);
  };
  return (
    <View className="h-screen py-8">
      {showGraph && (
        <View
          className="absolute left-0 right-0 top-auto bottom-10 py-3 h-[50%] bg-[#000000] z-50 border-2 rounded-tl-md rounded-tr-md"
          style={{
            borderTopColor: colorThemes[selectedTheme].textMuted,
          }}>
          <TouchableOpacity onPress={() => setShowGraph(false)}>
            <Text
              className="font-[PlusJakartaSans-semiBold] text-xl self-end mr-6 mb-4"
              style={{color: colorThemes[selectedTheme].textMuted}}>
              X
            </Text>
          </TouchableOpacity>
          <View className="flex-row items-center pb-4">
            <View className="flex-row items-center flex-1 justify-around">
              {timelines?.map((time, idx) => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  key={idx}
                  onPress={() => setSelectedTimeline(time)}>
                  <Text
                    className={`font-[PlusJakartaSans-Bold]`}
                    style={{
                      color:
                        selectedTimeline === time
                          ? colorThemes[selectedTheme]['textSecondary']
                          : colorThemes[selectedTheme]['graphTimelineInactive'],
                    }}
                    key={idx}>
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View className="flex flex-row ml-4">
              <TouchableOpacity
                className="p-3 rounded-full"
                style={{
                  backgroundColor: colorThemes[selectedTheme]['textSecondary'],
                }}>
                <Image
                  source={colorThemes[selectedTheme]['chartIcon']}
                  className="w-3 h-3"
                />
              </TouchableOpacity>
              <TouchableOpacity className="p-3 rounded-full" onPress={() => {}}>
                <Image
                  source={colorThemes[selectedTheme]['donutIcon']}
                  className="w-3 h-3"
                />
              </TouchableOpacity>
            </View>
          </View>
          <CoinChart
            coinId={coinData?.id}
            daysAgo={selectedTimeline}
            setPriceTime={setPriceTime}
            setCoinPrice={setCoinPrice}
          />
        </View>
      )}
      <BottomBarBack
        screenName={'coinInfo'}
        information={{
          data: {xAxisData: priceTime, yAxisData: coinPrice},
          percentage: showAmount(balance?.pnl) + '%',
        }}
        isActive={showGraph}
        action={handleShowGraph}
      />
      <ScrollView className="h-screen w-full px-4">
        <View className="flex-row items-start justify-between">
          <View className="flex-row gap-x-2 items-center pl-2">
            <CoinLogo symbol={coin?.symbol!} size="large" />
            <View>
              <View className="flex-row items-center gap-x-2">
                {balance?.pnl < 0 ? <DownArrow /> : <UpArrow />}
                <Text
                  className={`font-[PlusJakartaSans-semiBold] text-[#58D24E] ${
                    balance?.pnl < 0
                      ? 'text-semantic-error'
                      : 'text-semantic-success'
                  }`}>
                  {showAmount(balance?.pnl)} %
                </Text>
                <Text
                  className={`font-[PlusJakartaSans-Light]`}
                  style={{color: colorThemes[selectedTheme].textMuted}}>
                  (1D Change)
                </Text>
              </View>
              <Text
                className="font-[PlusJakartaSans-semiBold] text-xl"
                style={{color: colorThemes[selectedTheme].textPrimary}}>
                ${showAmount(balance?.value * coin?.usdPrice)}
              </Text>
              <Text
                className="font-[PlusJakartaSans-semiBold] text-xs mt-2"
                style={{color: colorThemes[selectedTheme].textPrimary}}>
                13% of our investors are investing in {coin?.symbol}
              </Text>
            </View>
          </View>
          {colorThemes[selectedTheme].favorite}
        </View>
        {/* <View className="my-3">
          <RenderHTML
            source={showContent(coinData?.description?.en)}
            contentWidth={width}
          />
        </View> */}
        {showInDetails ? (
          <View className="my-2">
            <RenderHTML
              source={showContent(coinData?.description?.en)}
              contentWidth={width}
            />
            <TouchableOpacity
              className="self-end mb-4"
              onPress={() => setShowInDetails(false)}>
              <Text className="text-[#BE406A] text-md">Show Less</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="my-2">
            <RenderHTML
              source={showContent(
                coinData?.description?.en.substring(0, 300) + '......',
              )}
              contentWidth={width}
            />
            <TouchableOpacity
              className="self-end"
              onPress={() => setShowInDetails(true)}>
              <Text className="text-[#BE406A] text-md">Read More</Text>
            </TouchableOpacity>
          </View>
        )}
        <View className="flex-row items-center justify-between">
          <View
            className="flex-row items-center rounded-xl"
            style={{
              backgroundColor: colorThemes[selectedTheme].buttonBackground,
            }}>
            {tabs?.map((tab, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => setSelectedTab(tab)}
                className="py-2 px-4 rounded-xl"
                style={{
                  backgroundColor:
                    selectedTab == tab
                      ? colorThemes[selectedTheme].textSecondary
                      : colorThemes[selectedTheme].buttonBackground,
                }}>
                <Text
                  className="font-[PlusJakartaSans-Bold]"
                  style={{color: colorThemes[selectedTheme].textPrimary}}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View className="flex-row items-center gap-x-2">
            <TouchableOpacity onPress={handleSend}>
              {colorThemes[selectedTheme].sendFilled}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                dispatch(updatepopupName('ReceivePopup'));
                dispatch(togglePopup());
              }}>
              {colorThemes[selectedTheme].receiveFilled}
            </TouchableOpacity>
          </View>
        </View>
        {selectedTab === 'Updates' ? (
          <View className="mt-1 pb-4 mb-[70px]">
            {coinNews?.map((news: any, index: number) => (
              <NewsCard
                key={index}
                coinData={coinData}
                coinNews={news}
                coinId={coin.coinId}
              />
            ))}
          </View>
        ) : selectedTab === 'PNL' ? (
          <View className="w-screen mb-[70px]">
            <View className="flex flex-row justify-between mt-2">
              <View className="flex flex-col">
                <Text
                  style={{color: colorThemes[selectedTheme].textPrimary}}
                  className="opacity-50">
                  Avg. Cost
                </Text>
                <Text
                  style={{color: colorThemes[selectedTheme].textPrimary}}
                  className="mt-2 font-bold text-lg">
                  ${showAmount(balance?.avgPrice)}
                </Text>
              </View>
              <View className="flex flex-col">
                <Text
                  style={{color: colorThemes[selectedTheme].textPrimary}}
                  className="opacity-50">
                  Market Price
                </Text>
                <Text
                  style={{color: colorThemes[selectedTheme].textPrimary}}
                  className="mt-2 font-bold text-lg">
                  ${showAmount(balance?.coin?.usdPrice)}
                </Text>
              </View>
              <View className="flex flex-col">
                <Text
                  style={{color: colorThemes[selectedTheme].textPrimary}}
                  className="opacity-50">
                  Total Invested
                </Text>
                <Text
                  style={{color: colorThemes[selectedTheme].textPrimary}}
                  className="mt-2 font-bold text-lg">
                  ${showAmount(balance?.value * balance?.avgPrice)}
                </Text>
              </View>
            </View>
            <View className="w-full mt-8">
              <Text
                style={{color: colorThemes[selectedTheme].textMuted}}
                className="text-lg mb-2">
                Dollar Cost Average
              </Text>
              <Slider
                style={styles.slider}
                // disabled={true}
                minimumValue={0}
                maximumValue={100}
                value={sliderData}
                onValueChange={handleSliderChange}
                // onSlidingStart={handleSliderStart}
                // style={{width: width}}
                minimumTrackTintColor="#EC2121"
                maximumTrackTintColor="#58D24E"
                thumbTintColor="blue"
                // trackStyle={styles.track}
                // thumbStyle={styles.thumb}
              />
              <View
                style={[
                  styles.valueAboveThumb,
                  {left: width * 0.9 * (sliderData / 100) - 10},
                ]}>
                <Text style={styles.valueText}>${sliderData.toFixed(2)}</Text>
              </View>
              <View className="w-[90%] flex flex-row justify-between -mt-2">
                <Text style={{color: colorThemes[selectedTheme].textPrimary}}>
                  $0.017
                </Text>
                <Text style={{color: colorThemes[selectedTheme].textPrimary}}>
                  $0.078
                </Text>
              </View>
              <View className="w-[90%] flex flex-col items-center mt-4">
                <Text
                  style={{color: colorThemes[selectedTheme].textMuted}}
                  className="text-xs">
                  Amount required to bring Average cost to $0.081 is $6,000
                </Text>
                <Text style={{color: colorThemes[selectedTheme].textTertiary}}>
                  $6,000
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View className="mt-2 mb-[70px] ">
            {coinTransactions?.map((transaction, index: number) => {
              return (
                <View key={index}>
                  <HistoryCard
                    transaction={transaction}
                    navigation={navigation}
                  />
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
      {/* <ScrollView className="px-4">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="font-[PlusJakartaSans-SemiBold] text-xl text-[#FFFFFF]">
              {coin?.name} ({coin?.symbol})
            </Text>
            <View className="flex-row items-end mt-1 gap-x-2">
              <Text className="font-[PlusJakartaSans-SemiBold] text-xs text-[#FFFFFF]">
                {showAmount(balance?.value)} {coin?.symbol}
              </Text>
              <Text className="font-[PlusJakartaSans-SemiBold] text-[10px] text-[#FFFFFF]">
                ${showAmount(balance?.value * coin?.usdPrice)}
              </Text>
              <Text
                className={`font-[PlusJakartaSans-semiBold] text-[10px] text-semantic-success ${
                  balance?.pnl < 0
                    ? 'text-semantic-error'
                    : 'text-semantic-success'
                }`}>
                {showAmount(balance?.pnl)} %
              </Text>
            </View>
          </View>
          <View>
            <CoinLogo logoURI={coin?.logoURI!} />
          </View>
        </View>
        {showInDetails ? (
          <View className="my-2">
            <RenderHTML
              source={showContent(coinData?.description?.en)}
              contentWidth={width}
            />
          </View>
        ) : (
          <View className="my-2">
            <RenderHTML
              source={showContent(
                coinData?.description?.en.substring(0, 300) + '......',
              )}
              contentWidth={width}
            />
            <TouchableOpacity
              className="self-end"
              onPress={() => setShowInDetails(true)}>
              <Text className="text-[#5b5bbe] text-md">Read More</Text>
            </TouchableOpacity>
          </View>
        )}

        <View className="flex-row items-center justify-between my-2">
          <View className="flex-row items-center">
            <TouchableOpacity activeOpacity={0.8}>
              <CoinButton />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} className="-ml-2">
              <PortfolioButton />
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center gap-x-2">
            {timelines?.map((time, idx) => (
              <TouchableOpacity
                activeOpacity={0.8}
                key={idx}
                onPress={() => setSelectedTimeline(time)}>
                <Text
                  className={`font-[PlusJakartaSans-Bold] ${
                    selectedTimeline == time
                      ? 'text-[#EEB155]'
                      : 'text-[#FFFFFF]'
                  }`}
                  key={idx}>
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <CoinChart coinId={coinData?.id} daysAgo={selectedTimeline} />
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate('SendPage');
              }}>
              <Send />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              className="-ml-1"
              onPress={() => {
                dispatch(updatepopupName('Receive'));
                dispatch(togglePopup());
              }}>
              <Receive />
            </TouchableOpacity>
            <TouchableOpacity className="ml-2">
              <AutoBuy />
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center gap-x-2">
            <TouchableOpacity
              onPress={() => {
                dispatch(updateSwapCoin(coin));
                dispatch(updatepopupName('BuyCoin'));
                dispatch(togglePopup());
              }}>
              <Buy />
            </TouchableOpacity>
            <TouchableOpacity>
              <History />
            </TouchableOpacity>
          </View>
        </View>
        <View className="mt-4">
          <Text className="font-[PlusJakartaSans-SemiBold] text-lg text-[#FFFFFF]">
            Latest Updates
          </Text>
          <View className="w-full h-fit px-2">
            <View className="flex flex-row">
              <View className=" h-full w-[3px] bg-[#2D78B4]"></View>
              <View className="flex-row items-center">
                <View className="-ml-[9px]">
                  <Star width={15} height={15} />
                </View>
                <View className="bg-[#2D78B4] p-2 rounded-lg ml-1">
                  <View className="flex-row items-center justify-between">
                    <Text className="font-[PlusJakartaSans-Bold] text-lg text-[#ED8E00]">
                      CoinTelegraphy
                    </Text>
                    <Text className="font-[PlusJakartaSans-SemiBold] text-[#ED8E00]">
                      17 mins ago
                    </Text>
                  </View>
                  <View>
                    <Text className="font-[PlusJakartaSans-SemiBold] text-[#FFFFFF]">
                      How can a simple coin become the solar system of the
                      crypto industry?
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView> */}
    </View>
  );
};

export default CoinInfo;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider: {
    width: width * 0.9,
    height: 50,
  },
  track: {
    height: 5,
    borderRadius: 5,
    backgroundColor: '#58D24E', // Color of the part that has been slid
  },
  thumb: {
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: 'white', // Color of the thumb (sliding button)
  },
  thumbImage: {
    width: 10, // Adjust thumb image width
    height: 10, // Adjust thumb image height
    borderRadius: 5, // Half of width and height to make it circular
  },
  valueAboveThumb: {
    position: 'absolute',
    top: 30, // Adjust the distance of the text above the thumb
    alignSelf: 'center',
  },
  valueText: {
    fontSize: 14,
    color: 'white',
  },
});
