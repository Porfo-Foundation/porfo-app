import {useInfiniteQuery} from '@tanstack/react-query';
import {getQueries} from '../../../apiCalls/aichat';

export default function useAIChats() {
  return useInfiniteQuery({
    queryKey: ['AIChats'],
    queryFn: async ({pageParam = 0}) => {
      const chatData = await getQueries(pageParam);
      return chatData;
    },
    getNextPageParam: lastPage => lastPage.nextCursor ?? undefined,
    getPreviousPageParam: firstPage => firstPage.previousCursor ?? undefined,
    retry: 2,
    // refetchInterval: 1000,
  });
}
