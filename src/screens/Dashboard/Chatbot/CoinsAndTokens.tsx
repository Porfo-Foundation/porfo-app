import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useRef} from 'react';
import CoinLogo from '../../../components/coindetails/CoinLogo';
import {convertAndShareImage} from '../../../utils/shareData';
const CoinsAndTokens = ({data}: any) => {
  const viewRef = useRef<any>();
  // const demoObject = {
  //   information: 'Trending Coins and Tokens',
  //   data: [
  //     {
  //       logo: 'https://www.freepnglogos.com/uploads/bitcoin-png/where-can-find-this-bitcoin-logo-transparent-png-2.png',
  //       name: 'Bitcoin',
  //       symbol: 'Btc',
  //       price: 28855.24,
  //     },
  //     {
  //       logo: 'https://www.freepnglogos.com/uploads/bitcoin-png/where-can-find-this-bitcoin-logo-transparent-png-2.png',
  //       name: 'Bitcoin',
  //       symbol: 'Btc',
  //       price: 28855.24,
  //     },
  //     {
  //       logo: 'https://www.freepnglogos.com/uploads/bitcoin-png/where-can-find-this-bitcoin-logo-transparent-png-2.png',
  //       name: 'Bitcoin',
  //       symbol: 'Btc',
  //       price: 28855.24,
  //     },
  //     {
  //       logo: 'https://www.freepnglogos.com/uploads/bitcoin-png/where-can-find-this-bitcoin-logo-transparent-png-2.png',
  //       name: 'Bitcoin',
  //       symbol: 'Btc',
  //       price: 28855.24,
  //     },
  //     {
  //       logo: 'https://www.freepnglogos.com/uploads/bitcoin-png/where-can-find-this-bitcoin-logo-transparent-png-2.png',
  //       name: 'Bitcoin',
  //       symbol: 'Btc',
  //       price: 28855.24,
  //     },
  //     {
  //       logo: 'https://www.freepnglogos.com/uploads/bitcoin-png/where-can-find-this-bitcoin-logo-transparent-png-2.png',
  //       name: 'Bitcoin',
  //       symbol: 'Btc',
  //       price: 28855.24,
  //     },
  //   ],
  // };
  // console.log('data....', data);
  // return <Text>Hasdfasdfsd</Text>;
  return (
    <View className="w-[90%] w-max-[70vw] ml-1" ref={viewRef}>
      <View className="flex flex-row justify-between  mb-2">
        <Text className="text-neutral-100 text-xl">
          {Object.keys(data[0])[3].toUpperCase()}
        </Text>
        <View className="w-fit h-full flex flex-row items-center self-end">
          <TouchableOpacity onPress={() => convertAndShareImage(viewRef)}>
            <Image
              source={require('../../../assets/images/share-new.png')}
              className="w-6 h-6"
            />
          </TouchableOpacity>
        </View>
      </View>
      {data?.map((item: any, index: number) => {
        return (
          <View
            className="w-full flex flex-row justify-between items-center border-b-[0.5px] border-b-neutral-100 pr-2 py-1"
            key={index}>
            <View className="w-[70%] flex flex-row justify-start items-center gap-2">
              <View className="w-[40px] h-[40px] bg-[#171A3B] self-center mt-1 mb-1 items-center justify-center">
                {/* <CoinLogo logoURI={item.logo} /> */}
                <Image source={{uri: item.logo}} className="h-6 w-6" />
              </View>
              <Text className="text-neutral-100 text-[10px] w-14">
                {item.name?.toUpperCase()}
              </Text>
              <Text className="text-neutral-100 text-[10px] opacity-50">
                ({item.symbol?.toUpperCase()})
              </Text>
            </View>
            <View className="flex flex-row">
              {item.marketCap ? (
                <Text className="text-neutral-100">
                  ${item.marketCap?.toString()}
                </Text>
              ) : (
                <Text className="text-neutral-100">
                  ${item.currentPrice?.toString()}
                </Text>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default CoinsAndTokens;
