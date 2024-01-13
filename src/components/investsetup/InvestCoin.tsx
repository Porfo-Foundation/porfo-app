import {TextInput, View, Text, ToastAndroid} from 'react-native';
import React, {useState, Dispatch, SetStateAction} from 'react';
import { ToastShowShort } from '../../utils/toast';

type propsType = {
  coinName: string;
  percetageValue: number;
  setPercentageValue: Dispatch<SetStateAction<number>>;
  selectedCoinList: Array<any>;
};
const InvestCoin = ({
  coinName,
  percetageValue,
  setPercentageValue,
  selectedCoinList,
}: propsType) => {
  const [txtData, setTxtData] = useState(percetageValue);

  const handleChange = (inputPercentage: number) => {
    let sum = 0;
    let index = -1;
    if (isNaN(inputPercentage)) {
      for (let i = 0; i < selectedCoinList.length; i++) {
        if (selectedCoinList[i].name !== coinName) {
          sum += parseFloat(selectedCoinList[i].percentage);
        } else {
          selectedCoinList[i].percentage = 0;
        }
      }
      setPercentageValue(sum);
      setTxtData(0);
      return;
    }

    for (let i = 0; i < selectedCoinList.length; i++) {
      if (selectedCoinList[i].name !== coinName) {
        sum += parseFloat(selectedCoinList[i].percentage);
      } else {
        index = i;
      }
    }

    if (sum + inputPercentage > 100) {
      setTxtData(100 - sum);
      setPercentageValue(100);
      selectedCoinList[index].percentage = 100 - sum;
      return ToastShowShort(
        'Total contribution can not be more than 100%'
      );
    } else {
      selectedCoinList[index].percentage = inputPercentage;
      setTxtData(inputPercentage);
      setPercentageValue(sum + inputPercentage);
    }
  };

  return (
    <View className="flex flex-row justify-between items-center border-2 border-neutral-300 dark:border-neutral-700 rounded-md px-1">
      <Text className="dark:text-neutral-200">{coinName}</Text>
      <View className="w-[40%] flex flex-row justify-between items-center">
        <TextInput
          className="w-[90%] h-10 border-2 border-neutral-300 rounded-md px-2 text-neutral-0 dark:border-neutral-700  "
          placeholder="in %"
          placeholderTextColor={'#9CA3AF'}
          value={'' + txtData}
          onChangeText={text => handleChange(parseFloat(text))}
          keyboardType="numeric"
        />
        <Text className="dark:border-neutral-200 dark:text-neutral-200">
          {'%'}
        </Text>
      </View>
    </View>
  );
};

export default InvestCoin;
