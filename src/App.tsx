import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {useColorScheme} from 'nativewind';
import {StatusBar, BackHandler} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {exitAppConfirmation} from './utils/exitAppConfirmation';

import colors from '../config/colors';
import {Provider} from 'react-redux';
import {persistor, store} from './redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {linking} from './config/links';
import LoaderPopup from './components/common/LoaderPopup';
import Loader from './components/common/Loader';
import AppStack from './screens/Navigation/AppStack';
import {QueryClient} from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncStoragePersister} from '@tanstack/query-async-storage-persister';
import {
  PersistQueryClientProvider,
  persistQueryClient,
} from '@tanstack/react-query-persist-client';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BaseNavigation from './BaseNavigation';

const App = () => {
  const {colorScheme, setColorScheme} = useColorScheme();
  const backgroundColor =
    colorScheme === 'light' ? colors.neutral[100] : colors.neutral[900];
  const barStyle = colorScheme === 'light' ? 'dark-content' : 'light-content';
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
    setColorScheme('dark');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // exit confirmation
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', exitAppConfirmation);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', exitAppConfirmation);
    };
  }, []);

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#0D2B59',
    },
  };

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: 1000 * 60 * 60 * 24, // 24 hours
      },
    },
  });

  const asyncStoragePersister = createAsyncStoragePersister({
    storage: AsyncStorage,
  });

  persistQueryClient({
    queryClient,
    persister: asyncStoragePersister,
  });
  return (
    // <GestureHandlerRootView>

    <Provider store={store}>
      <StatusBar hidden />
      <PersistGate loading={<Loader />} persistor={persistor}>
        <PersistQueryClientProvider
          client={queryClient}
          persistOptions={{persister: asyncStoragePersister}}>
          <LoaderPopup />
          {/* <NavigationContainer
              linking={linking}
              fallback={<Loader />}
              theme={MyTheme}>
              <StatusBar
                backgroundColor={backgroundColor}
                barStyle={barStyle}
              />
              <AppStack />
            </NavigationContainer> */}
          <BaseNavigation />
        </PersistQueryClientProvider>
      </PersistGate>
    </Provider>
    // </GestureHandlerRootView>
  );
};

export default App;
