import {createContext} from 'react';
import {BiconomySmartAccountV2} from '@biconomy/account';
import {Wallet} from 'ethers';

type WalletContextType = {
  wallet: Wallet | null;
  smartAccounts: Record<number, BiconomySmartAccountV2 | undefined>;
};

export const WalletContext = createContext<WalletContextType>({
  wallet: null,
  smartAccounts: {},
});
