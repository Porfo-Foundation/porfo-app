import React from 'react';
import {View, Text, Image} from 'react-native';
import {useAppSelector} from '../../../redux/hooks';
import {colorThemes} from '../../../constants/themeData';

const NftDetails = () => {
  const {selectedTheme} = useAppSelector(state => state.selectedTheme);
  return (
    <View
      className="w-full h-[220px] flex flex-col justify-between rounded-md mt-5 border-2 border-[#272727] items-center py-2"
      style={{
        backgroundColor: colorThemes[selectedTheme]['background'],
      }}>
      <View className="w-[90%] h-[75%] flex flex-row border-b-2 border-[#272727]">
        <Image
          source={require('../../../assets/images/nft-profile-image.png')}
          className="w-[130px] h-[132px]"
          resizeMode="stretch"
        />
        <View className="h-[132px] flex flex-col justify-between ml-5">
          <View className="flex flex-row justify-between items-center">
            <Text
              className="font-bold font-[PlusJakartaSans-SemiBold] text-lg"
              style={{
                color: colorThemes[selectedTheme]['textPrimary'],
              }}>
              Pudgy Penguin
            </Text>
            <View className="flex flex-row ml-2">
              <Image
                source={require('../../../assets/images/nft-etherium.png')}
                className="w-6 h-6"
                resizeMode="stretch"
              />
              <Image
                source={require('../../../assets/images/nft-vector.png')}
                className="w-6 h-6"
                resizeMode="stretch"
              />
            </View>
          </View>
          <Text
            className="font-bold font-[PlusJakartaSans-SemiBold] opacity-50 text-lg"
            style={{
              color: colorThemes[selectedTheme]['textPrimary'],
            }}>
            #2522
          </Text>
        </View>
      </View>
      <View className="w-[90%] flex flex-row justify-between">
        <View className="flex flex-col justify-start items-start">
          <Text
            className="font-bold font-[PlusJakartaSans-SemiBold]"
            style={{
              color: colorThemes[selectedTheme]['textPrimary'],
            }}>
            Owner
          </Text>
          <Text
            className="font-bold font-[PlusJakartaSans-SemiBold] opacity-50"
            style={{
              color: colorThemes[selectedTheme]['textPrimary'],
            }}>
            Aditya.porfo
          </Text>
        </View>
        <View className="flex flex-col justify-start items-start">
          <Text
            className="font-bold font-[PlusJakartaSans-SemiBold]"
            style={{
              color: colorThemes[selectedTheme]['textPrimary'],
            }}>
            Last Offer
          </Text>
          <Text
            className="font-bold font-[PlusJakartaSans-SemiBold] opacity-50"
            style={{
              color: colorThemes[selectedTheme]['textPrimary'],
            }}>
            5.173 ETH
          </Text>
        </View>
        <View className="flex flex-col justify-start items-start">
          <Text
            className="font-bold font-[PlusJakartaSans-SemiBold]"
            style={{
              color: colorThemes[selectedTheme]['textPrimary'],
            }}>
            Floor Price
          </Text>
          <Text
            className="font-bold font-[PlusJakartaSans-SemiBold] opacity-50"
            style={{
              color: colorThemes[selectedTheme]['textPrimary'],
            }}>
            3.012 ETH
          </Text>
        </View>
      </View>
    </View>
  );
};

export default NftDetails;
