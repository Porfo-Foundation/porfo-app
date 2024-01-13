import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {ICoin, ICoinBalance} from '../../../interfaces/main';
import {EmptyCoin} from '../../../helpers/coin';
import CoinPnl from '../../../components/coindetails/CoinPnl';
import CoinLogoDown from '../../../components/coindetails/CoinLogoDown';
import {showAmount} from '../../../helpers/showAmount';
import {Table, TableWrapper, Cell} from 'react-native-table-component';
const InvestedAssets = ({balances}: {balances: ICoinBalance[]}) => {
  return (
    <View style={styles.container}>
      <Table borderStyle={{borderColor: 'transparent'}}>
        <TableWrapper style={styles.rowHeading}>
          <Cell
            data={
              <Text className="font-[PlusJakartaSans-semiBold] text-neutral-100">
                Holding
              </Text>
            }
          />
          <Cell
            data={
              <View className="flex flex-col w-[80px] justify-center items-center">
                <Text className="font-[PlusJakartaSans-semiBold] text-neutral-100">
                  Amount
                </Text>
                <Text className="font-[PlusJakartaSans-semiBold] text-neutral-100 text-xs">
                  (Initial)
                </Text>
              </View>
            }
          />
          <Cell
            style={{}}
            data={
              <View className="flex flex-col w-[80px] justify-center items-center">
                <Text className="font-[PlusJakartaSans-semiBold] text-neutral-100">
                  Profit/Loss
                </Text>
                <Text className="font-[PlusJakartaSans-semiBold] text-neutral-100 text-xs">
                  (%Change)
                </Text>
              </View>
            }
          />
        </TableWrapper>
      </Table>
      <ScrollView className="w-full h-full">
        <Table borderStyle={{borderColor: 'transparent'}}>
          {balances?.map((balance: ICoinBalance, index: number) => {
            const coin: ICoin =
              typeof balance?.coin === 'string' ? EmptyCoin : balance?.coin;
            const investedAmout = showAmount(
              balance?.value * balance?.avgPrice,
            );
            const currentAmount = showAmount(balance?.value * coin?.usdPrice);
            const profitOrLoss = showAmount(currentAmount - investedAmout);
            return (
              <TableWrapper style={styles.row} key={index}>
                <Cell
                  data={
                    <View className="flex flex-row w-[80px] justify-start items-center">
                      <CoinLogoDown
                        symbol={coin?.symbol}
                        chainId={coin?.chainId}
                      />
                      <View className="flex flex-col ml-2">
                        <Text className="font-[PlusJakartaSans-semiBold] text-neutral-100 text-md font-bold">
                          {coin?.name}
                        </Text>
                        <Text className="font-[PlusJakartaSans-semiBold] text-neutral-100 text-xs opacity-50">
                          {showAmount(balance?.value)} {coin?.symbol}
                        </Text>
                      </View>
                    </View>
                  }
                />
                <Cell
                  data={
                    <View className="flex flex-col w-[80px] justify-center items-center">
                      <Text className="font-[PlusJakartaSans-semiBold] text-neutral-100 text-md">
                        ${currentAmount}
                      </Text>
                      <Text className="font-[PlusJakartaSans-semiBold] text-neutral-100 text-xs opacity-50">
                        ${investedAmout}
                      </Text>
                    </View>
                  }
                />
                <Cell
                  style={{}}
                  data={
                    <View className="flex flex-col w-[80px] justify-center items-center">
                      <Text
                        className={`font-[PlusJakartaSans-semiBold] text-md ${
                          profitOrLoss < 0
                            ? 'text-semantic-error'
                            : 'text-semantic-success'
                        }`}>
                        ${profitOrLoss}
                      </Text>
                      <CoinPnl pnlPercentage={balance?.pnl} />
                    </View>
                  }
                />
              </TableWrapper>
            );
          })}
        </Table>
      </ScrollView>
    </View>
  );
};

export default InvestedAssets;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    border: '1px solid red',
  },
  head: {height: 40},
  text: {margin: 6},
  rowHeading: {
    flexDirection: 'row',
    justifyItem: 'center',
    marginTop: 2,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.32)',
  },
  row: {
    flexDirection: 'row',
    justifyItem: 'center',
    marginTop: 4,
  },
  btn: {width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2},
  btnText: {textAlign: 'center', color: '#fff'},
});
