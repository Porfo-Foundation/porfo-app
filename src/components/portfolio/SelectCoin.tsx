import {View, Text, Pressable} from 'react-native';
import React, {useState, SetStateAction, Dispatch} from 'react';
import GreenTick from '../../assets/icons/svg/green-tick.svg';

type propsType = {
  coinId: string;
  coinName: string;
  selectedCoins: Array<any>;
  setSelectedCoins: Dispatch<SetStateAction<any>>;
};
const SelectCoin = ({
  coinId,
  coinName,
  selectedCoins,
  setSelectedCoins,
}: propsType) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleSelection = () => {
    let indexOfCoin: number = -1;
    setIsSelected(!isSelected);
    for (let i = 0; i < selectedCoins.length; i++) {
      if (selectedCoins[i].id === coinId) {
        indexOfCoin = i;
      }
    }
    if (indexOfCoin !== -1) {
      selectedCoins.splice(indexOfCoin, 1);
    } else {
      selectedCoins.push({id: coinId, name: coinName, percentage: 0});
    }
    setSelectedCoins([...selectedCoins]);
    // console.log('inside selectCoin....Map', selectedCoinsMap);
  };

  return (
    <Pressable onPress={handleSelection}>
      <View
        className={`flex flex-row justify-between items-center w-full px-2 h-10 ${
          isSelected
            ? 'bg-accent-600 text-neutral-900'
            : 'bg-typography-secondary'
        }`}>
        <Text className="dark:text-neutral-200">{coinName}</Text>
        {isSelected ? <GreenTick width={24} height={28} /> : null}
      </View>
    </Pressable>
  );
};

export default SelectCoin;
