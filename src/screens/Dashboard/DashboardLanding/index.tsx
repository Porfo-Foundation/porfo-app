import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
  Animated,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {ScrollView} from 'react-native';
import PortfolioSection from './PortfolioSection';
import Logo from '../../../assets/icons/svg/logo.svg';

import ConnectWallet from '../../../assets/icons/svg/connect-wallet.svg';
import ConnectExchange from '../../../assets/icons/svg/connect-exchange.svg';
import CreatePortfolio from '../../../assets/icons/svg/create-portfolio.svg';
import AddAddress from '../../../assets/icons/svg/add-address.svg';
import InactivePortfolioCard from './InactivePortfolioCard';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {updateSelectedPortfolio} from '../../../redux/features/mainSlice';
import DashboardLayout from '../DashboardLayout';
import {togglePopup, updatepopupName} from '../../../redux/features/popupSlice';
import CoinPnl from '../../../components/coindetails/CoinPnl';
import useBalances from '../../../hooks/reactQuery/apiHooks/useBalances';
import usePortfoliosAndEOAs from '../../../hooks/reactQuery/apiHooks/usePortfoliosAndEOAs';
import usePortfolioAndEOAaBalances from '../../../hooks/reactQuery/apiHooks/usePortfolioAndEOAaBalances';
import PortfolioBack from './PortfolioBack';

const DashboardLanding = ({navigation}: any) => {
  const [horizontal, setHorizontal] = useState(false);
  const CorouselRef = React.useRef<ICarouselInstance>(null);
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const dispatch = useAppDispatch();
  const {data: balanceData} = useBalances();
  const {portfolioAndEoas} = usePortfoliosAndEOAs();
  const {selectedPortfolio} = useAppSelector(state => state.main);

  useEffect(() => {
    if (CorouselRef.current) {
      dispatch(
        updateSelectedPortfolio(
          portfolioAndEoas[CorouselRef.current.getCurrentIndex()],
        ),
      );
    }
  }, [portfolioAndEoas, dispatch, navigation]);

  const portfolioBalanceData = usePortfolioAndEOAaBalances(
    selectedPortfolio,
    balanceData?.balances,
  );

  const scrollX = useRef(new Animated.Value(0)).current;
  const [contentVisible, setContentVisible] = useState(false);
  const [portfolioIndex, setPortfolioIndex] = useState(0);

  return (
    <DashboardLayout
      component={
        <PortfolioBack
          portfolioBalanceData={portfolioBalanceData}
          navigation={navigation}
        />
      }
      openContent={contentVisible}
      onCloseContent={() => setContentVisible(false)}>
      <View style={{height: height - 40}}>
        <ScrollView>
          <SafeAreaView className="flex bg-[#171A3B]">
            <View className="flex-row absolute right-4 top-2 gap-x-1.5">
              {Array(
                portfolioAndEoas?.length > 4 ? 4 : portfolioAndEoas?.length,
              )
                .fill(' ')
                .map((_, idx) => (
                  <Image
                    key={idx}
                    source={
                      portfolioIndex === idx
                        ? require('../../../assets/images/ellipse-filled.png')
                        : require('../../../assets/images/ellipse.png')
                    }
                  />
                ))}
            </View>
            <GestureHandlerRootView className="flex w-full h-full">
              <Carousel
                ref={CorouselRef}
                // style={{height: height / 2.45}}
                style={{height: 300}}
                defaultIndex={0}
                loop={false}
                enabled={true}
                width={width}
                height={height / 1.3}
                onSnapToItem={index => {
                  setPortfolioIndex(index);
                  Animated.event(
                    [{nativeEvent: {contentOffset: {x: scrollX}}}],
                    {useNativeDriver: false},
                  );
                  dispatch(updateSelectedPortfolio(portfolioAndEoas[index]));
                }}
                autoFillData={false}
                pagingEnabled={true}
                snapEnabled={true}
                mode="parallax"
                windowSize={2}
                modeConfig={{
                  parallaxScrollingScale: 1.0,
                  parallaxScrollingOffset: 170,
                  parallaxAdjacentItemScale: 0,
                }}
                data={portfolioAndEoas}
                renderItem={({item, index}) => (
                  <View
                    key={index}
                    className="flex-1 items-center w-screen p-10 pt-0">
                    <View>
                      {item.name === '' ? (
                        <View style={{width: width}} className="px-6">
                          <View className="flex-row justify-between items-center">
                            <Text className="font-[PlusJakartaSans-semiBold] text-base text-[#FFFFFF]">
                              Add new
                            </Text>
                            <View className="flex flex-row gap-x-1" />
                          </View>
                          <View className="flex-row gap-x-4 mt-3">
                            <TouchableOpacity
                              onPress={() => {
                                dispatch(updatepopupName('ExternalWallet'));
                                dispatch(togglePopup());
                              }}
                              activeOpacity={0.8}
                              disabled
                              className="bg-[#4845F8] rounded-lg px-2 py-4 opacity-30"
                              style={{width: width / 2 - 32}}>
                              <ConnectWallet />
                              <Text className="font-[PlusJakartaSans-SemiBold] mt-2 text-base text-[#FFFFFF]">
                                Connect External Wallet
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              activeOpacity={0.8}
                              className="bg-[#4845F8] rounded-lg px-2 py-4"
                              style={{width: width / 2 - 32}}
                              onPress={() => {
                                if (item.name === '') {
                                  return navigation.navigate('AddPortfolio');
                                }
                              }}>
                              <CreatePortfolio />
                              <Text className="font-[PlusJakartaSans-SemiBold] mt-2 text-base text-[#FFFFFF]">
                                Create new Portfolio
                              </Text>
                            </TouchableOpacity>
                          </View>
                          <View className="flex-row gap-x-4 mt-4">
                            <TouchableOpacity
                              disabled
                              activeOpacity={0.8}
                              className="bg-[#4845F8] rounded-lg px-2 py-4 opacity-30"
                              onPress={() => {
                                dispatch(updatepopupName('WatchAddress'));
                                dispatch(togglePopup());
                              }}
                              style={{width: width / 2 - 32}}>
                              <AddAddress />
                              <Text className="font-[PlusJakartaSans-SemiBold] mt-2 text-base text-[#FFFFFF]">
                                Add a Address to watch
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              activeOpacity={0.3}
                              className="bg-[#4845F8] rounded-lg px-2 py-4 opacity-30"
                              style={{width: width / 2 - 32}}>
                              <ConnectExchange />
                              <Text className="font-[PlusJakartaSans-SemiBold] mt-2 text-base text-[#FFFFFF]">
                                Connect an Exchange
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      ) : (
                        <View className="h-[25%]">
                          <View className="px-4 flex justify-between flex-row">
                            <Pressable
                              onPress={() => navigation.navigate('SocialPage')}>
                              {item.isWatchable ? (
                                <Text className="font-[PlusJakartaSans-SemiBold] text-base text-[#FFFFFF]">
                                  {item.name.substring(0, 8)}....
                                  {item.name.substring(item.name.length - 8)}
                                </Text>
                              ) : (
                                <Text className="font-[PlusJakartaSans-SemiBold] text-base text-[#FFFFFF]">
                                  {item.name}
                                </Text>
                              )}

                              <Text className="font-[PlusJakartaSans-SemiBold] text-xl text-[#29B8F4]">
                                $
                                {portfolioBalanceData?.totalCurrentBalanceInUSD?.toFixed(
                                  4,
                                )}
                              </Text>
                              <CoinPnl
                                pnlPercentage={portfolioBalanceData?.totalPnl}
                              />
                            </Pressable>
                            <View className="flex flex-row gap-x-1"></View>
                          </View>
                          <PortfolioSection
                            coinAssets={portfolioBalanceData?.balances}
                            totalBalance={
                              portfolioBalanceData?.totalCurrentBalanceInUSD
                            }
                          />
                        </View>
                      )}
                    </View>
                  </View>
                )}
              />
              {selectedPortfolio?.name !== '' ? (
                <View className="flex flex-row items-center justify-between my-3 px-4">
                  {selectedPortfolio?.isWatchable ? (
                    <TouchableOpacity className="w-fit flex flex-row bg-[#7139F6] rounded-3xl justify-center items-center px-2 py-1 opacity-30">
                      <Text className="text-neutral-100 ml-1">
                        Watching Address
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity className="w-fit flex flex-row bg-[#7139F6] rounded-3xl justify-center items-center px-2 py-1 opacity-30">
                      <Image
                        source={require('../../../assets/images/history.png')}
                        className="h-5 w-5"
                      />
                      <Text className="text-neutral-100 ml-1">
                        Set Up Auto-Buy
                      </Text>
                    </TouchableOpacity>
                  )}
                  <View className="flex-row items-center">
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => setHorizontal(!horizontal)}>
                      {horizontal ? (
                        <Image
                          source={require('../../../assets/images/grid.png')}
                        />
                      ) : (
                        <View className="bg-[#17223b] p-2 rounded-full">
                          <Image
                            source={require('../../../assets/images/list.png')}
                          />
                        </View>
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                // eslint-disable-next-line react-native/no-inline-styles
                <View style={{height: 65}} />
              )}
              {selectedPortfolio?.name &&
                (!horizontal ? (
                  <View className="px-4">
                    <ScrollView
                      horizontal
                      className="flex flex-row"
                      showsHorizontalScrollIndicator={false}>
                      {portfolioBalanceData?.balances?.map((balance, index) => {
                        return (
                          <InactivePortfolioCard
                            balance={balance}
                            key={index}
                            horizontal={horizontal}
                          />
                        );
                      })}
                    </ScrollView>
                  </View>
                ) : (
                  <>
                    <ScrollView className="flex" style={{height: height - 480}}>
                      {portfolioBalanceData?.balances?.map((balance, index) => {
                        return (
                          <InactivePortfolioCard
                            balance={balance}
                            key={index}
                            horizontal={horizontal}
                          />
                        );
                      })}
                    </ScrollView>
                  </>
                ))}
            </GestureHandlerRootView>
          </SafeAreaView>
        </ScrollView>
        <View className="flex flex-row justify-between items-center pl-4 pr-2">
          <TouchableOpacity
            onPress={() => navigation.navigate('AssetDashboard')}>
            <Logo />
          </TouchableOpacity>
          {/* <TouchableOpacity
            className="bg-[#7139F6] flex flex-row items-center pl-4 rounded-full relative p-2 mt-1"
            onPress={() => navigation.navigate('Chatbot')}>
            <Text className="font-[PlusJakartaSans-semiBold] text-sm text-[#FFFFFF] h-8 pr-16 pl-2 mt-1">
              Ask Porfo
            </Text>
            <View className="bg-[#453DE0] rounded-full p-2 border-8 border-[#171A3B] absolute right-0 -top-2">
              <Image
                source={require('../../../assets/images/chat.png')}
                className="w-4 h-4 m-2"
              />
            </View>
          </TouchableOpacity> */}
          <TouchableOpacity
            className="flex flex-row items-center -mr-2 rounded-full mt-1"
            onPress={() => navigation.navigate('Chatbot')}>
            <Image
              source={require('../../../assets/images/ask_porfo.png')}
              className="h-10 w-32"
            />
          </TouchableOpacity>
        </View>
      </View>
    </DashboardLayout>
  );
};

export default DashboardLanding;
