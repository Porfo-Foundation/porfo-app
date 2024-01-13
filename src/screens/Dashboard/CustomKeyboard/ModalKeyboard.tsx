import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Keyboard,
  ScrollView,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppSelector} from '../../../redux/hooks';
import {colorThemes} from '../../../constants/themeData';

const {width} = Dimensions.get('screen');

export const ModalKeyboard = ({
  inputValue,
  setInputValue,
  // setIsDisabled,
  loading,
  handlePreview,
  handleConfirm,
}: any) => {
  const {selectedTheme} = useAppSelector(state => state.selectedTheme);
  const [showPreview, setShowPreview] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [showProgress, setShowPress] = useState(false);
  const [previewData, setPreviewData] = useState([]);

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
    <View style={{width: width - 40}}>
      {showPreview ? (
        <View className="w-full flex-row flex-wrap gap-y-3 rounded-t-3xl ml-0 pb-1">
          <TouchableOpacity
            onPress={handleEdit}
            className="w-full justify-end items-end">
            <Text className="text-xl text-semantic-info">Edit</Text>
          </TouchableOpacity>
          <View className="w-full px-3 mb-3">
            {Object?.keys(previewData)?.map((oneKey: any, i: number) => {
              return (
                <View
                  key={i}
                  className="w-full flex flex-row justify-start break-words mt-2">
                  <Text
                    className="font-[PlusJakartaSans-Bold] text-center text-md mb-2"
                    style={{
                      color: colorThemes[selectedTheme].textDefault,
                    }}>
                    {oneKey}:
                  </Text>
                  <Text
                    className="font-[PlusJakartaSans-SemiBold] text-center text-md mb-2"
                    style={{
                      color: colorThemes[selectedTheme].textDefault,
                    }}>
                    {previewData[oneKey]}
                  </Text>
                </View>
              );
            })}

            {/* <ScrollView className="w-full h-44">
              {previewData?.map((obj, index) => (
                <View className="w-full border-l-2 border-neutral-700 h-12 ml-5">
                  {index === 0 ? (
                    <View className="-ml-4 z-40 flex flex-row items-center">
                      <Image
                        source={obj?.image}
                        className="w-8 h-8 rounded-full"
                      />
                      <View className="flex flex-col">
                        <View className="flex flex-row items-end">
                          <Text
                            className="font-[PlusJakartaSans-SemiBold] text-xl"
                            style={{
                              color: colorThemes[selectedTheme].textTertiary,
                            }}>
                            {obj?.fromAmount}
                          </Text>
                          <Text
                            className="font-[PlusJakartaSans-SemiBold] text-md"
                            style={{
                              color: colorThemes[selectedTheme].textDefault,
                            }}>
                            {obj?.fromSymbol}
                          </Text>
                        </View>
                        <View className="flex flex-row">
                          <Text
                            className="font-[PlusJakartaSans-SemiBold] text-xs"
                            style={{
                              color: colorThemes[selectedTheme].textDefault,
                            }}>
                            {obj?.fromUSDAmount}
                          </Text>
                          <Text
                            className="font-[PlusJakartaSans-SemiBold] text-xs"
                            style={{
                              color: colorThemes[selectedTheme].textDefault,
                            }}>
                            {obj?.message}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ) : (
                    <View className="-ml-4 z-40 flex flex-row items-center">
                      <Image
                        source={obj?.image}
                        className="w-8 h-8 rounded-full"
                      />
                      <View className="flex flex-col">
                        <View className="flex flex-row items-end">
                          <Text
                            className="font-[PlusJakartaSans-SemiBold] text-xs"
                            style={{
                              color: colorThemes[selectedTheme].textDefault,
                            }}>
                            {obj?.message}
                          </Text>
                        </View>
                        <View className="flex flex-row items-center">
                          <Text
                            className="font-[PlusJakartaSans-SemiBold] text-xs"
                            style={{
                              color: colorThemes[selectedTheme].textTertiary,
                            }}>
                            {obj?.fromAmount}
                          </Text>
                          <Text
                            className="font-[PlusJakartaSans-SemiBold] text-xs"
                            style={{
                              color: colorThemes[selectedTheme].textDefault,
                            }}>
                            {obj?.fromSymbol}
                          </Text>
                          <Text
                            className="font-[PlusJakartaSans-SemiBold] text-xs"
                            style={{
                              color: colorThemes[selectedTheme].textDefault,
                            }}>
                            {obj?.fromChain}
                          </Text>
                          <Image
                            source={require('../../../assets/images/arrow.png')}
                            className="w-5 h-2 rounded-full"
                          />
                          <Text
                            className="font-[PlusJakartaSans-SemiBold] text-xs"
                            style={{
                              color: colorThemes[selectedTheme].textTertiary,
                            }}>
                            {obj?.toAmount}
                          </Text>
                          <Text
                            className="font-[PlusJakartaSans-SemiBold] text-xs"
                            style={{
                              color: colorThemes[selectedTheme].textDefault,
                            }}>
                            {obj?.toSymbol}
                          </Text>
                          <Text
                            className="font-[PlusJakartaSans-SemiBold] text-xs"
                            style={{
                              color: colorThemes[selectedTheme].textDefault,
                            }}>
                            {obj?.toChain}
                          </Text>
                        </View>
                      </View>
                    </View>
                  )}
                </View>
              ))}
            </ScrollView> */}
          </View>
          <TouchableOpacity
            className={`mx-2 rounded-2xl ${
              loading || inputValue === '0' ? 'opacity-30' : 'opacity-100'
            } h-12 justify-center items-center`}
            style={{
              backgroundColor: colorThemes[selectedTheme].textSecondary,
              width: width - 54,
            }}
            activeOpacity={0.8}
            onPress={handleConfirmation}>
            {showProgress ? (
              <ActivityIndicator size="large" color="#F9AA4B" />
            ) : (
              <Text
                className="font-[PlusJakartaSans-SemiBold] text-xl text-center"
                style={{color: colorThemes[selectedTheme].textPrimary}}>
                Confirm
              </Text>
            )}
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {!isKeyboardVisible && (
            <View className="w-screen flex-row flex-wrap gap-y-3 rounded-t-3xl ml-0 pb-1">
              {Array(9)
                .fill(' ')
                .map((_, idx) => (
                  <TouchableOpacity
                    onPress={() => handleKeyPress((idx + 1).toString())}
                    key={idx}
                    style={{width: width / 3 - 16}}
                    className="flex-row justify-center py-3 rounded-md">
                    <Text
                      className="font-[PlusJakartaSans-SemiBold] text-2xl"
                      style={{color: colorThemes[selectedTheme].textDefault}}>
                      {idx + 1}
                    </Text>
                  </TouchableOpacity>
                ))}
              <TouchableOpacity
                onPress={() => handleKeyPress('x')}
                style={{width: width / 3 - 16}}
                className="flex-row justify-center py-3 rounded-md">
                <Text
                  className="font-[PlusJakartaSans-SemiBold] text-2xl"
                  style={{color: colorThemes[selectedTheme].textDefault}}>
                  x
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleKeyPress('0')}
                style={{width: width / 3 - 16}}
                className="flex-row justify-center py-3 rounded-md">
                <Text
                  className="font-[PlusJakartaSans-SemiBold] text-2xl"
                  style={{color: colorThemes[selectedTheme].textDefault}}>
                  0
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleKeyPress('.')}
                style={{width: width / 3 - 16}}
                className="flex-row justify-center py-3 rounded-md">
                <Text
                  className="font-[PlusJakartaSans-SemiBold] text-2xl"
                  style={{color: colorThemes[selectedTheme].textDefault}}>
                  .
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={loading || inputValue === '0'}
                className={`mx-2 rounded-2xl ${
                  loading || inputValue === '0' ? 'opacity-30' : 'opacity-100'
                } h-12 justify-center items-center`}
                style={{
                  backgroundColor: colorThemes[selectedTheme].textSecondary,
                  width: width - 54,
                }}
                activeOpacity={0.8}
                onPress={getPreviewData}>
                {showProgress ? (
                  <ActivityIndicator size="large" color="#F9AA4B" />
                ) : (
                  <Text
                    className="font-[PlusJakartaSans-SemiBold] text-xl text-center"
                    style={{color: colorThemes[selectedTheme].textPrimary}}>
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
