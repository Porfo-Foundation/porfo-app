import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import {colorThemes} from '../../../constants/themeData';

import React, {useState} from 'react';
import {useAppSelector} from '../../../redux/hooks';
import CustomDropdown from '../../../components/common/CustomDropdown';

const {width} = Dimensions.get('window');

const ActionsheetBuy = () => {
  const {selectedTheme} = useAppSelector(state => state.selectedTheme);

  const {buyCoin} = useAppSelector(state => state.coin);
  const [buyAmount, setBuyAmount] = useState('0');
  const [searchChain, setSearchChain] = useState('');
  const [selectedChain, setSelectedChain] = useState({
    chainId: '',
    symbol: 'ALL CHAINS',
    image: '',
  });
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

  const handleKeyPress = (key: string) => {
    if (key === 'x') {
      if (buyAmount.length > 1) {
        setBuyAmount(buyAmount.slice(0, -1));
      } else {
        setBuyAmount('0');
      }
    } else {
      if (buyAmount === '0' && key !== '.') {
        setBuyAmount(key);
      } else {
        setBuyAmount(buyAmount + key);
      }
    }
  };
  return (
    <ScrollView className="w-full px-3">
      <View className="px-2 w-full">
        <Text
          className="font-bold text-3xl"
          style={{
            color: colorThemes[selectedTheme].textDefault,
          }}>
          Buy {buyCoin.name}
        </Text>
        <Text
          className="font-[PlusJakartaSans-semiBold] text-md mb-2 mt-6"
          style={{
            color: colorThemes[selectedTheme].textDefault,
          }}>
          Enter Amount
        </Text>
        <View className="w-full flex flex-col justify-between items-center">
          <TextInput
            editable={false}
            className="font-[PlusJakartaSans-SemiBold] w-full rounded-lg px-4"
            style={{
              color: colorThemes[selectedTheme].textDefault,
              backgroundColor:
                colorThemes[selectedTheme].inputSecondaryBackground,
            }}
            placeholder="Enter Amount to buy"
            placeholderTextColor="#999999"
            value={buyAmount}
            onChangeText={text => setBuyAmount(text)}
          />
          <View className="w-full">
            <CustomDropdown
              TitleComponent={
                <View
                  className="p-2 flex-row justify-between items-center w-full mt-2 h-12 rounded-md"
                  style={{
                    backgroundColor:
                      colorThemes[selectedTheme].dropdownBackground,
                  }}>
                  <Text
                    style={{
                      color: colorThemes[selectedTheme].textDefault,
                    }}>
                    {selectedChain?.symbol}
                  </Text>
                  {colorThemes[selectedTheme].chevronDownSecondary}
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
      </View>

      <View className="flex-row flex-wrap gap-y-3 rounded-t-3xl ml-0">
        {Array(9)
          .fill(' ')
          .map((_, idx) => (
            <TouchableOpacity
              onPress={() => handleKeyPress((idx + 1).toString())}
              key={idx}
              style={{width: width / 3 - 16}}
              className="flex-row justify-center py-3 rounded-md">
              <Text
                className="font-[PlusJakartaSans-SemiBold] text-lg"
                style={{
                  color: colorThemes[selectedTheme].textDefault,
                }}>
                {idx + 1}
              </Text>
            </TouchableOpacity>
          ))}
        <TouchableOpacity
          onPress={() => handleKeyPress('x')}
          style={{width: width / 3 - 16}}
          className="flex-row justify-center py-3 rounded-md">
          <Text
            className="font-[PlusJakartaSans-SemiBold] text-lg"
            style={{
              color: colorThemes[selectedTheme].textDefault,
            }}>
            x
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleKeyPress('0')}
          style={{width: width / 3 - 16}}
          className="flex-row justify-center py-3 rounded-md">
          <Text
            className="font-[PlusJakartaSans-SemiBold] text-lg"
            style={{
              color: colorThemes[selectedTheme].textDefault,
            }}>
            0
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleKeyPress('.')}
          style={{width: width / 3 - 16}}
          className="flex-row justify-center py-3 rounded-md">
          <Text
            className="font-[PlusJakartaSans-SemiBold] text-lg"
            style={{
              color: colorThemes[selectedTheme].textDefault,
            }}>
            .
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="mx-2 rounded-2xl mb-8"
          activeOpacity={0.8}
          style={{
            width: width - 54,
            backgroundColor: colorThemes[selectedTheme].textSecondary,
          }}>
          <Text
            className="font-[PlusJakartaSans-SemiBold] text-lg text-center py-3"
            style={{
              color: colorThemes[selectedTheme].textPrimary,
            }}>
            Buy
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ActionsheetBuy;
