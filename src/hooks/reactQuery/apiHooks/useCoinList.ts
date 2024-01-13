import {useQuery} from '@tanstack/react-query';
import {ICoin} from '../../../interfaces/main';
import {getAllCoins} from '../../../apiCalls/coin';

export default function useCoinList() {
  return useQuery({
    queryKey: ['coinList'],
    queryFn: async (): Promise<ICoin[]> => {
      const res = await getAllCoins();
      return res.coins;
    },
    retry: 2,
    // Refetch CoinList every 24 hours
    staleTime: 1000 * 60,
  });
}
