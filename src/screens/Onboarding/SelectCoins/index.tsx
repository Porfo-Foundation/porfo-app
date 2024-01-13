/* eslint-disable react-native/no-inline-styles */

import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import CollectionCoinsCard from './CollectionCoinsCard';
import Logo from '../../../assets/icons/svg/logo.svg';
import Search from '../../../assets/icons/svg/search.svg';
import SelectCard from './SelectCard';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {updateSelectedCoins} from '../../../redux/features/onBoardingSlice';
import {blueChips1} from '../../../config/config';
import {ISelectedCoin} from '../../../interfaces/main';
import {ICoin} from '../../../interfaces/main';

const {width, height} = Dimensions.get('screen');

const SelectCoins = ({next}: any) => {
  const baseCoin = useAppSelector(state => state.onBoarding.baseCoin);
  const dispatch = useAppDispatch();
  const {coinList} = useAppSelector(state => state.onBoarding);
  const collections: any = [
    {
      coins: coinList.filter(coin => blueChips1.includes(coin.coinId!)),
      name: 'Bluechip',
    },
    {
      coins: coinList.filter(coin => blueChips1.includes(coin.coinId!)),
      name: 'Bluechip2',
    },
    {
      coins: coinList.filter(coin => blueChips1.includes(coin.coinId!)),
      name: 'Bluechip3',
    },
  ];
  const [searchText, setSearchText] = useState('');
  const [selectedCollection, setSelectedCollection]: any = useState('');
  const [selectedCoins, setSelectedCoins] = useState<ICoin[]>([]);
  const [selectedTab, setSelectedTab] = useState('Collection');

  // reseting selectedcoin
  useEffect(() => {
    setSelectedCoins([baseCoin]);
    dispatch(updateSelectedCoins([]));
  }, [dispatch, baseCoin]);

  const handleNext = () => {
    const convertedType: ISelectedCoin[] = selectedCoins?.map(
      (coin: ICoin) => ({
        coin: coin,
        percentage: Number((100 / selectedCoins.length).toFixed(2)),
        amount: 0,
        avgPrice: 0,
      }),
    );
    dispatch(updateSelectedCoins(convertedType));
    next();
  };

  const isDisabled = () => {
    if (selectedCoins.length === 0) {
      return true;
    }
  };

  return (
    <View
      className="justify-between h-full flex"
      style={{width: width, paddingHorizontal: 24}}>
      <View>
        <Text className="font-[PlusJakartaSans-SemiBold] text-xl text-[#FFFFFF] text-center">
          Select Portfolio Coins
        </Text>
        <Text className="font-[PlusJakartaSans-SemiBold] text-xs text-[#999999] text-center mt-1">
          Choose the best combination of coins to build a high yield portfolio.
          Remember Crypto is a long-term commitment.
        </Text>
        <View className="flex-row items-center">
          <View className="flex flex-row bg-[#4845F8] p-px rounded-full mt-4 flex-1">
            <TouchableOpacity
              onPress={() => setSelectedTab('Collection')}
              className={`flex-1 rounded-full py-2 ${
                selectedTab === 'Collection' ? 'bg-[#282C51]' : 'bg-[#4845F8]'
              }`}>
              <Text className="font-[PlusJakartaSans-semiBold] text-sm text-[#FFFFFF] text-center">
                Collection
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedTab('Select')}
              className={`flex-1 rounded-full py-2 ${
                selectedTab === 'Select' ? 'bg-[#282C51]' : 'bg-[#4845F8]'
              }`}>
              <Text className="font-[PlusJakartaSans-semiBold] text-sm text-[#FFFFFF] text-center">
                Select
              </Text>
            </TouchableOpacity>
          </View>
          {selectedTab === 'Select' && (
            <View
              className="flex flex-row items-center bg-[#282C51] mt-4 ml-2 h-10 px-2 rounded"
              style={{width: width * 0.35}}>
              <TextInput
                placeholder="Search Coins"
                placeholderTextColor="#999999"
                className="text-[#FFFFFF] pr-2 flex-1"
                value={searchText}
                onChangeText={text => setSearchText(text)}
              />
              <Search />
            </View>
          )}
        </View>
        {selectedTab === 'Collection' && (
          <>
            <Text className="font-[PlusJakartaSans-semiBold] text-xs text-[#999999] mt-5 mb-2">
              Select from pre-curated thematic buckets to start your crypto
              journey
            </Text>
            <View>
              <FlatList
                data={collections}
                numColumns={3}
                renderItem={item => (
                  <CollectionCoinsCard
                    data={item}
                    setSelectedCollection={setSelectedCollection}
                    isSelected={selectedCollection?.name === item?.item?.name}
                    setSelectedCoins={setSelectedCoins}
                  />
                )}
              />
            </View>
          </>
        )}
        {selectedTab === 'Select' && (
          <ScrollView className="mt-4" style={{maxHeight: height - 450}}>
            <>
              {coinList
                ?.filter(
                  (coin, index) =>
                    coin?.symbol
                      ?.toLowerCase()
                      .includes(searchText?.toLowerCase()) ||
                    coin?.name
                      ?.toLowerCase()
                      .includes(searchText?.toLowerCase()),
                )
                ?.map((data: ICoin, index: number) => {
                  const isSelected = selectedCoins.some(
                    (val: any) => val.id === data.id,
                  );
                  if (isSelected) {
                    return (
                      <SelectCard
                        key={index}
                        data={data}
                        selectedCoins={selectedCoins}
                        setSelectedCoins={setSelectedCoins}
                        isSelected={isSelected}
                      />
                    );
                  }
                })}
            </>
            <>
              {coinList
                ?.filter(
                  (coin, index) =>
                    coin?.symbol
                      ?.toLowerCase()
                      .includes(searchText?.toLowerCase()) ||
                    coin?.name
                      ?.toLowerCase()
                      .includes(searchText?.toLowerCase()),
                )
                ?.map((data: ICoin, index: number) => {
                  const isSelected = selectedCoins.some(
                    (val: any) => val.id === data.id,
                  );
                  if (!isSelected) {
                    return (
                      <SelectCard
                        key={index}
                        data={data}
                        selectedCoins={selectedCoins}
                        setSelectedCoins={setSelectedCoins}
                        isSelected={isSelected}
                      />
                    );
                  }
                })}
            </>
          </ScrollView>
        )}
      </View>
      <View className="flex flex-row items-center justify-between pt-4">
        <Logo />
        <TouchableOpacity
          disabled={isDisabled()}
          className={`${
            isDisabled() ? 'bg-typography-alternate' : 'bg-[#4845F8]'
          } px-8 py-3 rounded-full mb-1`}
          onPress={handleNext}>
          <Text className="font-[PlusJakartaSans-SemiBold] text-sm text-[#FFFFFF]">
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SelectCoins;
