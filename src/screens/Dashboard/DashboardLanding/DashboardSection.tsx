/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Pressable,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import DashboardDetails from './DashboardDetails';
import Doughnut from '../../../assets/icons/svg/doughnut-chart.svg';
import Bar from '../../../assets/icons/svg/bar-chart.svg';
import {getCoinHistoricalPrice} from '../../../apiCalls/coin';
import {getStartEndTimestamp} from '../../../utils/getStartEndTimestamp';
import LineGraph from '../../Onboarding/LineGraph';
import {getGraphData} from '../../../helpers/getGraphData';
import useTransactions from '../../../hooks/reactQuery/apiHooks/useTransactions';
import {colorThemes} from '../../../constants/themeData';
import {useAppSelector} from '../../../redux/hooks';
import {ToastShowShort} from '../../../utils/toast';
const {width} = Dimensions.get('screen');

const DashboardSection = ({coinAssets, totalBalance}: any) => {
  const {data: transactionsData} = useTransactions();
  const timestampranges: any = getStartEndTimestamp(Date.now());
  const [idToAmountValue, setIdToAmountValue] = useState<any>({});
  const [idToHistoricalPrice, setIdToHistoricalPrice] = useState<any>({});
  const [graphData, setGraphData] = useState<any>([]);
  const [selectedTimeline, setSelectedTimeline] = useState('');
  const [graphTab, setGraphTab] = useState(true);
  const [showGraph, setShowGraph] = useState(true);
  const [isAllHoldingZero, setIsAllHoldingZero] = useState(true);
  const {selectedTheme} = useAppSelector(state => state.selectedTheme);

  useEffect(() => {
    setShowGraph(false);
    setSelectedTimeline('');
    const collectInformation = async () => {
      try {
        let count = 0;
        const idAmount: any = {};
        const idPrice: any = {};
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
        console.log('inside dashboardsection....error', error);
        setShowGraph(true);
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
      // console.log('graph data.dashboard section...', data);
      setGraphData(data);
      setShowGraph(true);
    } catch (error) {
      console.log('inside findgraphdata dashboardsection ... error..', error);
      setIsAllHoldingZero(true);
      setShowGraph(true);
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
    <View style={{width: width}} className="flex flex-col h-[250px]">
      {/* <TouchableOpacity
        onPress={() => setGraphTab(!graphTab)}
        className="ml-auto mr-4 z-30">
        {graphTab ? (
          <Doughnut width={25} height={25} />
        ) : (
          <Bar width={25} height={25} />
        )}
      </TouchableOpacity> */}
      <View className="mt-5">
        {graphTab ? (
          <View className="w-screen">
            <View className="w-full h-[77%]">
              <LineGraph
                graphData={graphData}
                isAllHoldingZero={isAllHoldingZero}
                showGraph={showGraph}
              />
            </View>
          </View>
        ) : (
          <DashboardDetails
            coinAssets={coinAssets}
            totalBalance={totalBalance}
          />
        )}
      </View>
      <View className="my-2 flex-row items-center">
        <View className="flex-1">
          {graphTab && (
            <View className="flex flex-row justify-evenly">
              {timelines?.map((timeline: any, index) => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  className="px-2"
                  key={index}
                  onPress={() => {
                    setSelectedTimeline(timeline.name);
                    findGraphData(timeline.name);
                  }}>
                  <Text
                    className={`font-[PlusJakartaSans-Bold] text-base`}
                    style={{
                      color:
                        selectedTimeline === timeline.name
                          ? colorThemes[selectedTheme]['textSecondary']
                          : colorThemes[selectedTheme]['graphTimelineInactive'],
                    }}>
                    {timeline.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        <View
          className="flex-row mr-4 gap-x-1 rounded-full"
          style={{
            backgroundColor: colorThemes[selectedTheme]['buttonBackground'],
          }}>
          {graphTab ? (
            <View className="flex flex-row justify-evenly">
              <TouchableOpacity
                className="p-3 rounded-full"
                style={{
                  backgroundColor: colorThemes[selectedTheme]['textSecondary'],
                }}>
                <Image
                  source={colorThemes[selectedTheme]['chartIcon']}
                  className="w-3 h-3"
                />
              </TouchableOpacity>
              <TouchableOpacity
                className="p-3 rounded-full"
                onPress={() => setGraphTab(false)}>
                <Image
                  source={colorThemes[selectedTheme]['donutIcon']}
                  className="w-3 h-3"
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View className="flex flex-row justify-evenly">
              <TouchableOpacity
                className="p-3 rounded-full"
                onPress={() => setGraphTab(true)}>
                <Image
                  source={colorThemes[selectedTheme]['chartIcon']}
                  className="w-3 h-3"
                />
              </TouchableOpacity>
              <TouchableOpacity
                className="p-3 rounded-full"
                style={{
                  backgroundColor: colorThemes[selectedTheme]['textSecondary'],
                }}>
                <Image
                  source={colorThemes[selectedTheme]['donutIcon']}
                  className="w-3 h-3"
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default DashboardSection;
