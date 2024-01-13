import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnboardingStack from '../Onboarding';
import {useAppSelector} from '../../redux/hooks';
import {WalletContext} from '../../context/WalletContext';
import {BiconomySmartAccountV2} from '@biconomy/account';
import {Wallet} from 'ethers';
import {
  createSmartAccounts,
  createWalletFromPrivateKey,
} from '../../helpers/wallet';
import {chains} from '../../config/config';
import {useOneSignal} from '../../hooks/useOneSignal';
import LocalAuthStack from './LocalAuthStack';
import {ToastShowShort} from '../../utils/toast';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  const {userAddress, privateKey} = useAppSelector(state => state.auth);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [smartAccounts, setSmartAccounts] = useState<
    Record<number, BiconomySmartAccountV2 | undefined>
  >({});
  useEffect(() => {
    if (userAddress) {
      const handleCreateWallet = async () => {
        if (!privateKey) {
          return ToastShowShort('Wallet not Found');
        }
        const storedWallet = await createWalletFromPrivateKey(privateKey);
        if (!storedWallet) {
          return ToastShowShort('Wallet not Found');
        }
        setWallet(storedWallet);
        const sAccounts = await createSmartAccounts(storedWallet, chains);
        if (!sAccounts) {
          return ToastShowShort('Smart Account not Found');
        }
        setSmartAccounts(sAccounts);
      };
      handleCreateWallet()
        .then(() => {
          console.log('Wallet Created');
        })
        .catch(err => {
          console.log(err);
        });
      // handleAuthentication();
    }
  }, [userAddress, privateKey]);

  useOneSignal();

  return (
    <WalletContext.Provider value={{wallet, smartAccounts}}>
      <View className="flex-1">
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {userAddress === null ? (
            <Stack.Screen name="OnboardingStack" component={OnboardingStack} />
          ) : (
            <Stack.Screen name="LocalAuthStack" component={LocalAuthStack} />
          )}
        </Stack.Navigator>
      </View>
    </WalletContext.Provider>
  );
};

export default AppStack;
