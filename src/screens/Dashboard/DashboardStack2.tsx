import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DashboardLanding from './DashboardLanding';
import SocialPage from '../SocialPage';
import AssetDashboard from './DashboardLanding/AssetDashboard';
import Profile from '../Profile';
import CoinInfo from '../CoinInfo';
import AddCard from '../AddCard';

const DStack = createNativeStackNavigator();

export default function DashboardStack2() {
  return (
    <DStack.Navigator
      initialRouteName="AssetDashboard"
      screenOptions={{
        headerShown: false,
      }}>
      <DStack.Screen name="AssetDashboard" component={AssetDashboard} />
      <DStack.Screen name="DashboardLanding" component={DashboardLanding} />
      <DStack.Screen name="Social" component={SocialPage} />
      <DStack.Screen name="Profile" component={Profile} />
      <DStack.Screen name="CoinInfo" component={CoinInfo} />
      <DStack.Screen name="AddCard" component={AddCard} />
    </DStack.Navigator>
  );
}
