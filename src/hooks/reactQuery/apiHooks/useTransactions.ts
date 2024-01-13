import {useQuery} from '@tanstack/react-query';
import {getAllTransactions} from '../../../apiCalls/wallet';
import {
  IPopulatedTransaction,
  ITransaction,
  IXChainTxn,
} from '../../../interfaces/main';
import useCoinList from './useCoinList';
import {EmptyCoin} from '../../../helpers/coin';

export default function useTransactions() {
  const {data: coinList} = useCoinList();

  return useQuery({
    queryKey: ['transactions'],
    queryFn: async (): Promise<{
      transactions: IPopulatedTransaction[];
      // xChainTransactions: IXChainTxn[];
      // transactions: any;
    }> => {
      const res = await getAllTransactions();
      res?.transactions.forEach((txn: ITransaction) => {
        const populatedCoin = coinList!.find(
          listCoin => listCoin.id === txn.coin,
        );
        txn.coin = populatedCoin ? populatedCoin : EmptyCoin;
      });

      const transactions = res.transactions;
      const xChainTransactions = res.xChainTransactions;
      const groupedTransactions = await combineTransactions(transactions);
      const crossSwapTransactions = await combineCrossSwaps(
        groupedTransactions,
        xChainTransactions,
      );
      // return res;
      return {transactions: crossSwapTransactions};
    },
    // Refetch the data every 10 second
    refetchInterval: 1000 * 5,
    retry: 2,
    enabled: !!coinList,
  });
}

const combineCrossSwaps = async (
  txns: IPopulatedTransaction[],
  xChainTransactions: any,
) => {
  if (txns.length === 0 || !xChainTransactions) {
    return txns;
  }

  for (const xChainTXn of xChainTransactions) {
    const sendTxnIndex = txns.findIndex(txn => {
      return txn?.hash === xChainTXn.lockHash && txn?.txnType === 'SEND';
    });
    if (sendTxnIndex === -1) {
      continue;
    }
    const receiveTxnIndex = txns.findIndex(
      txn => txn?.hash === xChainTXn.releaseHash && txn?.txnType === 'RECIEVE',
    );
    if (receiveTxnIndex === -1) {
      continue;
    }
    const sendTxn = txns[sendTxnIndex];
    delete txns[sendTxnIndex];

    const receiveTxn = txns[receiveTxnIndex];
    delete txns[receiveTxnIndex];
    if (sendTxn && receiveTxn) {
      const newTx = {
        ...sendTxn,
        txnType: 'CROSS-SWAP',
        fromCoin: sendTxn.coin,
        toCoin: receiveTxn.coin,
        fromValue: sendTxn.value,
        toValue: receiveTxn.value,
      };
      txns.push(newTx);
    }
  }
  return txns.sort((a, b) => {
    return b.txTime - a.txTime;
  });
};

function combineTransactions(txns: IPopulatedTransaction[]) {
  const hashGroups: Record<string, IPopulatedTransaction[]> = {};
  for (const txn of txns) {
    if (!hashGroups[txn.hash]) {
      hashGroups[txn.hash] = [];
    }
    hashGroups[txn.hash].push(txn);
  }
  const mergedTxs = [];
  for (const hash in hashGroups) {
    const group = hashGroups[hash];
    if (group.length === 2) {
      let sendTx = group.find(tx => tx.txnType === 'SEND');
      let receiveTx = group.find(tx => tx.txnType === 'RECIEVE');
      if (!sendTx || !receiveTx) {
        continue;
      }
      const newTx = {
        ...sendTx,
        txnType: 'SWAPPED',
        sendCoin: sendTx.coin,
        recieveCoin: receiveTx.coin,
        sendValue: sendTx.value,
        recieveValue: receiveTx.value,
      };
      mergedTxs.push(newTx);
    } else if (group.length === 1) {
      mergedTxs.push(group[0]);
    }
  }

  return mergedTxs;
}
