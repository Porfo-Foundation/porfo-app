import {
  View,
  Text,
  Dimensions,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CoinCard from './CoinCard';
import Logo from '../../../assets/icons/svg/logo.svg';
import {ICoin} from '../../../interfaces/main';
import {getAllCoins} from '../../../apiCalls/coin';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {toggleLoader} from '../../../redux/features/popupSlice';
import {
  updateCoinList,
  updatePortfolioName,
} from '../../../redux/features/onBoardingSlice';
import Search from '../../../assets/icons/svg/search.svg';
import useCoinList from '../../../hooks/reactQuery/apiHooks/useCoinList';
const {width, height} = Dimensions.get('screen');

const SetupPortfolio = ({next, handledSkip}: any) => {
  const {data: coinListTemp} = useCoinList();
  const coinList = coinListTemp ? coinListTemp : [];
  const dispatch = useAppDispatch();
  const [portFolioName, setPortFolioName] = useState('');
  const [baseCoinList, setBaseCoinList] = useState<Array<ICoin>>([]);
  const [stableCoinList, setStableCoinList] = useState<Array<ICoin>>([]);
  const {baseCoin, stableCoin} = useAppSelector(state => state.onBoarding);
  const [searchTextBase, setSearchTextBase] = useState('');
  const [searchTextStable, setSearchTextStable] = useState('');

  useEffect(() => {
    dispatch(toggleLoader());
    const filteredCoin = coinList?.filter((coin: ICoin) => {
      return coin.isStable === true;
    });
    dispatch(updateCoinList(coinList));
    setBaseCoinList(coinList);
    setStableCoinList(filteredCoin);
    dispatch(toggleLoader());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coinList]);

  function isDisabled() {
    if (
      baseCoin.symbol === '' ||
      stableCoin.symbol === '' ||
      portFolioName === ''
    ) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <View style={{width: width}}>
      <View
        className="justify-between pb-6 flex"
        style={{height: height - 180}}>
        <View className="">
          <Text className="font-[PlusJakartaSans-SemiBold] text-xl text-[#FFFFFF] text-center px-6">
            Lets setup your portfolio
          </Text>
          <Text className="font-[PlusJakartaSans-SemiBold] text-xs text-[#999999] text-center mt-1 px-6">
            Select a base coin and a stable coin to set native currency for your
            portfolio
          </Text>
          <View className="mt-4 px-6">
            <Text className="font-[PlusJakartaSans-semiBold] text-base text-[#FEFDFD] mb-1">
              Portfolio Name
            </Text>
            <View className="bg-[#2E304E] rounded-md border border-[#393B57] flex flex-row items-center px-2">
              <TextInput
                className="flex-1 font-[PlusJakartaSans-semiBold] text-neutral-200 text-xs py-1"
                placeholder="Portfolio name"
                placeholderTextColor="gray"
                value={portFolioName}
                onChangeText={text => setPortFolioName(text)}
              />
            </View>
            <Text className="font-[PlusJakartaSans-semiBold] text-xs text-[#999999] my-3">
              Select starred coins if you are new to the crypto assets
            </Text>
          </View>
          <View className="flex-row items-center mb-1">
            <Text className="font-[PlusJakartaSans-semiBold] text-base text-[#FEFDFD] mb-2 px-6">
              Select Base Coin
            </Text>
            <View
              className="flex flex-row items-center bg-[#282C51] ml-2 px-2 rounded flex-1 mr-6"
              style={{width: width * 0.35}}>
              <TextInput
                placeholder="Search Coins"
                placeholderTextColor="#999999"
                className="text-[#FFFFFF] pr-2 flex-1 text-xs py-0 my-0"
                value={searchTextBase}
                onChangeText={text => setSearchTextBase(text)}
              />
              <Search />
            </View>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="px-6">
            {baseCoinList
              ?.filter(
                coin =>
                  coin?.name
                    ?.toLowerCase()
                    ?.includes(searchTextBase?.toLowerCase()) ||
                  coin?.symbol
                    ?.toLowerCase()
                    ?.includes(searchTextBase?.toLowerCase()),
              )
              .map((coin: ICoin, index: any) => {
                return (
                  <CoinCard
                    key={index}
                    coin={coin}
                    type="base"
                    isSelected={coin?.id === baseCoin?.id}
                  />
                );
              })}
          </ScrollView>
          <View className="flex-row items-center mb-1 mt-4">
            <Text className="font-[PlusJakartaSans-semiBold] text-base text-[#FEFDFD] mb-2 px-6">
              Select Stable Coin
            </Text>
            <View
              className="flex flex-row items-center bg-[#282C51] ml-2 px-2 rounded flex-1 mr-6"
              style={{width: width * 0.35}}>
              <TextInput
                placeholder="Search Coins"
                placeholderTextColor="#999999"
                className="text-[#FFFFFF] pr-2 flex-1 text-xs py-0 my-0"
                value={searchTextStable}
                onChangeText={text => setSearchTextStable(text)}
              />
              <Search />
            </View>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="px-6">
            {stableCoinList
              ?.filter(
                coin =>
                  coin?.name
                    ?.toLowerCase()
                    ?.includes(searchTextStable?.toLowerCase()) ||
                  coin?.symbol
                    ?.toLowerCase()
                    ?.includes(searchTextStable?.toLowerCase()),
              )
              .map((coin: ICoin, index: any) => (
                <CoinCard
                  key={index}
                  coin={coin}
                  type="stable"
                  isSelected={coin?.id === stableCoin?.id}
                />
              ))}
          </ScrollView>
        </View>
        <View className="flex flex-row items-center justify-between px-6 pt-8">
          <TouchableOpacity
            onPress={() => {
              handledSkip();
            }}>
            <Logo />
          </TouchableOpacity>
          <View className="flex-row gap-x-2">
            <TouchableOpacity
              className={'bg-[#4845F8] px-8 py-3 rounded-full mb-2'}
              onPress={() => {
                // next();
                handledSkip();
              }}>
              <Text className="font-[PlusJakartaSans-semiBold] text-sm text-[#FFFFFF]">
                Skip
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={isDisabled()}
              className={`${
                isDisabled() ? 'bg-typography-alternate' : 'bg-[#4845F8]'
              } px-8 py-3 rounded-full mb-2`}
              onPress={() => {
                dispatch(updatePortfolioName(portFolioName));
                next();
              }}>
              <Text className="font-[PlusJakartaSans-semiBold] text-sm text-[#FFFFFF]">
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SetupPortfolio;
