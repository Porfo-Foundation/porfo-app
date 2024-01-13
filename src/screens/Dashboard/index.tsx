import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import History from './History';
import Chatbot from './Chatbot/Chatbot';
import DashboardStack2 from './DashboardStack2';
import CoinDetails from './CoinDetails';
import CoinInfo from '../CoinInfo';
import AddNew from './AddNew';
import SendPage from './SendPage';
import Scanner from './SendPage/Scanner';
import TransactionReceipt from './History/TransactionReceipt';
import ReferAndEarn from './ReferalPage';
import FillGasTank from './FillGasTank';

const Stack = createNativeStackNavigator();

const DashboardStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="DashboardStack2" component={DashboardStack2} />
      <Stack.Screen name="History" component={History} />
      <Stack.Screen name="Chatbot" component={Chatbot} />
      <Stack.Screen name="CoinDetails" component={CoinInfo} />
      <Stack.Screen name="AddNew" component={AddNew} />
      <Stack.Screen name="SendPage" component={SendPage} />
      <Stack.Screen name="Scanner" component={Scanner} />
      <Stack.Screen name="TransactionReceipt" component={TransactionReceipt} />
      <Stack.Screen name="ReferAndEarn" component={ReferAndEarn} />
      <Stack.Screen name="FillGasTank" component={FillGasTank} />
    </Stack.Navigator>
  );
};

export default DashboardStack;
