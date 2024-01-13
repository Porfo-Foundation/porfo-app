import {View, Text, Image, FlatList, Dimensions} from 'react-native';
import React from 'react';
const {width} = Dimensions.get('screen');

const WalletCards = () => {
  const AmountCard = () => {
    return (
      <View
        className="flex flex-row gap-x-2 py-2 items-center"
        style={{width: width / 2 - 24}}>
        <Image source={require('../../../assets/images/bitcoin.png')} />
        <View>
          <Text className="font-[PlusJakartaSans-SemiBold] text-xs text-[#b8b8b8]">
            Followers
          </Text>
          <Text className="font-[PlusJakartaSans-SemiBold] text-lg leading-6 text-[#ffffff]">
            $16,214,818
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View className="bg-[#344A71] p-4 rounded-xl mt-4">
      <FlatList
        data={Array(8).fill(' ')}
        renderItem={({item}) => <AmountCard />}
        numColumns={2}
      />
    </View>
  );
};

export default WalletCards;
