import {View, Text, ScrollView, Dimensions, Pressable} from 'react-native';
import React, {useState} from 'react';
import DashboardLayout from '../DashboardLayout';
import Details from './Details';
import WalletCards from './WalletCards';
import WalletTable from './WalletTable';
import VenusTable from './VenusTable';
const {height} = Dimensions.get('screen');

import WalletSVG from '../../../assets/icons/svg/wallet.svg';

const AddNew = () => {
  const [contentVisible, setContentVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState<'wallet' | 'venus'>(
    'wallet',
  );
  const topComponent = {
    wallet: <WalletTable />,
    venus: <VenusTable />,
  };
  return (
    <DashboardLayout
      component={topComponent[selectedCard]}
      openContent={contentVisible}
      onCloseContent={() => setContentVisible(false)}>
      <View style={{height: height - 130}}>
        <ScrollView className="px-4 mt-4" nestedScrollEnabled>
          <Details />
          <WalletCards />
          <View className="flex-row gap-x-6 mt-4">
            <Pressable
              className="bg-[#344A71] flex-1 rounded-xl py-3 flex-row items-center justify-between px-4"
              onPress={() => {
                setSelectedCard('wallet');
                setContentVisible(true);
              }}>
              <WalletSVG />
              <Text className="font-[PlusJakartaSans-semiBold] text-[#FFFFFF] text-lg">
                Wallet
              </Text>
            </Pressable>
            <Pressable
              className="bg-[#344A71] flex-1 rounded-xl py-3 flex-row items-center justify-between px-4"
              onPress={() => {
                setSelectedCard('venus');
                setContentVisible(true);
              }}>
              <WalletSVG />
              <Text className="font-[PlusJakartaSans-semiBold] text-[#FFFFFF] text-lg">
                Venus
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </DashboardLayout>
  );
};

export default AddNew;
