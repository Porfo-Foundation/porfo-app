/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Pressable,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import PortfolioDetailed from './PortfolioDetailed';
import Doughnut from '../../../assets/icons/svg/doughnut-chart.svg';
import Bar from '../../../assets/icons/svg/bar-chart.svg';
import {getCoinHistoricalPrice} from '../../../apiCalls/coin';
import {getGraphData} from '../../../helpers/getGraphData';
import {getStartEndTimestamp} from '../../../utils/getStartEndTimestamp';
import LineGraph from '../../Onboarding/LineGraph';
import useTransactions from '../../../hooks/reactQuery/apiHooks/useTransactions';
import { ToastShowShort } from '../../../utils/toast';

const {width} = Dimensions.get('screen');
const PortfolioSection = ({coinAssets, totalBalance}: any) => {
  const {data: transactionsData} = useTransactions();
  const timestampranges: any = getStartEndTimestamp(Date.now());
  const [showGraph, setShowGraph] = useState(true);
  const [selectedTimeline, setSelectedTimeline] = useState('1H');
  const [graphTab, setGraphTab] = useState(true);
  const [idToAmountValue, setIdToAmountValue] = useState<any>({});
  const [idToHistoricalPrice, setIdToHistoricalPrice] = useState<any>({});
  const [graphData, setGraphData] = useState<any>([]);
  const [isAllHoldingZero, setIsAllHoldingZero] = useState(true);

  useEffect(() => {
    setShowGraph(false);
    setSelectedTimeline('');
    console.log('inside useEffect.....portfoliosecton...');
    const collectInformation = async () => {
      try {
        let count = 0;
        const idAmount = {};
        const idPrice = {};
        for (let i = 0; i < coinAssets?.length; i++) {
          if (
            coinAssets[i].coin.id !== undefined &&
            coinAssets[i].coin.coinId !== undefined
          ) {
            idAmount[coinAssets[i].coin.id] = coinAssets[i].value;
            const responseData = await getCoinHistoricalPrice(
              coinAssets[i].coin.coinId,
            );
            idPrice[coinAssets[i].coin.id] = responseData.prices;
          }
          // initialize graphData for
          setIdToAmountValue({...idAmount});
          setIdToHistoricalPrice({...idPrice});
          count += 1;
          if (count === coinAssets.length) {
            setSelectedTimeline('1H');
            // findGraphData();
          }
        }
      } catch (error) {
        console.log('inside portfoliosection....', error);
        ToastShowShort('' + error);
      }
    };
    collectInformation();
  }, [coinAssets]);

  // fetching graph data first time
  useEffect(() => {
    findGraphData('1H');
  }, [selectedTimeline !== '']);

  const findGraphData = async (timeline: string) => {
    console.log('inside findGraphData...');
    setShowGraph(false);
    try {
      const data = await getGraphData(
        idToAmountValue,
        idToHistoricalPrice,
        transactionsData?.transactions,
        coinAssets,
        timestampranges,
        timeline,
        isAllHoldingZero,
        setIsAllHoldingZero,
      );
      // console.log('graph data portfolio sectoin...', data);
      setGraphData(data);
      setShowGraph(true);
    } catch (error) {
      console.log('inside findgraphdata ... error..', error);
      setIsAllHoldingZero(true);
      // setShowGraph(true);
    }
  };

  const timelines: Array<any> = [
    {
      name: '1H',
    },
    {
      name: '1D',
    },
    {
      name: '1W',
    },
    {
      name: '1M',
    },
    {
      name: '1Y',
    },
    {
      name: 'All',
    },
  ];

  return (
    <View style={{width: width}} className="flex flex-col h-[200px]">
      {/* <View className="w-full justify-center items-end pr-4"> */}
      <TouchableOpacity
        onPress={() => setGraphTab(!graphTab)}
        className="ml-auto mr-4 z-30">
        {graphTab ? (
          <Doughnut width={25} height={25} />
        ) : (
          <Bar width={25} height={25} />
        )}
      </TouchableOpacity>
      {/* </View> */}
      <Pressable>
        {graphTab ? (
          <View>
            <View className="w-full h-[80%]">
              {/* <AnimatedArea data={graphData} /> */}
              <LineGraph
                graphData={graphData}
                isAllHoldingZero={isAllHoldingZero}
                showGraph={showGraph}
              />
            </View>
            <View className="flex flex-row justify-evenly my-2">
              {timelines?.map((timeline: any, index) => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  key={index}
                  onPress={() => {
                    setSelectedTimeline(timeline.name);
                    findGraphData(timeline.name);
                  }}>
                  <Text
                    className={`font-[PlusJakartaSans-semiBold] text-base ${
                      selectedTimeline === timeline.name
                        ? 'text-[#453DE0]'
                        : 'text-[#FFFFFF]'
                    }`}>
                    {timeline.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : (
          <PortfolioDetailed
            coinAssets={coinAssets}
            totalBalance={totalBalance}
          />
        )}
      </Pressable>
    </View>
  );
};

export default PortfolioSection;
