import {useQuery} from '@tanstack/react-query';
import {getCoinNews} from '../../../apiCalls/coin';
import {ICoinNews} from '../../../interfaces/coinNews';
export default function useCoinNews(coinSymbol: string) {
  return useQuery({
    queryKey: ['coinNews'],
    queryFn: async (): Promise<ICoinNews[]> => {
      const coinNews = await getCoinNews(coinSymbol);
      return coinNews;
    },
    retry: 2,
  });
}
