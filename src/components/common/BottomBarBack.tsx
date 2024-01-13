import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useAppSelector} from '../../redux/hooks';
import {colorThemes} from '../../constants/themeData';
import {useNavigation} from '@react-navigation/native';
type propsType = {
  screenName: string;
  information?: any;
  isActive?: boolean;
  action?: () => void;
};
const BottomBarBack = ({
  screenName,
  information,
  isActive,
  action,
}: propsType) => {
  const navigation = useNavigation();
  const {selectedTheme} = useAppSelector(state => state.selectedTheme);
  return (
    <View
      className="border-t rounded-t-lg h-16 w-full absolute bottom-0 left-0 z-[100] flex-row items-center justify-between px-4"
      style={{
        borderTopColor: colorThemes[selectedTheme].buttonBackground,
        backgroundColor: colorThemes[selectedTheme].background,
      }}>
      {screenName === 'coinInfo' ? (
        <TouchableOpacity
          onPress={action}
          className="flex-row items-center gap-x-2">
          <View className="items-end">
            <Text
              className="font-bold font-[PlusJakartaSans-SemiBold]"
              style={{
                color: colorThemes[selectedTheme]['textSecondary'],
              }}>
              ${information?.data.yAxisData.toFixed(2)}
            </Text>
          </View>
          {!isActive ? (
            <Text
              className={`font-[PlusJakartaSans-semiBold] text-[#58D24E] ${
                information.percentage < 0
                  ? 'text-semantic-error'
                  : 'text-semantic-success'
              }`}>
              {information.percentage}
            </Text>
          ) : (
            <Text
              className="font-bold font-[PlusJakartaSans-SemiBold]"
              style={{
                color: colorThemes[selectedTheme]['textSecondary'],
              }}>
              at
            </Text>
          )}

          {!isActive ? (
            <Image
              source={require('../../assets/images/line-chart.png')}
              className="w-[120px] h-10"
            />
          ) : (
            <Text
              className="font-bold font-[PlusJakartaSans-SemiBold]"
              style={{
                color: colorThemes[selectedTheme]['textSecondary'],
              }}>
              {information?.data.xAxisData}
            </Text>
          )}
        </TouchableOpacity>
      ) : (
        <View className="flex-row items-center gap-x-2">
          <Image
            source={require('../../assets/icons/svg/theme-selector-button.png')}
            className="w-[26px] h-7"
          />
          <View>
            <Text
              className="font-bold font-[PlusJakartaSans-SemiBold]"
              style={{
                color: colorThemes[selectedTheme]['textSecondary'],
              }}>
              Fuel Meter
            </Text>
            <Text
              className="font-bold font-[PlusJakartaSans-SemiBold]"
              style={{
                color: colorThemes[selectedTheme]['textPrimary'],
              }}>
              0.465 PFT
            </Text>
          </View>
        </View>
      )}

      <View className="z-[101] absolute bottom-6 right-2">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            className="w-16 h-16"
            source={colorThemes[selectedTheme].bottomBarLeftArrow}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BottomBarBack;
