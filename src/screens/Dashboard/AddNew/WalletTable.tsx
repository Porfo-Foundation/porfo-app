import {View, Text, ScrollView, Image} from 'react-native';
import React from 'react';

const WalletTable = () => {
  const data = [
    {
      image: require('../../../assets/images/bitcoin.png'),
      symbol: 'BNB',
      price: '244.44',
      amount: '121213',
      usdValue: '32422432.23',
    },
    {
      image: require('../../../assets/images/bitcoin.png'),
      symbol: 'BNB',
      price: '244.44',
      amount: '121213',
      usdValue: '32422432.23',
    },
    {
      image: require('../../../assets/images/bitcoin.png'),
      symbol: 'BNB',
      price: '244.44',
      amount: '121213',
      usdValue: '32422432.23',
    },
  ];
  return (
    <ScrollView>
      <View className="bg-[#344A71] p-4 rounded-xl mt-4 mx-4">
        <View className="flex-row">
          <Text className="text-xs text-[#ffffff] w-[40%]">
            TOKEN
          </Text>
          <Text className="text-xs text-[#ffffff] w-[30%]">
            PRICE
          </Text>
          <Text className="text-xs text-[#ffffff] w-[30%]">
            AMOUNT
          </Text>
        </View>
        <View className="mt-6">
          {data?.map((val, idx) => (
            <View className="flex-row items-center mb-4" key={idx}>
              <View className="flex-row items-center gap-x-3 w-[40%]">
                <View className="relative">
                  <Image source={val.image} />
                  <Image
                    source={require('../../../assets/images/bitcoin.png')}
                    className="absolute right-0 left-6 w-4 h-4"
                  />
                </View>
                <View>
                  <Text className="text-md text-[#ffffff]">
                    {val.amount}
                  </Text>
                  <Text className="text-[10px] text-[#b8b8b8]">
                    {val.symbol}
                  </Text>
                </View>
              </View>
              <View className="w-[30%]">
                <Text className="text-md text-[#ffffff]">
                  ${val.price}
                </Text>
              </View>
              <View className="w-[30%]">
                <Text className="text-md text-[#ffffff]">
                  ${val.usdValue}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default WalletTable;
