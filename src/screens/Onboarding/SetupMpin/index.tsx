import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppDispatch} from '../../../redux/hooks';
import {updateMPIN} from '../../../redux/features/onBoardingSlice';

const {width} = Dimensions.get('screen');
// const keyboardDigits = Array.from({length: 10}, (_, idx) => idx).sort(
//   () => Math.random() - 0.5,
// );
const keyboardDigits = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const SetupMpin = ({next}: any) => {
  const dispatch = useAppDispatch();
  const [MPin, setMPin] = useState([
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ]);

  useEffect(() => {
    const initialMPIN = MPin.slice(0, 6);
    const confirmMPN = MPin.slice(6, 12);
    const initialMPINLength = initialMPIN.filter(item => item !== '').length;
    const confirmMPINLength = confirmMPN.filter(item => item !== '').length;
    if (initialMPINLength === 6 && confirmMPINLength === 6) {
      if (initialMPIN.toString() === confirmMPN.toString()) {
        dispatch(updateMPIN(initialMPIN.join('')));
        next();
      } else {
        setMPin(['', '', '', '', '', '', '', '', '', '', '', '']);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [MPin]);
  return (
    <View className="justify-between h-full flex" style={{width: width}}>
      <View className="px-6">
        <Text className="font-[PlusJakartaSans-SemiBold] text-xl text-[#FFFFFF] text-center">
          Setup MPIN for your Wallet
        </Text>
        <Text className="font-[PlusJakartaSans-SemiBold] text-xs text-[#999999] text-center mt-1">
          This will be used to recover your wallet and perform transactions on
          Porfo:
        </Text>
        <View className="mt-6">
          <Text className="font-[PlusJakartaSans-SemiBold] text-base text-[#FEFDFD] mb-1">
            Enter MPIN
          </Text>
          <View className="flex-row items-center">
            {Array(6)
              .fill(' ')
              .map((_, idx) => (
                <View
                  className="bg-[#2E304E] rounded-md border border-[#393B57] flex flex-row items-center px-2 flex-1 mr-2 h-12 justify-center"
                  key={idx}>
                  <Text className="font-[PlusJakartaSans-SemiBold] text-[#ffffff]">
                    {MPin[idx]}
                  </Text>
                </View>
              ))}
          </View>
        </View>
        <View className="mt-4">
          <Text className="font-[PlusJakartaSans-SemiBold] text-base text-[#FEFDFD] mb-1">
            Confirm MPIN
          </Text>
          <View className="flex-row items-center">
            {Array(6)
              .fill(' ')
              .map((_, idx) => (
                <View
                  className="bg-[#2E304E] rounded-md border border-[#393B57] flex flex-row items-center px-2 flex-1 mr-2 h-12 justify-center"
                  key={idx}>
                  <Text className="font-[PlusJakartaSans-SemiBold] text-[#ffffff]">
                    {MPin[idx + 6]}
                  </Text>
                </View>
              ))}
          </View>
        </View>
      </View>
      <View className="bg-background-200 flex-row flex-wrap gap-y-3 rounded-t-3xl ml-0 pb-8 absolute bottom-0">
        {keyboardDigits.map((digits, idx) => (
          <TouchableOpacity
            onPress={() => {
              const emptyIndex = MPin.findIndex(item => item === '');
              if (emptyIndex !== -1) {
                const updatedArray = [...MPin];
                updatedArray[emptyIndex] = digits.toString();
                setMPin(updatedArray);
              }
            }}
            key={idx}
            style={{width: width / 3}}
            className="flex-row justify-center py-3 rounded-md">
            <Text className="text-[#ffffff] font-[PlusJakartaSans-SemiBold] text-lg">
              {digits}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          onPress={() => {
            const emptyIndex = MPin.findIndex(item => item === '');
            if (emptyIndex === -1) {
              const updatedArray = [...MPin];
              updatedArray[MPin.length - 1] = '';
              setMPin(updatedArray);
            } else {
              const updatedArray = [...MPin];
              updatedArray[emptyIndex - 1] = '';
              setMPin(updatedArray);
            }
          }}
          style={{width: width / 3}}
          className="flex-row justify-center py-3 rounded-md">
          <Text className="text-[#ffffff] font-[PlusJakartaSans-SemiBold] text-lg">
            x
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            const digits = 0;
            const emptyIndex = MPin.findIndex(item => item === '');
            if (emptyIndex !== -1) {
              const updatedArray = [...MPin];
              updatedArray[emptyIndex] = digits.toString();
              setMPin(updatedArray);
            }
          }}
          style={{width: width / 3}}
          className="flex-row justify-center py-3 rounded-md">
          <Text className="text-[#ffffff] font-[PlusJakartaSans-SemiBold] text-lg">
            0
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {}}
          style={{width: width / 3}}
          className="flex-row justify-center py-3 rounded-md">
          <Text className="text-[#ffffff] font-[PlusJakartaSans-SemiBold] text-lg" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SetupMpin;
