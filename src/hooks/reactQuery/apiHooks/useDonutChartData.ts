import {useQuery} from '@tanstack/react-query';
import {IPopulatedBalance} from '../../../interfaces/main';
import {ISelectedCoin} from '../../../interfaces/main';
import {colorData} from '../../../constants/colorData';

export default function useDonutChartData(
  assetData: IPopulatedBalance[],
  totalBalance: number,
) {
  // return useQuery({
  //   queryKey: ['donutChartData'],
  //   queryFn: async (): Promise<any> => {
  const donutChartData: ISelectedCoin[] = [];
  const pieData: any = [];
  assetData?.map((data: IPopulatedBalance, index: number) => {
    let percentageContribution = 0;
    if (totalBalance !== 0) {
      percentageContribution =
        (data?.value * data.coin.usdPrice * 100) / totalBalance;
    }
    donutChartData.push({
      coin: data.coin,
      percentage: '' + percentageContribution,
      amount: data.value,
      avgPrice: data.avgPrice,
    });
    pieData.push({
      value: Number(percentageContribution),
      color: colorData[index],
      text: percentageContribution,
    });
  });
  return {donutChartData, pieData, totalBalance};
  //   },
  //   retry: 2,
  // });
}
