import {useQuery} from '@tanstack/react-query';
import {getCoinDetails} from '../../../apiCalls/coin';
export default function useCoinDetails(coinId: string) {
  return useQuery({
    queryKey: ['coinDetails'],
    queryFn: async (): Promise<any> => {
      const coinData = await getCoinDetails(coinId);
      return coinData;
    },
    retry: 2,
  });
}
