import {View, Text, Image, ScrollView} from 'react-native';
import React from 'react';

const PullDownPage = () => {
  return (
    <ScrollView>
      <View className="flex flex-row items-center justify-between bg-[#533483] px-2">
        <Image
          source={require('../../../assets/images/logo_pulldown.png')}
          className="w-28 h-16"
          resizeMode="contain"
        />
        <Text className="text-[#ffffff] font-[PlusJakartaSans-SemiBold] text-xl">
          Gas Tank
        </Text>
      </View>
      <View>
        <View className="w-full flex-row justify-center my-4">
          <Image
            source={require('../../../assets/images/fuel_illustration.png')}
            className="w-[90%] h-36"
            resizeMode="contain"
          />
        </View>
        <Text className="text-[#ffffff] font-[PlusJakartaSans-Light] py-3 px-2 text-justify">
          Porfo tokens are not infinite; their supply is limited. As the usage
          increases, the available supply decreases, inherently increasing the
          value of each token over time. This means that with each transaction,
          Porfo tokens not only retain but potentially increase in value. The
          rising value of Porfo tokens has a direct benefit for you — it reduces
          the amount needed to cover gas fees with each transaction. If you
          foresee a series of transactions in your near future, holding onto
          Porfo tokens can be a strategic move. It allows you to steadily save
          on gas fees, making each transaction more economical than the last.
        </Text>
        <Text className="text-[#ffffff] font-[PlusJakartaSans-Light] py-3 px-2 text-justify">
          Each Porfo transaction involves a token burn, where a fraction of the
          tokens used are permanently removed from circulation. This process not
          only creates scarcity but also amplifies the value of the remaining
          tokens. It's a win-win for Porfo users, as they witness an
          appreciation in their token value with every transaction conducted.
        </Text>
        <Text className="text-[#ffffff] font-[PlusJakartaSans-Light] py-3 px-2 text-justify">
          If you anticipate a high volume of transactions shortly, acquiring and
          holding Porfo tokens now could be a wise decision. This strategy
          ensures that you progressively save more on gas fees with each
          transaction, making your financial operations more cost-effective over
          time.
        </Text>
      </View>
    </ScrollView>
  );
};

export default PullDownPage;
