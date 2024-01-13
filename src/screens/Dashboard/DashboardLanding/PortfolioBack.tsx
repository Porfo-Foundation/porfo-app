import React from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import CoinPnl from '../../../components/coindetails/CoinPnl';
import {ICoinBalance} from '../../../interfaces/main';
import InvestedAssets from './InvestedAssets';
import {showAmount} from '../../../helpers/showAmount';

const PortfolioBack = ({portfolioBalanceData, navigation}: any) => {
  const {
    balances,
    totalPnl,
    totalInvestedBalanceInUSD,
    totalCurrentBalanceInUSD,
  } = portfolioBalanceData;

  return (
    <View className="w-full h-screen/2">
      <View className="bg-[#382461] w-full p-2 pb-0">
        <View className="flex flex-row items-center ">
          <Image
            source={{
              uri: 'https://gfa.nyc3.digitaloceanspaces.com/testapp/testdir/default.png',
            }}
            className="w-8 h-8 mr-1"
          />
          <Text className="text-neutral-100">Main Wallet</Text>
        </View>
        <View className="flex flex-row w-full mt-2 justify-between">
          <View className="flex flex-col w-[50%]">
            <Text className="text-neutral-100 text-xs opacity-60">
              Today's Profit/Loss
            </Text>
            <View className="flex flex-row items-end gap-2 mt-1">
              <Text className="text-neutral-100 text-2xl font-bold">
                ${showAmount(totalCurrentBalanceInUSD)}
              </Text>
              {/* <Text className="text-neutral-100 opacity-50">+9.77%</Text> */}
              <CoinPnl pnlPercentage={totalPnl} />
            </View>
            <View className="flex flex-row mt-2">
              <View className="flex flex-col border-r-2 border-neutral-100 pr-2">
                <Text className="text-neutral-100 text-xs opacity-50">
                  Invested Value
                </Text>
                <Text className="text-neutral-100">
                  ${showAmount(totalInvestedBalanceInUSD)}
                </Text>
              </View>
              <View className="flex flex-col pl-2">
                <Text className="text-neutral-100 text-xs opacity-50">
                  Current Total
                </Text>
                <Text className="text-neutral-100">
                  ${showAmount(totalCurrentBalanceInUSD)}
                </Text>
              </View>
            </View>
          </View>
          <View className="flex flex-col w-[150px] h-[130px] justify-end items-end">
            <View className="flex flex-col -mb-14 mr-16 z-10">
              <Text className="text-neutral-100 text-[8px]">FUEL</Text>
              <Text className="text-neutral-100 text-[8px]">135,800</Text>
            </View>
            <Image
              source={require('../../../assets/images/fuel_porfo.png')}
              className="w-36 h-36"
            />
          </View>
        </View>
      </View>
      <View className="flex flex-row justify-between w-full mt-2 px-1">
        <TouchableOpacity className="w-[49%] h-12 justify-center items-center bg-[#382461] rounded-md">
          <Text className="text-neutral-100">BUY PORFO</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-[49%] h-12 justify-center items-center bg-[#9c467a] rounded-md"
          onPress={() => navigation.navigate('FillGasTank')}>
          <Text className="text-neutral-100">FILL GAS TANK</Text>
        </TouchableOpacity>
      </View>
      <Text className="text-neutral-100 text-2xl font-bold mt-2 ml-2">
        Notifications
      </Text>
      <View className="flex w-[96%] flex-row justify-between px-2 h-16 bg-primary-600 items-center self-center mt-3 rounded-md">
        <View>
          <Text className="text-neutral-100 text-xs">Refer and Earn</Text>
          <Text className="text-neutral-100 font-bold mt-1">
            Refer your friend and win PORFO
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('ReferAndEarn')}
          className="w-[100px] h-8 justify-center items-center bg-[#382461] rounded-md">
          <Text className="text-neutral-100">Refer Now</Text>
        </TouchableOpacity>
      </View>
      <View className="w-full h-[55%] mt-4">
        <Text className="text-neutral-100 text-lg ml-4">Invested Tokens</Text>
        <View className="w-full h-[100%]">
          <InvestedAssets balances={balances} />
        </View>
      </View>
    </View>
  );
};

export default PortfolioBack;
