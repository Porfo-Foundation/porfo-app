import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppSelector} from '../../../redux/hooks';
import useCoinList from '../../../hooks/reactQuery/apiHooks/useCoinList';
import RenderHTML from 'react-native-render-html';

const {width} = Dimensions.get('screen');
export interface SelectedCardProps {
  coinDetails: any;
  coinId: any;
  onPress: () => void;
}

const AboutCoin = ({coinDetails, coinId, onPress}: SelectedCardProps) => {
  const [coinLogo, setCoinLogo] = useState(
    'https://gfa.nyc3.digitaloceanspaces.com/testapp/testdir/default.png',
  );
  const {data: coinList} = useCoinList();

  useEffect(() => {
    coinList?.map(coin => {
      if (coin.coinId === coinId) {
        setCoinLogo(coin.logoURI);
      }
    });
  }, [coinDetails, coinId]);
  const htmlData = {
    html: `
  <div style='color:white; font-size: 12px; text-align: justify;'>
    ${coinDetails?.description?.en}
  </div>`,
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      className="bg-[#0D2B59] rounded-lg mt-4 p-4">
      <View className="flex items-center flex-row gap-x-3">
        <Image source={{uri: `${coinLogo}`}} className="w-[37px] h-[37px]" />
        <Text className="font-[PlusJakartaSans-SemiBold] text-xl text-[#FFFFFF]">
          About {coinDetails?.name}
        </Text>
      </View>
      <Text className="font-[PlusJakartaSans-semiBold] text-xs mt-5 text-[#FFFFFF]">
        What is {coinDetails?.name} ({coinDetails?.symbol?.toUpperCase()})?
      </Text>
      {/* <Text className="font-[PlusJakartaSans-semiBold] text-xs mt-2 text-[#FFFFFF] text-justify">
        {coinDetails?.description?.en}
      </Text> */}
      <RenderHTML source={htmlData} contentWidth={width} />
    </TouchableOpacity>
  );
};

export default AboutCoin;
