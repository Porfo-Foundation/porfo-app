import {ethers, Wallet} from 'ethers';
import {
  BiconomySmartAccountV2,
  BiconomySmartAccountV2Config,
  DEFAULT_ENTRYPOINT_ADDRESS,
} from '@biconomy/account';
import {
  MultiChainValidationModule,
  DEFAULT_ECDSA_OWNERSHIP_MODULE,
} from '@biconomy/modules';

import {sha512_256} from 'js-sha512';
import {PaymasterUrls, providerUrl} from '../config/config';
import {IBundler, Bundler} from '@biconomy/bundler';
import {BiconomyPaymaster} from '@biconomy/paymaster';

async function createConfig(
  chainId: number,
  wallet: Wallet,
): Promise<BiconomySmartAccountV2Config> {
  let bundler: IBundler = new Bundler({
    bundlerUrl: `https://bundler.biconomy.io/api/v2/${chainId}/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44`,
    chainId: chainId,
    entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
  });

  let paymaster = new BiconomyPaymaster({
    paymasterUrl: PaymasterUrls[chainId],
  });

  const module = await MultiChainValidationModule.create({
    signer: wallet, // ethers signer object
    moduleAddress: DEFAULT_ECDSA_OWNERSHIP_MODULE,
  });

  return {
    chainId: chainId,
    entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
    bundler: bundler,
    paymaster: paymaster,
    defaultValidationModule: module,
    activeValidationModule: module,
  };
}

export const createWallet = async (
  customerId: string,
  KeywordsArray: string[],
) => {
  try {
    const privKey = sha512_256(
      customerId + KeywordsArray[0] + KeywordsArray[1],
    );
    const rpcHttpProvider = new ethers.providers.JsonRpcProvider(providerUrl);
    const wallet = new ethers.Wallet(privKey, rpcHttpProvider);
    return wallet;
  } catch (err) {
    console.log(err);
  }
};

export const createWalletFromPrivateKey = async (privKey: string) => {
  try {
    const rpcHttpProvider = new ethers.providers.JsonRpcProvider(providerUrl);
    const wallet = new ethers.Wallet(privKey, rpcHttpProvider);
    return wallet;
  } catch (error) {
    return null;
  }
};

export const createSmartAccount = async (
  wallet: ethers.Wallet,
  chainId: number,
) => {
  try {
    let Config = await createConfig(chainId, wallet);
    let smartAccount = await BiconomySmartAccountV2.create(Config);
    return smartAccount;
  } catch (err) {
    console.log(err);
  }
};

export const createSmartAccounts = async (
  wallet: ethers.Wallet,
  chainIds: number[],
) => {
  try {
    let smartAccounts: Record<number, BiconomySmartAccountV2 | undefined> = {};
    for (let i = 0; i < chainIds.length; i++) {
      let smartAccount = await createSmartAccount(wallet, chainIds[i]);
      // smartAccount?.accountAddress;
      console.log(
        'Account Created on ' + chainIds[i],
        // (await smartAccount?.getAccountAddress()),
      );
      smartAccounts[chainIds[i]] = smartAccount;
    }
    return smartAccounts;
  } catch (err) {
    console.log(err);
  }
};
