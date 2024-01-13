import { View, Text, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import HistoryCard from './HistoryCard';
import DashboardLayout from '../DashboardLayout';
import { getDate } from '../../../utils/getDate';
import useTransactions from '../../../hooks/reactQuery/apiHooks/useTransactions';
import { IPopulatedTransaction } from '../../../interfaces/main';
import Loader from '../../../components/common/Loader';
import { colorThemes } from '../../../constants/themeData';
import { useAppSelector } from '../../../redux/hooks';
import BottomBarBack from '../../../components/common/BottomBarBack';

let previousDate = '';
let isNewDate = true;
const History = ({ navigation }: any) => {
  const { selectedTheme } = useAppSelector(state => state.selectedTheme);
  const { data: transactionsData, isLoading, isError } = useTransactions();
  if (isLoading || isError) {
    return <Loader />;
  }
  const transactions = transactionsData.transactions;
  // const xChainTransactions = transactionsData.xChainTransactions;
  // console.log(transactions, 'TRANSACTIONS');

  // function combineCrossSwaps(txns: IPopulatedTransaction[]) {
  //   if (txns.length === 0 || !xChainTransactions) {
  //     return txns;
  //   }

  //   for (const xChainTXn of xChainTransactions) {
  //     const sendTxnIndex = txns.findIndex(txn => {
  //       return txn?.hash === xChainTXn.lockHash && txn?.txnType === 'SEND';
  //     });
  //     if (sendTxnIndex === -1) {
  //       continue;
  //     }
  //     const receiveTxnIndex = txns.findIndex(
  //       txn =>
  //         txn?.hash === xChainTXn.releaseHash && txn?.txnType === 'RECIEVE',
  //     );
  //     if (receiveTxnIndex === -1) {
  //       continue;
  //     }
  //     const sendTxn = txns[sendTxnIndex];
  //     delete txns[sendTxnIndex];

  //     const receiveTxn = txns[receiveTxnIndex];
  //     delete txns[receiveTxnIndex];
  //     if (sendTxn && receiveTxn) {
  //       const newTx = {
  //         ...sendTxn,
  //         txnType: 'CROSS-SWAP',
  //         fromCoin: sendTxn.coin,
  //         toCoin: receiveTxn.coin,
  //         fromValue: sendTxn.value,
  //         toValue: receiveTxn.value,
  //       };
  //       txns.push(newTx);
  //     }
  //   }
  //   return txns.sort((a, b) => {
  //     return b.txTime - a.txTime;
  //   });
  // }

  // function combineTransactions(txns: IPopulatedTransaction[]) {
  //   const hashGroups: Record<string, IPopulatedTransaction[]> = {};
  //   for (const txn of txns) {
  //     if (!hashGroups[txn.hash]) {
  //       hashGroups[txn.hash] = [];
  //     }
  //     hashGroups[txn.hash].push(txn);
  //   }
  //   const mergedTxs = [];
  //   for (const hash in hashGroups) {
  //     const group = hashGroups[hash];
  //     if (group.length === 2) {
  //       let sendTx = group.find(tx => tx.txnType === 'SEND');
  //       let receiveTx = group.find(tx => tx.txnType === 'RECIEVE');
  //       if (!sendTx || !receiveTx) {
  //         continue;
  //       }
  //       const newTx = {
  //         ...sendTx,
  //         txnType: 'SWAPPED',
  //         sendCoin: sendTx.coin,
  //         recieveCoin: receiveTx.coin,
  //         sendValue: sendTx.value,
  //         recieveValue: receiveTx.value,
  //       };
  //       mergedTxs.push(newTx);
  //     } else if (group.length === 1) {
  //       mergedTxs.push(group[0]);
  //     }
  //   }

  //   return mergedTxs;
  // }

  // const groupedTransactions = combineTransactions(transactions);
  // const crossSwapTransactions = combineCrossSwaps(groupedTransactions);

  return (
    <View className="h-full w-full">
      <BottomBarBack />
      <ScrollView className="h-full px-4 py-4">
        <View className="w-full flex flex-row justify-between items-center">
          <Text
            className={
              'font-[PlusJakartaSans-semiBold] text-xl font-bold text-[#FFFFFF] ml-1'
            }>
            History
          </Text>
          {/* <Image
            source={require('../../../assets/images/filter-new.png')}
            className="w-5 h-5"
          /> */}
        </View>
        <View className="mt-2">
          {transactions?.length === 0 ? (
            <Text className="text-neutral-100 text-xl self-center mt-[60%]">
              No Transactions Found
            </Text>
          ) : null}
          {transactions?.map((transaction, index: number) => {
            const date = getDate(transaction.txTime);
            if (previousDate !== date) {
              previousDate = date;
              isNewDate = true;
            } else {
              isNewDate = false;
            }
            return (
              <View key={index}>
                {isNewDate && (
                  <Text
                    style={{ color: colorThemes[selectedTheme].textTertiary }}
                    className="mt-3 font-[PlusJakartaSans-SemiBold]">
                    {date}
                  </Text>
                )}
                <HistoryCard
                  transaction={transaction}
                  navigation={navigation}
                />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
    // </DashboardLayout>
  );
};

export default History;
