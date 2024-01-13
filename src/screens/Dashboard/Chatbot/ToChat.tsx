import {View, Text, Dimensions, Image} from 'react-native';
import React from 'react';
import {useAppSelector} from '../../../redux/hooks';
import {colorThemes} from '../../../constants/themeData';

const {width} = Dimensions.get('screen');

const ToChat = ({text, avatar = false}: any) => {
  const {selectedTheme} = useAppSelector(state => state.selectedTheme);
  return (
    <View className="flex flex-row items-center justify-end mt-1">
      <View
        className="flex flex-col items-center rounded-r-2xl p-0 min-w-[70px]"
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 0,
          borderTopLeftRadius: 16,
          backgroundColor: colorThemes[selectedTheme].buttonBackground,
        }}>
        <View
          className="flex flex-row items-center rounded-r-2xl p-2"
          style={{
            maxWidth: width * 0.65,
          }}>
          <Text
            className="font-[PlusJakartaSans-semiBold] text-xs"
            style={{color: colorThemes[selectedTheme].textPrimary}}>
            {text}
          </Text>
        </View>
      </View>
      {avatar ? (
        <Image
          source={require('../../../assets/images/profile-placeholder.png')}
          className="w-6 h-6 rounded-full z-30"
        />
      ) : (
        <View className="w-4 h-8" />
      )}
    </View>
  );
};

export default ToChat;
