/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {View, Image} from 'react-native';
import {colorData} from '../../../constants/colorData';
import {ISelectedCoin} from '../../../interfaces/main';

type progressType = {
  selectedCoins: ISelectedCoin[];
};
const ProgressBar = ({selectedCoins}: progressType) => {
  return (
    <View
      style={{width: `${100}%`}}
      className="flex flex-row h-[5px] items-center bg-[#999999]">
      {selectedCoins?.map((coinDetail: ISelectedCoin, index: number) => (
        <Progress
          key={index}
          coinLogo={coinDetail?.coin?.logoURI}
          percentageValue={coinDetail?.percentage}
          index={index}
        />
      ))}
    </View>
  );
};

export default ProgressBar;

type propsType = {
  coinLogo: string;
  percentageValue: number;
  index: number;
};

const Progress = ({coinLogo, percentageValue, index}: propsType) => {
  const [widthPercentage, setWidthPercentage] = useState<number>(0);
  useEffect(() => {
    setWidthPercentage(percentageValue);
  }, [percentageValue]);
  return (
    <View
      style={{
        width: `${widthPercentage}%`,
        backgroundColor: `${colorData[index]}`,
      }}
      className={`h-[5px] ${
        index % 2 === 0 ? 'justify-start' : 'justify-end'
      }`}>
      <View
        className={`w-5 h-10 flex ${
          index % 2 === 0 ? 'flex-col' : 'flex-col-reverse'
        } justify-between items-center self-end`}>
        <View
          className={'w-[1px] h-5'}
          style={{backgroundColor: `${colorData[index]}`}}
        />
        <Image source={{uri: coinLogo}} className="w-4 h-4 rounded-full" />
      </View>
    </View>
  );
};
