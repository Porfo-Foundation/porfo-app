import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native';
import React, {useState, useEffect, Dispatch, SetStateAction} from 'react';
import {ISelectedCoin} from '../../../interfaces/main';
import Slider from '@react-native-community/slider';
import DeleteIcon from '../../../assets/icons/svg/delete.svg';
import LockedIcon from '../../../assets/icons/svg/locked.svg';
import UnLockedIcon from '../../../assets/icons/svg/unlocked.svg';
import {ToastShowShort} from '../../../utils/toast';

type inputType = {
  data: ISelectedCoin;
  setPercentageValue: Dispatch<SetStateAction<number>>;
  selectedCoins: ISelectedCoin[];
  lockedCoin: string[];
  setLockedCoin: Dispatch<SetStateAction<string[]>>;
  index: number;
  selectedCoinDetails: ISelectedCoin[];
  setSelectedCoinDetails: Dispatch<SetStateAction<ISelectedCoin[]>>;
  disableAllSlider: boolean;
  setDisableAllSlider: Dispatch<SetStateAction<boolean>>;
};

const InvestmentCard = ({
  data,
  setPercentageValue,
  selectedCoins,
  lockedCoin,
  setLockedCoin,
  index,
  selectedCoinDetails,
  setSelectedCoinDetails,
  disableAllSlider,
  setDisableAllSlider,
}: inputType) => {
  const chainMap = {
    1: {
      symbol: 'ETH',
      image: require('../../../assets/images/ETH.png'),
    },
    56: {
      symbol: 'BSC',
      image: require('../../../assets/images/BSC.png'),
    },
    137: {
      symbol: 'MATIC',
      image: require('../../../assets/images/MATIC.png'),
    },
  };

  const [txtData, setTxtData] = useState<number>(
    parseFloat(selectedCoinDetails[index]?.percentage),
  );
  const [currentValue, setCurrentValue] = useState<number>(
    parseFloat(data?.percentage),
  );
  const [percentageMap, setPercentageMap] = useState(new Map<string, number>());

  useEffect(() => {
    setTxtData(parseFloat(selectedCoinDetails[index].percentage));
  }, [selectedCoinDetails, index]);

  //slider changes...
  const handleSliderChange = (value: number) => {
    const tempArray = [];
    let avgChange =
      (currentValue - value) /
      (selectedCoinDetails.length - (lockedCoin.length + 1));
    for (let i = 0; i < selectedCoinDetails.length; i++) {
      if (
        selectedCoinDetails[i].coin.address !== data.coin.address ||
        !lockedCoin.includes(selectedCoinDetails[i].coin.address)
      ) {
        if (
          parseFloat(percentageMap.get(selectedCoinDetails[i].coin.address)) +
            avgChange <
          0
        ) {
          setDisableAllSlider(true);
          return;
        }
      }
    }

    //storing value in array
    for (let i = 0; i < selectedCoinDetails.length; i++) {
      if (selectedCoinDetails[i].coin.address === data.coin.address) {
        tempArray.push({
          coin: data.coin,
          percentage: value.toFixed(2),
          amount: 0,
          avgPrice: 0,
        });
      } else if (lockedCoin.includes(selectedCoinDetails[i].coin.address)) {
        tempArray.push(selectedCoinDetails[i]);
      } else {
        tempArray.push({
          coin: selectedCoinDetails[i].coin,
          percentage: (
            parseFloat(percentageMap.get(selectedCoinDetails[i].coin.address)) +
            avgChange
          ).toFixed(2),
          amount: 0,
          avgPrice: 0,
        });
      }
    }
    setSelectedCoinDetails([...tempArray]);

    setTxtData(parseFloat(value.toFixed(2)));
  };

  // saving current value
  const handleSliderStart = (value: number) => {
    let sum = 0;
    for (let i = 0; i < selectedCoinDetails.length; i++) {
      if (selectedCoinDetails[i].coin.address !== data.coin.address) {
        sum += parseFloat(selectedCoinDetails[i].percentage);
      }
    }
    setCurrentValue(100 - sum);
    setTxtData(parseFloat((100 - sum).toFixed(2)));
    setDisableAllSlider(false);
    setPercentageMap(new Map());
    for (let i = 0; i < selectedCoinDetails.length; i++) {
      percentageMap.set(
        selectedCoinDetails[i].coin.address,
        parseFloat(selectedCoinDetails[i].percentage),
      );
      setPercentageMap(percentageMap);
    }
  };

  const handleFocus = (value: number) => {
    setCurrentValue(txtData);
    setPercentageMap(new Map());
    for (let i = 0; i < selectedCoinDetails.length; i++) {
      percentageMap.set(
        selectedCoinDetails[i].coin.address,
        parseFloat(selectedCoinDetails[i].percentage),
      );
      setPercentageMap(percentageMap);
    }
  };

  const handleInputChange = (value: number) => {
    const tempArray = [];
    if (isNaN(value)) {
      const avgChange =
        (currentValue - 0) /
        (selectedCoinDetails.length - (lockedCoin.length + 1));
      for (let i = 0; i < selectedCoinDetails.length; i++) {
        if (selectedCoinDetails[i].coin.address === data.coin.address) {
          tempArray.push({
            coin: data.coin,
            percentage: 0,
            amount: 0,
            avgPrice: 0,
          });
        } else if (lockedCoin.includes(selectedCoinDetails[i].coin.address)) {
          tempArray.push(selectedCoinDetails[i]);
        } else {
          if (
            parseFloat(
              percentageMap.get(selectedCoinDetails[i].coin.address) +
                avgChange,
            ) < 0
          ) {
            return ToastShowShort('maximum limit achieved');
          }
          tempArray.push({
            coin: selectedCoinDetails[i].coin,
            percentage: (
              parseFloat(
                percentageMap.get(selectedCoinDetails[i].coin.address),
              ) + avgChange
            ).toFixed(2),
            amount: 0,
            avgPrice: 0,
          });
        }
      }
      setTxtData(0);
    } else {
      const avgChange =
        (currentValue - value) /
        (selectedCoinDetails.length - (lockedCoin.length + 1));
      for (let i = 0; i < selectedCoinDetails.length; i++) {
        if (selectedCoinDetails[i].coin.address === data.coin.address) {
          tempArray.push({
            coin: data.coin,
            percentage: value.toFixed(2),
            amount: 0,
            avgPrice: 0,
          });
        } else if (lockedCoin.includes(selectedCoinDetails[i].coin.address)) {
          tempArray.push(selectedCoinDetails[i]);
        } else {
          if (
            parseFloat(
              percentageMap.get(selectedCoinDetails[i].coin.address) +
                avgChange,
            ) < 0
          ) {
            return ToastShowShort('maximum limit achieved');
          }
          tempArray.push({
            coin: selectedCoinDetails[i].coin,
            percentage: (
              parseFloat(
                percentageMap.get(selectedCoinDetails[i].coin.address),
              ) + avgChange
            ).toFixed(2),
            amount: 0,
            avgPrice: 0,
          });
        }
      }
      setTxtData(parseFloat(value.toFixed(2)));
    }

    setSelectedCoinDetails([...tempArray]);
  };

  const handleLock = () => {
    if (lockedCoin.includes(data.coin.address)) {
      lockedCoin.splice(lockedCoin.indexOf(data.coin.address), 1);
    } else {
      lockedCoin.push(data.coin.address);
    }
    setLockedCoin([...lockedCoin]);
  };

  const handleDelete = () => {
    const tempArray = [];
    let avgChange =
      parseFloat(selectedCoinDetails[index].percentage) /
      (selectedCoinDetails.length - (lockedCoin.length + 1));

    // //storing deleted coin data into another unlocked coin
    for (let i = 0; i < selectedCoinDetails.length; i++) {
      if (lockedCoin.includes(selectedCoinDetails[i].coin.address)) {
        tempArray.push(selectedCoinDetails[i]);
      } else if (
        selectedCoinDetails[i].coin.address !== data.coin.address &&
        !lockedCoin.includes(selectedCoinDetails[i].coin.address)
      ) {
        tempArray.push({
          coin: selectedCoinDetails[i].coin,
          percentage: (
            parseFloat(selectedCoinDetails[i].percentage) + avgChange
          ).toFixed(2),
          amount: 0,
          avgPrice: 0,
        });
      }
    }
    setSelectedCoinDetails([...tempArray]);
  };
  return (
    <View
      className={`border-2 border-[#282C51] rounded-xl w-full flex flex-col p-2 mt-2 ${
        lockedCoin.includes(data.coin.address) ? 'opacity-30' : 'opacity-100'
      }`}>
      <View className="flex flex-row justify-between items-center">
        <View className="flex flex-row items-center gap-x-2 relative">
          <Image
            source={{
              uri: data.coin.logoURI,
            }}
          />
          <Image
            className="absolute -top-1 left-5"
            source={chainMap?.[data?.coin?.chainId]?.image}
          />

          <Text className="font-[PlusJakartaSans-SemiBold] text-sm text-[#FFFFFF]">
            {data.coin.symbol}
          </Text>
          <Pressable className="w-5 h-5" onPress={handleLock}>
            {lockedCoin.includes(data.coin.address) ? (
              <LockedIcon />
            ) : (
              <UnLockedIcon />
            )}
          </Pressable>
        </View>
        <View className="flex flex-row items-center gap-x-2">
          <View className="flex flex-row items-center justify-between bg-[#2E304E] rounded-md border border-[#393B57] h-10 w-[70px] pr-2">
            <TextInput
              className="font-[PlusJakartaSans-semiBold] text-xs w-[50px] text-[#ffffff] text-end"
              placeholder="in %"
              placeholderTextColor={'#9CA3AF'}
              value={'' + txtData}
              onFocus={text => handleFocus(parseFloat(text))}
              onChangeText={text => handleInputChange(parseFloat(text))}
              keyboardType="numeric"
              editable={
                lockedCoin.includes(data.coin.address) ||
                lockedCoin.length + 1 === selectedCoins.length
                  ? false
                  : true
              }
            />
            <Text className="font-[PlusJakartaSans-SemiBold] text-sm text-[#FFFFFF]">
              %
            </Text>
          </View>
          <TouchableOpacity
            className="w-5 h-5"
            disabled={lockedCoin.includes(data.coin.address) ? true : false}
            onPress={handleDelete}>
            <DeleteIcon />
          </TouchableOpacity>
        </View>
      </View>
      <View className="w-full flex flex-row justify-between items-center h-3 mt-1">
        <Slider
          style={styles.slider}
          disabled={
            lockedCoin.includes(data.coin.address) ||
            lockedCoin.length + 1 === selectedCoins.length ||
            disableAllSlider
              ? true
              : false
          }
          minimumValue={0}
          maximumValue={100}
          value={txtData}
          onValueChange={handleSliderChange}
          onSlidingStart={handleSliderStart}
          // style={{width: '100%'}}
          minimumTrackTintColor="white"
          maximumTrackTintColor="black"
          thumbTintColor="blue"
          // trackStyle={styles.track}
          // thumbStyle={styles.thumb}
        />
      </View>
    </View>
  );
};

export default InvestmentCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider: {
    width: 200,
    height: 40,
  },
  track: {
    height: 6,
    borderRadius: 5,
    backgroundColor: 'black', // Color of the part that has been slid
  },
  thumb: {
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: 'white', // Color of the thumb (sliding button)
  },
  thumbImage: {
    width: 30, // Adjust thumb image width
    height: 30, // Adjust thumb image height
    borderRadius: 15, // Half of width and height to make it circular
  },
});
