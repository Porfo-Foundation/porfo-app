import {View, Text} from 'react-native';
import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {linking} from './config/links';
import Loader from './components/common/Loader';
import {useColorScheme} from 'nativewind';
import colors from '../config/colors';
import AppStack from './screens/Navigation/AppStack';
import {useAppSelector} from './redux/hooks';
import {colorThemes} from './constants/themeData';

const BaseNavigation = () => {
  const {selectedTheme} = useAppSelector(state => state.selectedTheme);
  const {colorScheme, setColorScheme} = useColorScheme();
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colorThemes[selectedTheme]?.background,
    },
  };
  // const backgroundColor =
  //   colorScheme === 'light' ? colors.neutral[100] : colors.neutral[900];
  // const barStyle = colorScheme === 'light' ? 'dark-content' : 'light-content';
  const backgroundColor =
    colorScheme === 'light' ? colors.neutral[100] : colors.neutral[900];
  const barStyle = colorScheme === 'light' ? 'dark-content' : 'light-content';
  return (
    <NavigationContainer
      linking={linking}
      fallback={<Loader />}
      theme={MyTheme}>
      <AppStack />
    </NavigationContainer>
  );
};

export default BaseNavigation;
