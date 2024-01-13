import React from 'react';
import {View, Image, Text} from 'react-native';
import CustomButton from '../../common/CustomButton';
import {useAppSelector} from '../../../redux/hooks';
import CoinLogo from '../CoinLogo';

const TradeRecomdetionPopup = () => {
  const {selectedCoin} = useAppSelector(state => state.main);
  return (
    <View className="flex-1 justify-end rounded-t-xl">
      <View className="flex h-1/3 bg-primary-600 p-10 gap-1 justify-center items-center">
        <View className="flex flex-row justify-center gap-5">
          <View className="w-[60px] h-[60px] justify-center items-center">
            <View className="w-[40px] h-[40px] border-2 dark:border-neutral-700 rounded-full justify-center items-center">
              <CoinLogo
                logoURI={selectedCoin?.coin?.logoURI!}
                chainId={selectedCoin?.coin.chainId}
              />
            </View>
            <Text className="dark:text-neutral-900">
              {selectedCoin?.coin.symbol}
            </Text>
          </View>
          <Image
            source={require('../../../assets/images/left-to-right-arrow.png')}
            className="w-[100px] h-[37px]"
          />
          <View className="w-[60px] h-[60px] justify-center items-center">
            <View className="w-[40px] h-[40px] border-2 dark:border-neutral-700 rounded-full justify-center items-center">
              <Image
                source={require('../../../assets/images/etherium-logo.png')}
                className="w-[37px] h-[37px]"
              />
            </View>
            <Text className="dark:text-neutral-900">{'ETH'}</Text>
          </View>
        </View>
        <View className="flex flex-row justify-center">
          <CustomButton
            color="black"
            text="Swap"
            onPress={async () => {}}
            bgColor="success"
          />
        </View>
      </View>
    </View>
  );
};

export default TradeRecomdetionPopup;
