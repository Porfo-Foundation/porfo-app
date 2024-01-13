import {BiconomySmartAccount, BiconomySmartAccountV2} from '@biconomy/account';
import {BigNumber, ethers} from 'ethers';
import {ICoin} from '../interfaces/main';
import {
  SponsorUserOperationDto,
  PaymasterMode,
  IHybridPaymaster,
} from '@biconomy/paymaster';
import {UserOpResponse} from '@biconomy/bundler';
import {EmptyCoin} from './coin';
import {ToastShowShort} from '../utils/toast';

export const sendTransaction = async (
  smartAccount: BiconomySmartAccountV2,
  value: number | BigNumber,
  to: string,
  tokenAddress: string,
  coin: ICoin,
  navigation: any,
  data?: string,
) => {
  try {
    let tx;
    // await smartAccount.setActiveChain(coin?.chainId);
    // console.log('active chain', smartAccount.smartAccountState);
    if (coin?.isMain) {
      tx = {
        to: to,
        data: data !== undefined ? data : '0x',
        value: value,
      };
    } else {
      const erc20Interface = new ethers.utils.Interface([
        'function transfer(address _to, uint256 _value)',
      ]);
      const encodedData = erc20Interface.encodeFunctionData('transfer', [
        to,
        value,
      ]);
      tx = {
        to: coin.address, // destination smart contract address
        data: encodedData,
      };
    }
    let userOp = await smartAccount.buildUserOp([tx]);
    // console.log('userOp: ', userOp);
    let paymasterServiceData: SponsorUserOperationDto = {
      mode: PaymasterMode.SPONSORED,
      smartAccountInfo: {
        name: 'BICONOMY',
        version: '2.0.0',
      },
    };

    const Paymaster =
      smartAccount.paymaster as IHybridPaymaster<SponsorUserOperationDto>;
    let paymasterData = await Paymaster.getPaymasterAndData(
      userOp,
      paymasterServiceData,
    );
    userOp.paymasterAndData = paymasterData.paymasterAndData;
    // userOp.verificationGasLimit = paymasterData.verificationGasLimit;
    // userOp.preVerificationGas = paymasterData.preVerificationGas;
    // userOp.callGasLimit = paymasterData.callGasLimit;

    const userOpResponse = await smartAccount.sendUserOp(userOp);
    return userOpResponse;
  } catch (err) {
    console.log(err);
    ToastShowShort('' + JSON.stringify(err));
  }
};

export const sendDappTxn = async (
  smartAccount: BiconomySmartAccount,
  value: number | BigNumber,
  to: string,
  data: string,
) => {
  try {
    const tx = {
      to: to,
      data: data !== undefined ? data : '0x',
      value: value,
    };
    let userOp = await smartAccount.buildUserOp([tx]);
    let paymasterServiceData: SponsorUserOperationDto = {
      mode: PaymasterMode.SPONSORED,
      smartAccountInfo: {
        name: 'BICONOMY',
        version: '2.0.0',
      },
    };

    const Paymaster =
      smartAccount.paymaster as IHybridPaymaster<SponsorUserOperationDto>;
    let paymasterData = await Paymaster.getPaymasterAndData(
      userOp,
      paymasterServiceData,
    );
    userOp.paymasterAndData = paymasterData.paymasterAndData;

    const userOpResponse = await smartAccount.sendUserOp(userOp);
    return userOpResponse;
  } catch (err) {
    console.log(err);
    ToastShowShort('' + JSON.stringify(err));
  }
};

export const handleTrxnConfirmation = async (
  userOpResponse: UserOpResponse,
) => {
  try {
    const transactionDetail = await userOpResponse?.wait();
    // If you do not subscribe to listener, one can also get the receipt like shown below
    return transactionDetail;
  } catch (err) {
    console.log(err);
    ToastShowShort('' + JSON.stringify(err));
  }
};

interface Transaction {
  to: string;
  data: string;
  value: number | BigNumber;
}

export const createAndSendTransaction = async (
  smartAccount: BiconomySmartAccountV2,
  txns: Array<Transaction>,
) => {
  try {
    let userOp = await smartAccount.buildUserOp([...txns]);
    let paymasterServiceData: SponsorUserOperationDto = {
      mode: PaymasterMode.SPONSORED,
      smartAccountInfo: {
        name: 'BICONOMY',
        version: '2.0.0',
      },
    };

    const Paymaster =
      smartAccount.paymaster as IHybridPaymaster<SponsorUserOperationDto>;
    let paymasterData = await Paymaster.getPaymasterAndData(
      userOp,
      paymasterServiceData,
    );
    userOp.paymasterAndData = paymasterData.paymasterAndData;
    const userOpResponse = await smartAccount.sendUserOp(userOp);

    // const transactionDetail = await userOpResponse.wait();
    // If you do not subscribe to listener, one can also get the receipt like shown below
    return userOpResponse;
  } catch (err: any) {
    console.log(err);
    ToastShowShort('' + JSON.stringify(err?.message));
  }
};

export const EmptyTransaction = {
  xChainTrxnId: '',
  hash: '',
  fromAddress: '',
  toAddress: '',
  value: 0,
  gas: 0,
  gasPrice: 0,
  txnType: '',
  txTime: 0,
  chainId: 0,
  coin: EmptyCoin,
  blockNumber: 0,
  txnStatus: false,
};
