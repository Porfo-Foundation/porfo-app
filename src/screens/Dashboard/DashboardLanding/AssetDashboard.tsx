import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  Keyboard,
  TextInput,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import React, {useState, useEffect, useRef} from 'react';
import {ScrollView} from 'react-native';
import {ScrollView as GestureScrollView} from 'react-native-gesture-handler';
import DashboardSection from './DashboardSection';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {togglePopup, updatepopupName} from '../../../redux/features/popupSlice';
import CoinPnl from '../../../components/coindetails/CoinPnl';
import useBalances from '../../../hooks/reactQuery/apiHooks/useBalances';
import useTransactions from '../../../hooks/reactQuery/apiHooks/useTransactions';
import usePortfoliosAndEOAs from '../../../hooks/reactQuery/apiHooks/usePortfoliosAndEOAs';
import {useRefreshOnFocus} from '../../../hooks/reactQuery/useRefreshonFocus';
import Notification from '../../../components/notifications';
import AssetsCard from './AssetsCard';
import {ICoinBalance} from '../../../interfaces/main';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import Loader from '../../../components/common/Loader';
import {colorThemes} from '../../../constants/themeData';
import InvestedAssets from './InvestedAssets';
import NftDetails from '../Nft';
import CustomDropdown from '../../../components/common/CustomDropdown';

const AssetDashboard = ({navigation}: any) => {
  const insets = useSafeAreaInsets();
  const scrollRef = useRef(null);
  const [isPressActive, setIsPressActive] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const dispatch = useAppDispatch();
  const [isAscendingOrder, setIsAscendingOrder] = useState(false);
  const height = Dimensions.get('window').height;
  const width = Dimensions.get('window').width;
  const [selectedTab, setSelectedTab] = useState('assets');
  const [balanceDataArr, setBalanceDataArr] = useState<
    ICoinBalance[] | [] | undefined
  >([]);
  const [searchCoin, setSearchCoin] = useState('');
  const [showInvestedAssets, setShowInvestedAssets] = useState(false);
  const [selectedChain, setSelectedChain] = useState<any>({
    chainId: '',
    symbol: 'ALL CHAINS',
    image: '',
  });
  const [searchChain, setSearchChain] = useState('');
  const [selectMenu, setSelectMenu] = useState(false);
  const chains = [
    {
      chainId: '1',
      symbol: 'ETH',
      image: require('../../../assets/images/ETH.png'),
    },
    {
      chainId: '5',
      symbol: 'ETH',
      image: require('../../../assets/images/ETH.png'),
    },
    {
      chainId: '56',
      symbol: 'BSC',
      image: require('../../../assets/images/BSC.png'),
    },
    {
      chainId: '97',
      symbol: 'BSC',
      image: require('../../../assets/images/BSC.png'),
    },
    {
      chainId: '137',
      symbol: 'MATIC',
      image: require('../../../assets/images/MATIC.png'),
    },
    {
      chainId: '80001',
      symbol: 'MATIC',
      image: require('../../../assets/images/MATIC.png'),
    },
  ];
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  const {
    data: balanceData,
    isLoading,
    isError,
    refetch: refetchBalances,
  } = useBalances();
  useRefreshOnFocus(refetchBalances);
  const {data: transactionsData, refetch: refetchTrxns} = useTransactions();
  useRefreshOnFocus(refetchTrxns);
  const {portfolios} = usePortfoliosAndEOAs();

  const onSwap = () => {
    // if (balanceDataArr.length < 2) {
    //  ToastShowShort(
    //     'Assets is less than 2 swap not possible'
    //   );
    //   return;
    // }
    // dispatch(updateSwapCoin(balanceDataArr[1]?.coin));
    dispatch(updatepopupName('SwapCoins'));
    dispatch(togglePopup());
  };
  const onChat = () => {
    navigation.navigate('Chatbot');
  };
  useEffect(() => {
    setBalanceDataArr(balanceData?.balances);
    setIsAscendingOrder(false);
  }, [balanceData]);

  const DRAG_THRESHOLD = width * 0.15;
  const position = useSharedValue(0);
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = position.value;
      runOnJS(setIsPressActive)(true);
    },
    onActive: (e, ctx) => {
      position.value = ctx.startX + e.translationX;
    },
    onEnd: (e, ctx) => {
      const openSwap = position.value < -1 * DRAG_THRESHOLD;
      const openChat = position.value > DRAG_THRESHOLD;
      if (openSwap) {
        runOnJS(onSwap)();
      }
      if (openChat) {
        runOnJS(onChat)();
      }
      position.value = withTiming(0);
      runOnJS(setIsPressActive)(false);
    },
  });
  const logoPosition = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: position.value,
      },
    ],
  }));

  const vibrateLogo = useSharedValue(0);

  const vibrateLogoStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: vibrateLogo.value}],
    };
  });

  useEffect(() => {
    if (!isPressActive) {
      const interval = setInterval(() => {
        vibrateLogo.value = withTiming(5, {duration: 100}, () => {
          vibrateLogo.value = withTiming(-5, {duration: 100}, () => {
            vibrateLogo.value = withTiming(0);
          });
        });
      }, 5000);

      return () => clearInterval(interval);
    }
  }, []);

  const {selectedTheme} = useAppSelector(state => state.selectedTheme);

  // console.log(selectedTheme, 'selectedTheme');

  const tabs = [
    {
      value: 'assets',
      label: 'Tokens',
    },
    {
      value: 'nft',
      label: 'NFTs',
    },
    {
      value: 'rwa',
      label: 'RWA',
    },
  ];

  const selectedTabStyle = {
    fontFamily: 'PlusJakartaSans-semiBold',
    fontSize: 19,
    borderBottomWidth: 2,
    borderBottomColor: colorThemes[selectedTheme]['textPrimary'],
    color: colorThemes[selectedTheme]['textPrimary'],
  };
  const mutedTabStyle = {
    fontFamily: 'PlusJakartaSans-Light',
    fontSize: 16,
    color: colorThemes[selectedTheme]['textMuted'],
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = [
    {
      name: 'Scan',
      image: colorThemes[selectedTheme].scanButton,
      // onPress: () => setIsScanOpen(true),
      onPress: () => {
        dispatch(updatepopupName('SendPopup'));
        dispatch(togglePopup());
      },
    },
    {
      name: 'Buy',
      image: colorThemes[selectedTheme].buyButton,
      onPress: () => {
        dispatch(updatepopupName('BuyPopup'));
        dispatch(togglePopup());
      },
    },
    {
      name: 'Receive',
      image: colorThemes[selectedTheme].receiveButton,
      onPress: () => {
        dispatch(updatepopupName('ReceivePopup'));
        dispatch(togglePopup());
      },
    },
    {
      name: 'Send',
      image: colorThemes[selectedTheme].sendButton,
      onPress: () => {
        dispatch(updatepopupName('SendPopup'));
        dispatch(togglePopup());
      },
    },
    {
      name: 'Ask Porfo',
      image: colorThemes[selectedTheme].askPorfoButton,
      onPress: () => {
        navigation.navigate('Chatbot');
      },
    },
  ];

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const refInput = React.useRef(null);

  if (isLoading || isError) {
    return <Loader />;
  }
  const {balances, totalPnl, totalCurrentBalanceInUSD} = balanceData;
  return (
    <>
      <Notification />
      <GestureHandlerRootView className="flex-1">
        <View
          className="border-t rounded-t-lg h-16 w-full absolute bottom-0 pb-2 left-0 z-[100] flex-row items-center justify-between px-4"
          style={{
            borderTopColor: colorThemes[selectedTheme].buttonBackground,
            backgroundColor: colorThemes[selectedTheme].background,
          }}>
          <View className="flex-row items-center gap-x-2 p-2">
            <Image
              source={require('../../../assets/icons/svg/theme-selector-button.png')}
              className="w-[26px] h-7"
            />
            <View>
              <Text
                className="font-bold font-[PlusJakartaSans-SemiBold]"
                style={{
                  color: colorThemes[selectedTheme]['textSecondary'],
                }}>
                Fuel Meter
              </Text>
              <Text
                className="font-bold font-[PlusJakartaSans-SemiBold]"
                style={{
                  color: colorThemes[selectedTheme]['textPrimary'],
                }}>
                0.465 PFT
              </Text>
            </View>
          </View>
          <View className="z-[101] absolute bottom-4 right-2">
            <CustomDropdown
              TitleComponent={
                <Image
                  className="w-20 h-20"
                  source={
                    isMenuOpen
                      ? colorThemes[selectedTheme].bottomBarDownArrow
                      : require('../../../assets/icons/svg/new-logo-button.png')
                  }
                />
              }
              HeadingComponent={
                <View
                  className="rounded-xl pb-0"
                  style={{width: '95%', backgroundColor: '#000000'}}>
                  {menuItems.map((item, idx) => (
                    <TouchableOpacity
                      key={idx}
                      onPress={() => {
                        item.onPress();
                        setSelectMenu(!selectMenu);
                      }}
                      className="flex-row items-center w-[170px] mb-2">
                      <Text
                        className="font-[PlusJakartaSans-Light] text-md w-20"
                        style={{color: colorThemes[selectedTheme].textPrimary}}>
                        {item.name}
                      </Text>
                      <Image source={item.image} className="w-10 h-10" />
                    </TouchableOpacity>
                  ))}
                </View>
              }
              selectedItem={selectMenu}
            />
          </View>
          {/* <TouchableOpacity
            className="z-[101] absolute -bottom-0 right-2"
            onPress={() => {
              setIsMenuOpen(!isMenuOpen);
            }}>
            <Image
              className="w-24 h-24"
              source={
                isMenuOpen
                  ? colorThemes[selectedTheme].bottomBarDownArrow
                  : require('../../../assets/icons/svg/new-logo-button.png')
              }
              // source={require('../../../assets/icons/svg/new-logo-button.png')}
            />
          </TouchableOpacity> */}
        </View>
        <ScrollView className="py-4" style={{paddingTop: insets.top}}>
          <View className="px-4 flex-row justify-between items-center">
            <View>
              <View className="flex-row items-center gap-x-2">
                <Text
                  className="font-[PlusJakartaSans-Light] text-lg"
                  style={{color: colorThemes[selectedTheme]['textPrimary']}}>
                  Main Wallet
                </Text>
                {colorThemes[selectedTheme]['chevronDown']}
              </View>
              <View className="flex-row items-end gap-x-2">
                <Text
                  className="font-[PlusJakartaSans-semiBold] text-2xl"
                  style={{color: colorThemes[selectedTheme]['textPrimary']}}>
                  ${totalCurrentBalanceInUSD?.toFixed(2)}
                </Text>
                <CoinPnl pnlPercentage={totalPnl} />
              </View>
            </View>
            <View className="flex-row items-center justify-between gap-x-4">
              <TouchableOpacity onPress={() => navigation.navigate('History')}>
                {colorThemes[selectedTheme]['historyIcon']}
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Image
                  className="w-8 h-8"
                  source={require('../../../assets/images/profile-placeholder.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
          {!isSearchOpen && !showInvestedAssets && (
            <DashboardSection
              coinAssets={balances}
              totalBalance={totalCurrentBalanceInUSD}
            />
          )}
          <View className="flex-row items-center justify-between mx-4 mt-4">
            <View className="flex-row items-center">
              {tabs?.map((tab, idx) => (
                <TouchableOpacity
                  key={idx}
                  onPress={() => setSelectedTab(tab.value)}
                  className="w-[72px] flex-row justify-center">
                  <Text
                    className="pb-2 text-center"
                    style={[
                      selectedTab == tab.value
                        ? selectedTabStyle
                        : mutedTabStyle,
                    ]}>
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View className="flex-row items-center gap-x-1">
              <TouchableOpacity
                className="rounded-full w-10 h-10 justify-center items-center"
                onPress={() => setShowInvestedAssets(!showInvestedAssets)}
                style={{
                  backgroundColor: showInvestedAssets
                    ? colorThemes[selectedTheme].textSecondary
                    : colorThemes[selectedTheme]['buttonBackground'],
                }}>
                {colorThemes[selectedTheme]['creditCard']}
              </TouchableOpacity>
              <TouchableOpacity
                className="rounded-full mr-1 w-10 h-10 justify-center items-center"
                onPress={() => {
                  setIsSearchOpen(!isSearchOpen);
                  // if (isSearchOpen == false) {
                  //   refInput.current.focus();
                  // }
                }}
                style={{
                  backgroundColor: isSearchOpen
                    ? colorThemes[selectedTheme].textSecondary
                    : colorThemes[selectedTheme]['buttonBackground'],
                }}>
                {colorThemes[selectedTheme]['searchIcon']}
              </TouchableOpacity>
              <CustomDropdown
                TitleComponent={
                  <View
                    className="rounded-full w-10 h-10 items-center justify-center"
                    style={{
                      backgroundColor:
                        colorThemes[selectedTheme]['buttonBackground'],
                    }}>
                    {colorThemes[selectedTheme]['filterIcon']}
                  </View>
                }
                HeadingComponent={
                  <View
                    className="rounded-xl pb-0"
                    style={{width: '95%', backgroundColor: '#000000'}}>
                    <TextInput
                      className="font-[PlusJakartaSans-semiBold] text-sm px-4"
                      style={{color: colorThemes[selectedTheme].textDefault}}
                      placeholder="Search coins"
                      onChangeText={val => setSearchChain(val)}
                      value={searchChain}
                      placeholderTextColor="#999999"
                    />
                    <ScrollView style={{height: 180, width: width * 0.68}}>
                      {searchChain === '' && (
                        <TouchableOpacity
                          className="px-4 mb-2"
                          onPress={() =>
                            setSelectedChain({
                              chainId: '',
                              symbol: 'ALL CHAINS',
                              image: '',
                            })
                          }>
                          <View className="w-full flex flex-row justify-between items-center gap-x-2 relative">
                            <View className="flex flex-row justify-start items-center">
                              <Text className="text-[#FFFFFF]">ALL CHAINS</Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      )}
                      {chains
                        ?.filter(chain =>
                          chain?.symbol
                            ?.toLowerCase()
                            ?.includes(searchChain?.toLowerCase()),
                        )
                        ?.map((chain, idx) => (
                          <TouchableOpacity
                            className="px-4 mb-2"
                            key={idx}
                            onPress={() => setSelectedChain(chain)}>
                            <View className="w-full flex flex-row items-center">
                              <View className="w-full flex flex-row gap-x-2 items-center">
                                <Image
                                  source={chain?.image}
                                  className="w-[30px] h-[30px] rounded-full"
                                />
                                <View className="flex flex-col">
                                  <Text className="font-[PlusJakartaSans-semiBold] text-sm text-[#FFFFFF] ml-2">
                                    Chain Id: {chain?.chainId}
                                  </Text>
                                  <Text className="font-[PlusJakartaSans-semiBold] text-sm text-[#FFFFFF] ml-2">
                                    {chain?.symbol}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        ))}
                    </ScrollView>
                  </View>
                }
                selectedItem={selectedChain}
              />
            </View>
          </View>
          {isSearchOpen && (
            <View
              className="mt-4 mx-4 rounded-xl"
              style={{
                backgroundColor: colorThemes[selectedTheme]['buttonBackground'],
              }}>
              <TextInput
                className="w-full py-1 font-[PlusJakartaSans-SemiBold] px-4"
                placeholder="Search"
                placeholderTextColor={colorThemes[selectedTheme].textMuted}
                ref={refInput}
                style={{color: colorThemes[selectedTheme].textPrimary}}
                onChangeText={val => setSearchCoin(val)}
                value={searchCoin}
              />
            </View>
          )}
          {/* <View className="w-[31%] h-[35px] px-2 bg-[#171A3B] flex flex-row justify-between items-center rounded-md">
            <Menu
              style={{width: '100%', backgroundColor: '#30496e'}}
              // eslint-disable-next-line react/no-unstable-nested-components
              trigger={triggerProps => {
                return (
                  <Pressable
                    className="h-full w-[90%] flex flex-row items-center justify-center"
                    {...triggerProps}>
                    <Text className="text-neutral-100">
                      {selectedChain?.symbol}
                    </Text>
                  </Pressable>
                );
              }}>
              <TextInput
                className="font-[PlusJakartaSans-semiBold] text-sm text-[#FFFFFF] px-4"
                placeholder="Search coins"
                onChangeText={val => setSearchChain(val)}
                value={searchChain}
                placeholderTextColor="#999999"
              />
              <ScrollView style={{height: 180, width: width * 0.68}}>
                {searchChain === '' && (
                  <Menu.Item
                    style={{backgroundColor: '#30496e'}}
                    onPress={() =>
                      setSelectedChain({
                        chainId: '',
                        symbol: 'ALL CHAINS',
                        image: '',
                      })
                    }>
                    <View className="w-full flex flex-row justify-between items-center gap-x-2 relative">
                      <View className="flex flex-row justify-start items-center">
                        <Text className="text-neutral-100">ALL CHAINS</Text>
                      </View>
                    </View>
                  </Menu.Item>
                )}
                {chains
                  ?.filter(chain =>
                    chain?.symbol
                      ?.toLowerCase()
                      ?.includes(searchChain?.toLowerCase()),
                  )
                  ?.map((chain, idx) => (
                    <Menu.Item
                      style={{backgroundColor: '#30496e'}}
                      key={idx}
                      onPress={() => setSelectedChain(chain)}>
                      <View className="w-full flex flex-row justify-between items-center gap-x-2 relative">
                        <View className="flex flex-row justify-start items-center">
                          <Image
                            source={chain?.image}
                            className="w-[30px] h-[30px] rounded-full"
                          />
                          <View className="flex flex-col">
                            <Text className="font-[PlusJakartaSans-semiBold] text-sm text-[#FFFFFF] ml-2">
                              Chain Id: {chain?.chainId}
                            </Text>
                            <Text className="font-[PlusJakartaSans-semiBold] text-sm text-[#FFFFFF] ml-2">
                              {chain?.symbol}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </Menu.Item>
                  ))}
              </ScrollView>
            </Menu>
          </View> */}
          {selectedTab === 'assets' ? (
            showInvestedAssets ? (
              <InvestedAssets balances={balances} />
            ) : (
              <View className="pt-4 pb-20">
                <GestureHandlerRootView>
                  <GestureScrollView
                    ref={scrollRef}
                    className="flex"
                    showsHorizontalScrollIndicator={false}>
                    {balanceDataArr
                      ?.filter(balance => {
                        return (
                          typeof balance.coin !== 'string' &&
                          (balance?.coin?.name
                            ?.toLowerCase()
                            ?.includes(searchCoin?.toLowerCase()) ||
                            balance?.coin?.symbol
                              ?.toLowerCase()
                              ?.includes(searchCoin?.toLowerCase())) &&
                          (selectedChain?.chainId === ''
                            ? true
                            : balance?.coin?.chainId ===
                              selectedChain?.chainId?.toLowerCase())
                        );
                      })
                      ?.map((balance: ICoinBalance, index: number) => {
                        return (
                          <AssetsCard
                            balance={balance}
                            key={index}
                            navigation={navigation}
                            scrollRef={scrollRef}
                          />
                        );
                      })}
                  </GestureScrollView>
                </GestureHandlerRootView>
              </View>
            )
          ) : selectedTab === 'nft' ? (
            <NftDetails />
          ) : (
            <View className="flex-1 justify-center items-center">
              <Text className="text-neutral-100 opacity-30 self-center mt-20">
                Coming Soon
              </Text>
            </View>
          )}
        </ScrollView>
      </GestureHandlerRootView>
    </>
    // <DashboardLayout
    //   component={
    //     <AssetDashboardBack balanceData={balanceData} navigation={navigation} />
    //   }
    //   openContent={contentVisible}
    //   onCloseContent={() => setContentVisible(false)}>
    //   <SafeAreaView className="flex-1 pb-5">
    //     <Notification />
    //     <View className="flex-1  justify-around">
    //       <View className="flex-1 ">
    //         <ScrollView className="pb-2 mb-2 flex-1 ">
    //           <View className="flex-1  flex-col justify-start">
    //             {!isKeyboardVisible && (
    //               <View className="flex-1 h-[320px] items-center w-screen p-1 pt-0">
    //                 <View className="">
    //                   <View className="h-[25%]">
    //                     <View className="px-4 flex flex-row justify-between">
    //                       <View>
    //                         <TouchableOpacity
    //                           onPress={() =>
    //                             dispatch(
    //                               updateTheme(
    //                                 selectedTheme == 'light'
    //                                   ? 'primary'
    //                                   : 'light',
    //                               ),
    //                             )
    //                           }>
    //                           <Text
    //                             className="font-[PlusJakartaSans-Regular] text-base"
    //                             style={{color: colorTheme[selectedTheme][10]}}>
    //                             {'DASHBOARD'}
    //                           </Text>
    //                         </TouchableOpacity>
    //                         <Text
    //                           className="font-[PlusJakartaSans-SemiBold] text-xl"
    //                           style={{color: colorTheme[selectedTheme][50]}}>
    //                           ${totalCurrentBalanceInUSD?.toFixed(4)}
    //                         </Text>
    //                         <CoinPnl pnlPercentage={totalPnl} />
    //                       </View>
    //                       <TouchableOpacity
    //                         onPress={() =>
    //                           // navigation.navigate('DashboardLanding')
    //                           navigation.navigate('Profile')
    //                         }
    //                         className="w-fit h-7 rounded-3xl mb-5 mt-2 justify-center items-center px-2">
    //                         <Image
    //                           className="w-7 h-7"
    //                           source={
    //                             colorTheme[selectedTheme][
    //                               'dashboardProfileIcon'
    //                             ]
    //                           }
    //                         />
    //                       </TouchableOpacity>
    //                     </View>

    //                     <DashboardSection
    //                       coinAssets={balances}
    //                       totalBalance={totalCurrentBalanceInUSD}
    //                     />
    //                   </View>
    //                 </View>
    //               </View>
    //             )}
    //             <View className="flex-1 h-14 top-4 flex-row items-center justify-between mt-2 mb-4 px-2">
    //               <TouchableOpacity
    //                 activeOpacity={0.8}
    //                 onPress={() => navigation.navigate('History')}
    //                 className="flex-1 flex-row items-center">
    //                 <Image
    //                   source={require('../../../assets/images/history-dark.png')}
    //                   className="w-6 h-7"
    //                   resizeMode="stretch"
    //                 />
    //                 <Text
    //                   className={
    //                     'font-[PlusJakartaSans-Regular] text-2xl text-[#FFFFFF] mb-1 ml-1'
    //                   }>
    //                   {transactionsData?.transactions?.length}
    //                 </Text>
    //                 <Text
    //                   className={
    //                     'font-[PlusJakartaSans-semiBold] text-sm text-[#999999] ml-1 mb-0.5'
    //                   }>
    //                   Transactions
    //                 </Text>
    //               </TouchableOpacity>
    //               <View className="flex-1 flex-row items-center">
    //                 <TouchableOpacity
    //                   className="ml-1 mb-1"
    //                   activeOpacity={0.8}
    //                   onPress={() => {
    //                     navigation.navigate('SendPage');
    //                   }}>
    //                   <Image
    //                     // source={require('../../../assets/images/send-dark.png')}
    //                     source={colorTheme[selectedTheme]['sendBtn']}
    //                     className="w-20 h-8"
    //                     resizeMode="stretch"
    //                   />
    //                 </TouchableOpacity>
    //                 <TouchableOpacity
    //                   className="mr-1 -ml-2 mb-1"
    //                   activeOpacity={0.8}
    //                   onPress={() => {
    //                     dispatch(updatepopupName('Receive'));
    //                     dispatch(togglePopup());
    //                   }}>
    //                   <Image
    //                     // source={require('../../../assets/images/receive-dark.png')}
    //                     source={colorTheme[selectedTheme]['receiveBtn']}
    //                     className="w-20 h-8"
    //                     resizeMode="stretch"
    //                     // resizeMode="stretch"
    //                   />
    //                 </TouchableOpacity>
    //                 {selectedTab === 'assets' && (
    //                   <TouchableOpacity
    //                     activeOpacity={0.8}
    //                     onPress={() => {
    //                       if (isAscendingOrder) {
    //                         setBalanceDataArr(
    //                           balances?.sort(
    //                             (a: ICoinBalance, b: ICoinBalance) =>
    //                               b.value * b.coin.usdPrice -
    //                               a.value * a.coin.usdPrice,
    //                           ),
    //                         );
    //                         setIsAscendingOrder(false);
    //                       } else {
    //                         setBalanceDataArr(
    //                           balances?.sort(
    //                             (a: ICoinBalance, b: ICoinBalance) =>
    //                               a.value * a.coin?.usdPrice -
    //                               b.value * b.coin?.usdPrice,
    //                           ),
    //                         );
    //                         setIsAscendingOrder(true);
    //                       }
    //                     }}>
    //                     {isAscendingOrder ? (
    //                       <Image
    //                         source={require('../../../assets/images/ascending.png')}
    //                         className="w-10 h-10"
    //                       />
    //                     ) : (
    //                       <Image
    //                         source={require('../../../assets/images/descending-dark.png')}
    //                         className="w-8 h-8"
    //                       />
    //                     )}
    //                   </TouchableOpacity>
    //                 )}
    //               </View>
    //             </View>
    //           </View>
    //           <View className="w-full flex flex-row justify-between px-2">
    //             <ImageBackground
    //               resizeMode="stretch"
    //               style={{width: width * 0.62}}
    //               source={require('../../../assets/images/search-bg.png')}>
    //               <TextInput
    //                 className="w-full h-[35px] font-[PlusJakartaSans-semiBold] text-sm text-[#FFFFFF] px-4 rounded-3xl items-center pl-4"
    //                 placeholder="Search coins"
    //                 onChangeText={val => setSearchCoin(val)}
    //                 value={searchCoin}
    //                 placeholderTextColor="#999999"
    //               />
    //             </ImageBackground>
    //             <View className="w-[31%] h-[35px] px-2 bg-[#171A3B] flex flex-row justify-between items-center rounded-md">
    //               <Menu
    //                 style={{width: '100%', backgroundColor: '#30496e'}}
    //                 // eslint-disable-next-line react/no-unstable-nested-components
    //                 trigger={triggerProps => {
    //                   return (
    //                     <Pressable
    //                       className="h-full w-[90%] flex flex-row items-center justify-center"
    //                       {...triggerProps}>
    //                       <Text className="text-neutral-100">
    //                         {selectedChain?.symbol}
    //                       </Text>
    //                     </Pressable>
    //                   );
    //                 }}>
    //                 <TextInput
    //                   className="font-[PlusJakartaSans-semiBold] text-sm text-[#FFFFFF] px-4"
    //                   placeholder="Search coins"
    //                   onChangeText={val => setSearchChain(val)}
    //                   value={searchChain}
    //                   placeholderTextColor="#999999"
    //                 />
    //                 <ScrollView style={{height: 180, width: width * 0.68}}>
    //                   {searchChain === '' && (
    //                     <Menu.Item
    //                       style={{backgroundColor: '#30496e'}}
    //                       onPress={() =>
    //                         setSelectedChain({
    //                           chainId: '',
    //                           symbol: 'ALL CHAINS',
    //                           image: '',
    //                         })
    //                       }>
    //                       <View className="w-full flex flex-row justify-between items-center gap-x-2 relative">
    //                         <View className="flex flex-row justify-start items-center">
    //                           <Text className="text-neutral-100">
    //                             ALL CHAINS
    //                           </Text>
    //                         </View>
    //                       </View>
    //                     </Menu.Item>
    //                   )}
    //                   {chains
    //                     ?.filter(chain =>
    //                       chain?.symbol
    //                         ?.toLowerCase()
    //                         ?.includes(searchChain?.toLowerCase()),
    //                     )
    //                     ?.map((chain, idx) => (
    //                       <Menu.Item
    //                         style={{backgroundColor: '#30496e'}}
    //                         key={idx}
    //                         onPress={() => setSelectedChain(chain)}>
    //                         <View className="w-full flex flex-row justify-between items-center gap-x-2 relative">
    //                           <View className="flex flex-row justify-start items-center">
    //                             <Image
    //                               source={chain?.image}
    //                               className="w-[30px] h-[30px] rounded-full"
    //                             />
    //                             <View className="flex flex-col">
    //                               <Text className="font-[PlusJakartaSans-semiBold] text-sm text-[#FFFFFF] ml-2">
    //                                 Chain Id: {chain?.chainId}
    //                               </Text>
    //                               <Text className="font-[PlusJakartaSans-semiBold] text-sm text-[#FFFFFF] ml-2">
    //                                 {chain?.symbol}
    //                               </Text>
    //                             </View>
    //                           </View>
    //                         </View>
    //                       </Menu.Item>
    //                     ))}
    //                 </ScrollView>
    //               </Menu>
    //               <DownArrow />
    //             </View>
    //           </View>

    //           {selectedTab === 'assets' ? (
    //             <View className="pt-4">
    //               <GestureHandlerRootView>
    //                 <GestureScrollView
    //                   ref={scrollRef}
    //                   className="flex"
    //                   showsHorizontalScrollIndicator={false}>
    //                   {balanceDataArr
    //                     ?.filter(
    //                       balance =>
    //                         (balance?.coin?.name
    //                           ?.toLowerCase()
    //                           ?.includes(searchCoin?.toLowerCase()) ||
    //                           balance?.coin?.symbol
    //                             ?.toLowerCase()
    //                             ?.includes(searchCoin?.toLowerCase())) &&
    //                         (selectedChain?.chainId == ''
    //                           ? true
    //                           : balance?.coin?.chainId ==
    //                             selectedChain?.chainId?.toLowerCase()),
    //                     )
    //                     ?.map((balance: ICoinBalance, index: number) => {
    //                       return (
    //                         <AssetsCard
    //                           balance={balance}
    //                           key={index}
    //                           navigation={navigation}
    //                           scrollRef={scrollRef}
    //                         />
    //                       );
    //                     })}
    //                 </GestureScrollView>
    //               </GestureHandlerRootView>
    //             </View>
    //           ) : selectedTab === 'portfolios' ? (
    //             <View className="pr-4">
    //               <ScrollView
    //                 horizontal
    //                 className="flex"
    //                 style={{height: height - 480}}>
    //                 {portfolios?.map((portfolio, index) => {
    //                   return (
    //                     portfolio.name !== '' && (
    //                       <AccumulatedPortfolioCard
    //                         key={index}
    //                         portfolio={portfolio}
    //                       />
    //                     )
    //                   );
    //                 })}
    //               </ScrollView>
    //             </View>
    //           ) : selectedTab === 'nft' ? (
    //             <Text className="text-neutral-100 self-center align-middle opacity-50 mt-28">
    //               Coming Soon
    //             </Text>
    //           ) : selectedTab === 'rwa' ? (
    //             <Text className="text-neutral-100 self-center align-middle opacity-50 mt-28">
    //               Coming Soon
    //             </Text>
    //           ) : null}
    //         </ScrollView>
    //       </View>
    //       <View className="flex flex-row justify-center items-center">
    //         <View className="flex flex-row items-center justify-start z-0">
    //           {isPressActive && (
    //             <>
    //               <Text className="text-neutral-100 ml-4 font-bold">SWAP</Text>
    //               <View className="p-2.5 rounded-full shadow-md">
    //                 <LottieView
    //                   source={require('./lottie/left.json')}
    //                   autoPlay
    //                   loop
    //                   style={{width: 30, height: 30}}
    //                 />
    //               </View>
    //             </>
    //           )}
    //         </View>
    //         <GestureHandlerRootView className="z-50">
    //           <PanGestureHandler onGestureEvent={gestureHandler}>
    //             <Animated.View style={[logoPosition, vibrateLogoStyle]}>
    //               <TouchableOpacity
    //                 onPressIn={() => {
    //                   // setIsPressActive(true);
    //                   console.log('PRESSING IN');
    //                 }}
    //                 onPressOut={() => {
    //                   // setIsPressActive(false);
    //                   console.log('PRESSING OUT');
    //                 }}
    //                 activeOpacity={0.8}>
    //                 <Image
    //                   source={require('../../../assets/images/porfo-ask.png')}
    //                   className="w-20 h-20 z-50"
    //                 />
    //               </TouchableOpacity>
    //             </Animated.View>
    //           </PanGestureHandler>
    //         </GestureHandlerRootView>
    //         <View className="flex flex-row items-center justify-start z-0">
    //           {isPressActive && (
    //             <>
    //               <View className="p-2.5 rounded-full shadow-md">
    //                 <LottieView
    //                   source={require('./lottie/right.json')}
    //                   autoPlay
    //                   loop
    //                   style={{width: 30, height: 30}}
    //                 />
    //               </View>
    //               <Text className="text-neutral-100 mr-4 font-bold">
    //                 ASK AI
    //               </Text>
    //             </>
    //           )}
    //         </View>
    //       </View>
    //     </View>
    //   </SafeAreaView>
    // </DashboardLayout>
  );
};

export default AssetDashboard;
