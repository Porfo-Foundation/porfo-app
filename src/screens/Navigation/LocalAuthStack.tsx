import React, {useEffect, useState} from 'react';
import {BackHandler} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DashboardStack from '../Dashboard';
import AddPortfolio from '../Portfolio';
import AssetDashboard from '../Dashboard/DashboardLanding/AssetDashboard';
import {localAuthentication} from '../../helpers/localAuthentication';
import EmptyScreen from '../Dashboard/EmptyScreen';
import {SocketProvider} from '../../context/SocketContext';
import {RealmProvider} from '../../realm';
import RootPopup from '../../components/common/RootPopup';

const lStack = createNativeStackNavigator();

const LocalAuthStack = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleAuthentication = async () => {
    const result = await localAuthentication();
    if (result) {
      setIsAuthenticated(result);
    } else {
      BackHandler.exitApp();
    }
  };

  useEffect(
    () => {
      if (!isAuthenticated) {
        handleAuthentication();
      }
    },
    // , [userAddress]
  );
  return (
    <RealmProvider>
      <SocketProvider>
        <RootPopup />
        <lStack.Navigator screenOptions={{headerShown: false}}>
          {isAuthenticated ? (
            <>
              <lStack.Screen name="DashboardStack" component={DashboardStack} />
              <lStack.Screen name="AddPortfolio" component={AddPortfolio} />
              <lStack.Screen name="AssetDashboard" component={AssetDashboard} />
            </>
          ) : (
            <lStack.Screen name="EmptyScreen" component={EmptyScreen} />
          )}
        </lStack.Navigator>
      </SocketProvider>
    </RealmProvider>
  );
};

export default LocalAuthStack;
