import {useEffect, useState} from 'react';
import {useQueries} from '@tanstack/react-query';
import {getAllportfolios} from '../../../apiCalls/portfolio';
import {IEoA, IPortfolio, IPortfolioAndEoas} from '../../../interfaces/main';
import {EmptyPortfolio} from '../../../helpers/portfolio';
import {getEOAs} from '../../../apiCalls/wallet';
import useCoinList from './useCoinList';

export default function usePortfoliosAndEOAs() {
  const [portfolioAndEoas, setPortfolioAndEoas] = useState<IPortfolioAndEoas[]>(
    [],
  );
  const {data: coinList} = useCoinList();
  const [portfoliosQuery, EOAsQuery] = useQueries({
    queries: [
      {
        queryKey: ['portfolios'],
        queryFn: async (): Promise<IPortfolio[]> => {
          const res = await getAllportfolios();
          return [...res?.portfolios, EmptyPortfolio];
        },
        retry: 2,
      },
      {
        queryKey: ['EOAs'],
        queryFn: async (): Promise<IEoA[]> => {
          const res = await getEOAs();
          return res?.EOAs;
        },
        retry: 2,
      },
    ],
  });

  useEffect(() => {
    if (portfoliosQuery.data && EOAsQuery.data && coinList) {
      const portfolios = portfoliosQuery.data;
      const EOAs = EOAsQuery.data;
      const EOAtoPortfolio: IPortfolioAndEoas[] = EOAs?.map(EOA => {
        return {
          name: EOA?.walletAddress,
          baseCoin: EmptyPortfolio.baseCoin,
          stableCoin: EmptyPortfolio.stableCoin,
          isWatchable: true,
          coins: EOA?.balances?.map(balance => {
            return {
              coin:
                coinList.find(listCoin => {
                  // eslint-disable-next-line eqeqeq
                  return listCoin.id == balance.coin;
                }) || EmptyPortfolio.coins[0].coin,
              percentage: '0',
              amount: balance.value,
              avgPrice: 0,
            };
          }),
        };
      });
      setPortfolioAndEoas([...EOAtoPortfolio, ...portfolios]);
    }
  }, [portfoliosQuery.data, EOAsQuery.data, coinList]);

  return {
    portfolios: portfoliosQuery.data,
    EOAs: EOAsQuery.data,
    portfolioAndEoas,
  };
}
