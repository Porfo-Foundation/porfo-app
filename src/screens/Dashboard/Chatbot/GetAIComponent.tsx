import {Dimensions, View} from 'react-native';
import React from 'react';
import IndivisualCoinPrice from './IndivisualCoinPrice';
import FromChatPriceCard from './FromChatPriceCard';
import HistoricalPrice from './HistoricalPrice';
import SendRequest from './SendRequest';
import AssetsDetails from './AssetsDetails';
import CoinsAndTokens from './CoinsAndTokens';
import NewsMultiple from './NewsMultiple';
import NewsUpdates from './NewsUpdates';
import RenderHTML from 'react-native-render-html';
import Connect from './components/dapp/Connect';
import Txn from './components/dapp/Txn';

const {width} = Dimensions.get('screen');
const GetAIComponent = ({type, data, taskId, status}: any) => {
  if (!data) {
    return <View />;
  }
  switch (type) {
    case 'getCoinPriceByKeyword':
      return <IndivisualCoinPrice data={data} />;
    case 'getCoinDataByKeyword':
      return <FromChatPriceCard data={data} />;
    case 'getHistoricalPrice':
      return <HistoricalPrice data={data} />;
    case 'getSortedCoins':
      return <CoinsAndTokens data={data} />;
    case 'getNews':
      return <NewsUpdates data={data} />;
    case 'getAssets':
      return <AssetsDetails data={data} />;
    case 'generateTransaction':
      return <SendRequest data={data} />;
    case 'txn':
      return <Txn data={data} taskId={taskId} status={status} />;
    case 'connect':
      return <Connect data={data} taskId={taskId} status={status} />;

    default:
      if (data) {
        return (
          <View className="max-w-[80vw]">
            <RenderHTML
              contentWidth={width - 0.75}
              source={{
                html: `<div style="color : #FFFFFF; max-width : '70' "> ${data} </div>`,
              }}
            />
          </View>
        );
      }
  }
};

export default GetAIComponent;
