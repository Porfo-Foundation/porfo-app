import React from 'react';
import CrossSwapCard from './components/CrossSwapCard';
import SimpleSwapCard from './components/SimpleSwapCard';
import TrxnCard from './components/TrxnCard';

const HistoryCard = ({
  transaction,
  navigation,
}: {
  transaction: any;
  navigation: any;
}) => {
  if (transaction?.txnType === 'CROSS-SWAP') {
    return <CrossSwapCard transaction={transaction} />;
  } else if (transaction?.txnType === 'SWAPPED') {
    return <SimpleSwapCard transaction={transaction} />;
  }

  return <TrxnCard transaction={transaction} navigation={navigation} />;
};

export default HistoryCard;
