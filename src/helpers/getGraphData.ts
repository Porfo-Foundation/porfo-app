export const getGraphData = (
  idToAmountValue: any,
  idToHistoricalPrice: any,
  transactions: any,
  coinAssets: any,
  timestampranges: any,
  timePeriod: any,
  isAllHoldingZero: any,
  setIsAllHoldingZero: any,
) => {
  const idToAmount = {...idToAmountValue};
  const tempArray = [];
  const startTimestamp = timestampranges[timePeriod]?.start;
  const endTimestamp = timestampranges[timePeriod]?.end;
  const interval = timestampranges[timePeriod]?.interval;
  const intervalDuration = (endTimestamp - startTimestamp) / interval;
  let previousTimestamp = Date.now();
  for (let i = endTimestamp; i >= startTimestamp; i -= intervalDuration) {
    let previousTxnHash = '';
    for (let j = 0; j < transactions?.length; j++) {
      // checking transaction and adjusting assets before this transaction accordingly
      const transaction = transactions[j];
      if (transaction.txTime >= i && transaction.txTime <= previousTimestamp) {
        if (previousTxnHash !== transaction.hash) {
          if (transaction.txnType === 'RECIEVE') {
            idToAmount[transaction?.coin?.id] =
              idToAmount[transaction?.coin?.id] - transaction.value;
          } else if (transaction.txnType === 'SEND') {
            idToAmount[transaction?.coin?.id] =
              idToAmount[transaction?.coin?.id] + transaction.value;
          }
          previousTxnHash = transaction.hash;
        }
      }
    }

    // calculating total of all holding after updating assets by transaction by above code
    let totalholdingAmount = 0;
    for (let j = 0; j < coinAssets?.length; j++) {
      let usdPrice = coinAssets[j].coin.usdPrice;
      if (coinAssets[j].value > 0) {
        const historicalPrice = idToHistoricalPrice[coinAssets[j].coin.id];
        // finding out price of coin at specific timestamp..
        for (let m = historicalPrice?.length - 1; m >= 0; m--) {
          if (
            historicalPrice[m][0] >= i &&
            historicalPrice[m][0] <= previousTimestamp
          ) {
            usdPrice = historicalPrice[m][1];
            break;
          }
        }
        const usdValue = idToAmount[coinAssets[j].coin.id] * usdPrice;
        // handling NaN
        if (isNaN(usdValue)) {
          totalholdingAmount += 0;
        } else {
          totalholdingAmount += idToAmount[coinAssets[j].coin.id] * usdPrice;
        }

        if (isAllHoldingZero) {
          setIsAllHoldingZero(false);
        }
      }
    }
    tempArray.push([i, totalholdingAmount]);
    // updating previous timestamp
    previousTimestamp = i;
  }
  // just push one data to see graph perfect
  tempArray.push([Date.now(), 0]);
  return tempArray.reverse();
};
