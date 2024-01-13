// import {useContext} from 'react';
import {useQuery} from '@tanstack/react-query';
import {getWalletBalances} from '../../../apiCalls/wallet';
import {
  IBalanceData,
  // ICoinBalance,
  IPopulatedBalance,
} from '../../../interfaces/main';
import useCoinList from './useCoinList';
import {EmptyCoin} from '../../../helpers/coin';
import {ICoinBalance} from '../../../interfaces/main';
// import {WalletContext} from '../../../context/WalletContext';

export default function useBalances() {
  const {data: coinList} = useCoinList();

  // //Use This to get the balances from SmartAccount
  // const {smartAccount} = useContext(WalletContext);
  // const getSmartAccountBalances = async () => {
  //   const tokenBalances = await smartAccount?.getAlltokenBalances({
  //     chainId: 5,
  //     eoaAddress: smartAccount.address,
  //     tokenAddresses: coinList?.map(coin => coin.address) || [],
  //   });
  //   console.log('Token Balances', tokenBalances);
  // };

  return useQuery({
    queryKey: ['balances'],
    queryFn: async (): Promise<IBalanceData> => {
      const res = await getWalletBalances();

      const pnlsArray: number[] = [];

      const populatedBalances: IPopulatedBalance[] = [];
      for (const balance of res?.balances) {
        const newBalance = balance as IPopulatedBalance;
        //populate coin
        const populatedCoin = coinList!.find(
          listCoin => listCoin.id === balance.coin,
        );
        const coin = populatedCoin ? populatedCoin : EmptyCoin;

        //calculate pnl

        if (coin) {
          const currentPrice = coin.usdPrice;
          let pnlPercentage = 0;
          if (newBalance.value !== 0) {
            pnlPercentage = Number(
              ((currentPrice - newBalance.avgPrice) / newBalance.avgPrice) *
                100,
            );
          }

          //Populate the newBalance object with current price , coin  and pnl
          newBalance.coin = coin;
          newBalance.pnl = pnlPercentage;
          if (pnlPercentage !== 0) {
            pnlsArray.push(pnlPercentage);
          }
          populatedBalances.push(newBalance);
        }
      }
      //Calculate total pnl and Balance
      const totalPnl = pnlsArray.reduce((a, b) => a + b, 0) / pnlsArray.length;
      const totalInvestedBalanceInUSD = populatedBalances?.reduce(
        (a, b) => a + b.value * b.avgPrice,
        0,
      );
      const totalCurrentBalanceInUSD = populatedBalances?.reduce(
        (a, b) => a + b.value * b.coin.usdPrice,
        0,
      );

      // arrange populatedBalance in descending order

      return {
        balances: populatedBalances?.sort(
          (a: ICoinBalance, b: ICoinBalance) =>
            b?.value * b?.coin?.usdPrice - a?.value * a?.coin?.usdPrice,
        ),
        totalPnl,
        totalInvestedBalanceInUSD,
        totalCurrentBalanceInUSD,
      };
    },
    // Refetch the data every 20 second
    refetchInterval: 1000 * 10,
    retry: 2,
    enabled: !!coinList,
  });
}
