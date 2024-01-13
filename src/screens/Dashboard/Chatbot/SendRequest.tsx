import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
} from 'react-native';

import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import React, {useContext, useState} from 'react';
import CoinLogo from '../../../components/coindetails/CoinLogo';
import {WalletContext} from '../../../context/WalletContext';
import {sendTransaction} from '../../../helpers/transactions';
import useCoinList from '../../../hooks/reactQuery/apiHooks/useCoinList';
import useBalances from '../../../hooks/reactQuery/apiHooks/useBalances';
import {ToastShowShort} from '../../../utils/toast';
import {EmptyCoin} from '../../../helpers/coin';
import {ICoin} from '../../../interfaces/main';
import SendTransaction from './SendTransaction';

const SendRequest = ({data}: any) => {
  const {data: coinList} = useCoinList();
  const {data: balanceData} = useBalances();
  const {balances} = balanceData;
  let coinData = coinList?.find(
    coin => coin.id === data.txnData?.coinDocId,
  ) as ICoin;
  if (!coinData) {
    coinData = EmptyCoin;
  }
  const balanceDetails = balances?.find(
    balance => balance.coin.id === data.txnData?.coinDocId,
  );
  const coinBalance = balanceDetails?.value;
  const {smartAccounts} = useContext(WalletContext);
  const [showActivityIndicator, setShowActivityIndicator] = useState(false);
  const [buttonText, setButtonText] = useState('TRANSFER');
  const [isDisabled, setIsDisabled] = useState(false);
  const [showRejectButton, setShowRejectButton] = useState(true);
  const [payByPorfo, setPayByPorfo] = useState(false);

  const switchAnimation = useSharedValue(0);
  const switchPos = useDerivedValue(() => {
    return interpolate(switchAnimation.value, [0, 1], [0, 14]);
  });

  const switchStyle = useAnimatedStyle(() => {
    return {
      translateX: switchPos.value,
    };
  });

  const setSwitchValue = () => {
    if (payByPorfo) {
      setPayByPorfo(false);
      switchAnimation.value = withTiming(0, {
        duration: 100,
      });
    } else {
      setPayByPorfo(true);
      switchAnimation.value = withTiming(1, {
        duration: 100,
      });
    }
  };

  switch (data.action) {
    case 'transferERC20':
      return (
        <SendTransaction
          data={data}
          coinData={coinData}
          smartAccounts={smartAccounts}
          coinBalance={coinBalance}
        />
      );
    case 'transferNative':
      return (
        <SendTransaction
          data={data}
          coinData={coinData}
          smartAccounts={smartAccounts}
          coinBalance={coinBalance}
        />
      );
    default:
      return <Text>{data.action}</Text>;
  }
};

export default SendRequest;
