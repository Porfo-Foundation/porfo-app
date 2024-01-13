import {IPopulatedBalance} from '../../../interfaces/main';

import {IPortfolioAndEoas} from '../../../interfaces/main';
import {ISelectedCoin} from '../../../interfaces/main';

export default function usePortfolioAndEOAaBalances(
  selectedPortfolioAndEOAs: IPortfolioAndEoas,
  portfolioAndEOAsBalanceData: IPopulatedBalance[],
) {
  const coinList: ISelectedCoin[] = selectedPortfolioAndEOAs?.coins;
  const pnlsArray: number[] = [];
  const populatedBalances: IPopulatedBalance[] = [];
  const balancesData = portfolioAndEOAsBalanceData
    ? portfolioAndEOAsBalanceData
    : [];
  for (let i = 0; i < coinList?.length; i++) {
    const coin = coinList[i];
    const newBalance = {
      value: 0,
      symbol: coin.coin.symbol,
      receiveTxns: 0,
      avgPrice: 0,
      coin: coin.coin,
      pnl: 0,
    };
    const populatedCoin = balancesData?.find(balance => {
      return balance?.coin.id === coin.coin.id;
    });
    if (populatedCoin) {
      const currentPrice = coin?.coin?.usdPrice;
      let pnlPercentage = 0;
      if (populatedCoin.value !== 0) {
        pnlPercentage = Number(
          (
            ((currentPrice - populatedCoin.avgPrice) / populatedCoin.avgPrice) *
            100
          ).toFixed(2),
        );
      }

      //Populate the newBalance object with current price , coin  and pnl
      newBalance.value = populatedCoin.value;
      newBalance.avgPrice = populatedCoin?.avgPrice;
      newBalance.pnl = pnlPercentage;
      if (pnlPercentage !== 0) {
        pnlsArray.push(pnlPercentage);
      }
    }
    populatedBalances.push(newBalance);
  }

  let totalPnl = 0;
  if (pnlsArray?.length > 0) {
    totalPnl = pnlsArray.reduce((a, b) => a + b, 0) / pnlsArray.length;
  }

  const totalInvestedBalanceInUSD = populatedBalances?.reduce(
    (a, b) => a + b.value * b.avgPrice,
    0,
  );
  const totalCurrentBalanceInUSD = populatedBalances?.reduce(
    (a, b) => a + b.value * b.coin.usdPrice,
    0,
  );
  return {
    balances: populatedBalances,
    totalPnl,
    totalInvestedBalanceInUSD,
    totalCurrentBalanceInUSD,
  };
}
