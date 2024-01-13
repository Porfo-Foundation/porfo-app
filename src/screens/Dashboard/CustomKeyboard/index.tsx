import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';

const {width} = Dimensions.get('screen');

export const CustomKeyboard = ({
  inputValue,
  setInputValue,
  // setIsDisabled,
  loading,
  handlePreview,
  handleConfirm,
}: any) => {
  const [showPreview, setShowPreview] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [showProgress, setShowPress] = useState(false);
  const [previewData, setPreviewData] = useState({});

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleKeyPress = (key: string) => {
    if (key === 'x') {
      if (inputValue.length > 1) {
        setInputValue(inputValue.slice(0, -1));
      } else {
        setInputValue('0');
      }
    } else {
      if (inputValue === '0' && key !== '.') {
        setInputValue(key);
      } else {
        setInputValue(inputValue + key);
      }
    }
  };
  const getPreviewData = async () => {
    setShowPress(true);
    const data = await handlePreview();
    if (!data) {
      setShowPress(false);
      return;
    }
    setPreviewData(data);
    setShowPress(false);
    // setIsDisabled(true);
    setShowPreview(true);
  };

  const handleConfirmation = async () => {
    setShowPress(true);
    await handleConfirm();
    setShowPress(false);
  };

  const handleEdit = () => {
    setShowPreview(false);
    // setIsDisabled(false);
  };
  return (
    <View className="w-screen">
      {showPreview ? (
        <View className="w-screen bg-background-200  self-end flex-row flex-wrap gap-y-3 rounded-t-3xl ml-0 pb-1">
          <TouchableOpacity
            onPress={handleEdit}
            className="w-full justify-end items-end pr-4">
            <Text className="text-xl text-semantic-info">Edit</Text>
          </TouchableOpacity>
          <View className="w-full px-3 mb-36">
            {Object?.keys(previewData)?.map((oneKey: any, i: number) => {
              return (
                <View
                  key={i}
                  className="w-full flex flex-row justify-start break-words mt-2">
                  <Text className="text-neutral-100">{oneKey}:</Text>
                  <Text className="flex-1 text-neutral-100 break-words ml-2">
                    {previewData[oneKey]}
                  </Text>
                </View>
              );
            })}
          </View>
          <TouchableOpacity
            className="bg-[#fff] mx-2 rounded-2xl h-12 justify-center items-center"
            activeOpacity={0.8}
            onPress={handleConfirmation}
            style={{width: width - 16}}>
            {showProgress ? (
              <ActivityIndicator size="large" color="#F9AA4B" />
            ) : (
              <Text className="font-[PlusJakartaSans-SemiBold] text-lg text-background-200 text-center">
                Confirm
              </Text>
            )}
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {!isKeyboardVisible && (
            <View className="w-screen bg-background-200 flex-row flex-wrap gap-y-3 rounded-t-3xl ml-0 pb-1">
              {Array(9)
                .fill(' ')
                .map((_, idx) => (
                  <TouchableOpacity
                    onPress={() => handleKeyPress((idx + 1).toString())}
                    key={idx}
                    style={{width: width / 3}}
                    className="flex-row justify-center py-3 rounded-md">
                    <Text className="text-[#ffffff] font-[PlusJakartaSans-SemiBold] text-lg">
                      {idx + 1}
                    </Text>
                  </TouchableOpacity>
                ))}
              <TouchableOpacity
                onPress={() => handleKeyPress('x')}
                style={{width: width / 3}}
                className="flex-row justify-center py-3 rounded-md">
                <Text className="text-[#ffffff] font-[PlusJakartaSans-SemiBold] text-lg">
                  x
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleKeyPress('0')}
                style={{width: width / 3}}
                className="flex-row justify-center py-3 rounded-md">
                <Text className="text-[#ffffff] font-[PlusJakartaSans-SemiBold] text-lg">
                  0
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleKeyPress('.')}
                style={{width: width / 3}}
                className="flex-row justify-center py-3 rounded-md">
                <Text className="text-[#ffffff] font-[PlusJakartaSans-SemiBold] text-lg">
                  .
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={loading || inputValue === '0'}
                className={`bg-[#fff] mx-2 rounded-2xl ${
                  loading || inputValue === '0' ? 'opacity-30' : 'opacity-100'
                } h-12 justify-center items-center`}
                activeOpacity={0.8}
                onPress={getPreviewData}
                style={{width: width - 16}}>
                {showProgress ? (
                  <ActivityIndicator size="large" color="#F9AA4B" />
                ) : (
                  <Text className="font-[PlusJakartaSans-SemiBold] text-lg text-background-200 text-center">
                    Preview
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </View>
  );
};
