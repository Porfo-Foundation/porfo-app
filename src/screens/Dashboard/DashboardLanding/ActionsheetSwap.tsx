import {
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect, useContext, useRef} from 'react';
import {colorThemes} from '../../../constants/themeData';
import {store} from '../../../redux/store';
import {ICoin} from '../../../interfaces/main';
import {EmptyCoin} from '../../../helpers/coin';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {toggleLoader} from '../../../redux/features/popupSlice';
import {togglePopup} from '../../../redux/features/popupSlice';
import {WalletContext} from '../../../context/WalletContext';
import {ethers} from 'ethers';
import {GetTxnData} from '../../../helpers/cross-chainSwap';
import useCoinList from '../../../hooks/reactQuery/apiHooks/useCoinList';
import { createAndSendTransaction } from '../../../helpers/transactions';
import { chainMap } from '../../../constants/chain';
import CustomLoadingAnimation from '../../../components/common/CustomLoadingAnimation';
import { updateNotification } from '../../../redux/features/notificationSlice';
import { updateNotificationType } from '../../../redux/features/notificationSlice';
import { handleTrxnConfirmation } from '../../../helpers/transactions';
import { getEstimatedExchangePrice } from '../../../utils/swap/prices';
import { networkRpc_url } from '../../../config/config';
import { CustomKeyboard } from '../../../screens/Dashboard/CustomKeyboard';
import { showAmount } from '../../../helpers/showAmount';
import useBalances from '../../../hooks/reactQuery/apiHooks/useBalances';
import Loader from '../../../components/common/Loader';
import {ModalKeyboard} from '../CustomKeyboard/ModalKeyboard';
import CustomDropdown from '../../../components/common/CustomDropdown';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { ToastShowShort } from '../../../utils/toast';
import CoinLogo from '../../../components/coindetails/CoinLogo';
const { width } = Dimensions.get('screen');

const ActionsheetSwap = () => {
  const { buyCoin } = useAppSelector(state => state.coin);
  const { selectedTheme } = useAppSelector(state => state.selectedTheme);
  // console.log('swap popup...', buyCoin.name);
  const { data: coinList } = useCoinList();
  const { data: balanceData, isLoading, isError } = useBalances();
  const { smartAccounts } = useContext(WalletContext);
  const state = store.getState();
  const smartAddress = state.auth.smartAccountAddress;

  const dispatch = useAppDispatch();
  const [selectedFromCoin, setSelectedFromCoin] = useState<ICoin>(buyCoin);
  const [fromCoinBalance, setFromCoinBalance] = useState(0);
  const [toCoinBalance, setToCoinBalance] = useState(0);
  const [selectedToCoin, setSelectedToCoin] = useState<ICoin>(EmptyCoin);
  const [searchFromCoin, setSearchFromCoin] = useState<string>('');
  const [searchToCoin, setSearchToCoin] = useState<string>('');
  const [fromTokenAmount, setFromTokenAmount] = useState<string>('0');
  const [EstimatedAmount, setEstimatedAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [Est_error, setEst_Error] = useState<boolean>(false);
  const [gas, setGas] = useState<number | null>(0);
  const [isKbDisabled, setIsKbDisabled] = useState(false);
  // const [swapProgress, setSwapProgress] = useState(false);
  const [debAmt, setDebAmot] = useState(fromTokenAmount);

  const ethPriceRef = useRef();
  const [setEthPrice] = useState<number>(
    ethPriceRef.current === undefined ? 0 : ethPriceRef.current,
  );

  // dummy preview data
  const previewDataNew = [
    {
      fromAmount: '4.1',
      toAmount: '',
      fromSymbol: 'eth',
      toSymbol: '',
      fromChain: '',
      toChain: '',
      fromUSDAmount: '$6429.70',
      toUSDAmount: '',
      message: 'On Etherium Chain',
      image: require('../../../assets/images/ETH.png'),
    },
    {
      fromAmount: '4.1',
      toAmount: '8099.78',
      fromSymbol: 'ETH',
      toSymbol: 'USDT',
      fromChain: '',
      toChain: '',
      fromUSDAmount: '',
      toUSDAmount: '',
      message: 'Swap to USDT on 0x Router',
      image: require('../../../assets/images/swap-preview.png'),
    },
    {
      fromAmount: '8099.78',
      toAmount: '8095.12',
      fromSymbol: 'ETH',
      toSymbol: 'USDT',
      fromChain: 'on ethereum',
      toChain: 'on binance smart chain',
      fromUSDAmount: '',
      toUSDAmount: '',
      message: 'Bridge USDT on TeraBlock',
      image: require('../../../assets/images/terablock-preview.png'),
    },
    {
      fromAmount: '8095.12',
      toAmount: '69.8',
      fromSymbol: 'USDT',
      toSymbol: 'LTC',
      fromChain: '',
      toChain: '',
      fromUSDAmount: '',
      toUSDAmount: '',
      message: 'Swap to LTC on 0xRouter',
      image: require('../../../assets/images/swap-preview.png'),
    },
  ];
  useEffect(() => {
    let fromBalance = 0;
    let toBalance = 0;
    balances?.map(balance => {
      if (balance.coin.id === selectedFromCoin?.id) {
        fromBalance = balance.value;
      }

      if (balance.coin.id === selectedToCoin?.id) {
        toBalance = balance.value;
      }
      setFromCoinBalance(fromBalance);
      setToCoinBalance(toBalance);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFromCoin, selectedToCoin]);
  useEffect(() => {
    setEstimatedAmount(0);
    setLoading(true);
    // Define a function to update the debouncedValue state
    const debounce = setTimeout(() => {
      setDebAmot(fromTokenAmount);
      // console.log('change Debounce: ');
    }, 3000); // Adjust the delay time as needed (e.g., 500 milliseconds)

    // Clear the previous timeout if the input value changes before the timeout expires
    return () => clearTimeout(debounce);
  }, [fromTokenAmount]);

  useEffect(() => {
    try {
      dispatch(toggleLoader());
      // const fromCoin = balanceData?.balances?.[0]?.coin;
      // const fromCoin = coinList?.filter(
      //   (coin: ICoin) => coin?.symbol === 'USDC' && coin?.chainId === 5,
      // )[0];

      // not undefined
      // if (fromCoin) {
      //   setSelectedFromCoin(fromCoin);
      //   setFromCoinBalance(balanceData?.balances?.[0]?.value);
      // }

      const toCoin = coinList?.find(coin => coin.id !== selectedFromCoin?.id);
      if (toCoin) {
        setSelectedToCoin(toCoin);
      }

      dispatch(toggleLoader());
    } catch (error) {
      ToastShowShort('coin Selection error:');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [balanceData?.balances, coinList, dispatch]);

  const getEthPrice = async () => {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd',
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      // setEthPrice(data?.ethereum.usd);
      ethPriceRef.current = data?.ethereum.usd;
    } catch (err) {
      console.log('err in getEthPrice: ', err);
    }
  };

  useEffect(() => {
    getEthPrice();
    blinkAnimation();
  }, []);

  //calcualte gas on change of from coin
  useEffect(() => {
    const calculateGas = async () => {
      try {
        if (!selectedFromCoin) {
          return;
        }
        const Provider = new ethers.providers.JsonRpcProvider(
          networkRpc_url[selectedFromCoin.chainId],
        );
        let gasPrice;
        let weiPrice: string | number;

        if (selectedFromCoin?.chainId === 97) {
          gasPrice = await Provider.getGasPrice();
          weiPrice = ethers.utils.formatUnits(gasPrice, 'gwei');
        } else {
          gasPrice = await Provider.getFeeData();
          if (gasPrice?.maxPriorityFeePerGas) {
            weiPrice = ethers.utils.formatUnits(
              gasPrice.maxPriorityFeePerGas,
              'gwei',
            );
          } else {
            weiPrice = ethers.utils.formatUnits(gasPrice?.gasPrice!, 'gwei');
          }
        }
        setGas(Number(weiPrice));
      } catch (err) {
        ToastShowShort(`err in gas Cal${err}`);
        console.log('err in gas calculation: ', err);
      }
    };
    if (fromTokenAmount !== '0') {
      calculateGas();
    }
  }, [selectedFromCoin, fromTokenAmount]);

  // Estimate Price
  useEffect(() => {
    const estimatedPriceCalculator = async () => {
      try {
        if (selectedFromCoin && selectedToCoin && debAmt && coinList) {
          const estimatedPrice = await getEstimatedExchangePrice(
            selectedFromCoin,
            debAmt,
            selectedToCoin,
            coinList.filter(coin => coin.symbol === 'PFT'),
          );
          if (estimatedPrice || estimatedPrice === 0) {
            if (estimatedPrice > 0) {
              ToastShowShort(`Estimated Amount: ${estimatedPrice}`);
            }
            setEstimatedAmount(estimatedPrice);
            setEst_Error(false);
          }
        }
      } catch (err) {
        setEstimatedAmount(0);
        setEst_Error(true);
        ToastShowShort(`${err}`);
      } finally {
        setLoading(false);
      }
    };
    if (fromTokenAmount !== '0') {
      estimatedPriceCalculator();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFromCoin, selectedToCoin, debAmt]);

  const opacity = useSharedValue(0);
  const animatedstyle = useAnimatedStyle(() => ({ opacity: opacity.value }), []);

  const handlePreview = () => {
    if (!fromTokenAmount || fromTokenAmount === '0') {
      return ToastShowShort('Please enter amount');
    }
    if (!selectedFromCoin || !selectedToCoin) {
      return ToastShowShort('Please select coins');
    }
    if (selectedFromCoin.id === selectedToCoin.id) {
      return ToastShowShort('Please select different coins');
    }
    if (Number(fromTokenAmount) > fromCoinBalance) {
      return ToastShowShort('Insufficient Balance');
    }
    const previewData = {
      FromAmount:
        '' +
        fromTokenAmount +
        selectedFromCoin.symbol +
        '($' +
        showAmount(Number(fromTokenAmount) * selectedFromCoin.usdPrice) +
        ')',
      ToAmount:
        '' +
        EstimatedAmount +
        selectedToCoin.symbol +
        '($' +
        showAmount(EstimatedAmount * selectedToCoin.usdPrice) +
        ')',
    };
    return previewData;
    // return previewDataNew;
  };

  const swapTxn = async () => {
    try {
      if (
        selectedFromCoin &&
        selectedToCoin &&
        fromTokenAmount &&
        smartAddress &&
        coinList
      ) {
        let txns = await GetTxnData(
          Number(fromTokenAmount),
          selectedFromCoin,
          selectedToCoin,
          selectedFromCoin?.chainId,
          selectedToCoin?.chainId,
          smartAddress,
          coinList.filter(coin => coin.symbol === 'PFT'),
        );
        if (txns) {
          const sAccountOnFromChain = smartAccounts[selectedFromCoin?.chainId];
          if (sAccountOnFromChain) {
            let tx = await createAndSendTransaction(sAccountOnFromChain, txns);
            if (tx?.userOpHash) {
              handleTrxnConfirmation(tx)
                .then(() => {
                  dispatch(updateNotification(true));
                  dispatch(updateNotificationType('success'));
                })
                .catch(err => {
                  console.log(err, 'ERROR IN CONFIRMATION');
                  dispatch(updateNotification(true));
                  dispatch(updateNotificationType('failed'));
                });
              dispatch(updateNotification(true));
              dispatch(updateNotificationType('pending'));
              dispatch(togglePopup());
            }
          } else {
            ToastShowShort('SmartAccount not detected');
            dispatch(updateNotification(true));
            dispatch(updateNotificationType('failed'));
          }
        } else {
          ToastShowShort('No Txns detected');
          console.log('No Transactions');
        }
      } else {
        ToastShowShort('Please fill all the fields');
        console.log('no response');
      }
    } catch (err) {
      ToastShowShort(`${err}`);
      console.log('err: ', err);
    }
  };
  if (isLoading || isError) {
    return <Loader />;
  }

  const { balances } = balanceData;

  const blinkAnimation = () => {
    opacity.value = withRepeat(
      withTiming(1, { duration: 500, easing: Easing.ease }),
      -1,
      true,
    );
  };

  const height = Dimensions.get('screen').height;
  return (
    <ScrollView className="w-full px-3 h-full">
      <Text
        className="font-[PlusJakartaSans-SemiBold] text-center text-xl mb-2"
        style={{
          color: colorThemes[selectedTheme].textDefault,
        }}>
        Swap
      </Text>
      <View
        className="py-3 px-4"
        style={{
          backgroundColor: colorThemes[selectedTheme].inputSecondaryBackground,
        }}>
        <View className="flex-row items-center justify-between">
          <Text
            className="text-sm mb-2"
            style={{
              color: colorThemes[selectedTheme].textSecondary,
            }}>
            You Swap
          </Text>
          <View className="flex-row gap-x-2">
            <TouchableOpacity
              onPress={() => setFromTokenAmount('' + 1)}
              className="border rounded-full"
              style={{borderColor: colorThemes[selectedTheme].background}}>
              <Text
                className="font-[PlusJakartaSans-Bold] px-2 text-xs"
                style={{color: colorThemes[selectedTheme].background}}>
                MIN
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                setFromTokenAmount('' + showAmount(fromCoinBalance / 2))
              }
              className="border rounded-full"
              style={{borderColor: colorThemes[selectedTheme].background}}>
              <Text
                className="font-[PlusJakartaSans-Bold] px-2 text-xs"
                style={{color: colorThemes[selectedTheme].background}}>
                HALF
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                setFromTokenAmount('' + showAmount(fromCoinBalance))
              }
              className="border rounded-full"
              style={{borderColor: colorThemes[selectedTheme].background}}>
              <Text
                className="font-[PlusJakartaSans-Bold] px-2 text-xs"
                style={{color: colorThemes[selectedTheme].background}}>
                MAX
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex-row justify-between items-center pt-6">
          <View>
            <CustomDropdown
              TitleComponent={
                <View
                  className="p-2 rounded-full flex-row items-center"
                  style={{
                    backgroundColor:
                      colorThemes[selectedTheme].dropdownBackground,
                  }}>
                  {selectedFromCoin ? (
                    <View className="px-4">
                      <View className="flex-row items-center gap-x-4 relative">
                        <CoinLogo
                          symbol={selectedFromCoin?.symbol}
                          size="small"
                        />
                        <Text
                          className="font-[PlusJakartaSans-SemiBold] "
                          style={{
                            color: colorThemes[selectedTheme].textDefault,
                          }}>
                          {selectedFromCoin?.symbol}
                        </Text>
                        <Text
                          className="font-[PlusJakartaSans-SemiBold] "
                          style={{
                            color: colorThemes[selectedTheme].textDefault,
                          }}>
                          ({chainMap[selectedFromCoin?.chainId]?.symbol})
                        </Text>
                        {colorThemes[selectedTheme].chevronDownSecondary}
                      </View>
                    </View>
                  ) : (
                    <Text className="font-[PlusJakartaSans-SemiBold text-[#999999] flex-1 py-3.5">
                      Select token
                    </Text>
                  )}
                </View>
              }
              HeadingComponent={
                <View
                  className="rounded-xl pb-0"
                  style={{width: '95%', backgroundColor: '#000000'}}>
                  <TextInput
                    className="font-[PlusJakartaSans-semiBold] text-sm text-[#FFFFFF] px-4"
                    placeholder="Search coins"
                    onChangeText={val => setSearchFromCoin(val)}
                    value={searchFromCoin}
                    placeholderTextColor="#999999"
                  />
                  <ScrollView style={{height: 250, width: width * 0.85}}>
                    {coinList
                      ?.filter(
                        coin =>
                          (coin?.name
                            ?.toLowerCase()
                            ?.includes(searchFromCoin?.toLowerCase()) ||
                            coin?.symbol
                              ?.toLowerCase()
                              ?.includes(searchFromCoin?.toLowerCase())) &&
                          coin?.id !== selectedToCoin?.id,
                      )
                      ?.map((coin, idx) => (
                        <TouchableOpacity
                          className="p-2 px-4"
                          key={idx}
                          onPress={() => {
                            setSelectedFromCoin(coin);
                          }}>
                          <View className="w-full flex flex-row justify-between items-center gap-x-2 relative">
                            <View className="flex flex-row justify-start items-center">
                              <CoinLogo symbol={coin?.symbol} size="medium" />
                              <Text className="font-[PlusJakartaSans-semiBold] text-sm text-[#FFFFFF] ml-2">
                                {coin?.name} ({coin?.symbol})
                              </Text>
                            </View>
                            <CoinLogo
                              symbol={chainMap[coin?.chainId]?.symbol}
                              size="small"
                            />
                          </View>
                        </TouchableOpacity>
                      ))}
                  </ScrollView>
                </View>
              }
              selectedItem={selectedFromCoin}
            />
            <Text
              className="font-[PlusJakartaSans-semiBold] text-xs pl-1 mt-0.5"
              style={{color: colorThemes[selectedTheme].textDefault}}>
              Balance: {showAmount(fromCoinBalance)}
            </Text>
          </View>
          <View className="flex items-end">
            <TouchableOpacity className="w-full items-end">
              <View className="flex-row items-center">
                <Text
                  className="font-[PlusJakartaSans-Bold] text-2xl py-0 text-end"
                  style={{color: colorThemes[selectedTheme].textDefault}}>
                  {fromTokenAmount}
                </Text>
              </View>
            </TouchableOpacity>
            <Text
              className="font-[PlusJakartaSans-semiBold] text-md text-end"
              style={{color: colorThemes[selectedTheme].textMuted}}>
              $
              {showAmount(
                parseFloat(fromTokenAmount) * selectedFromCoin?.usdPrice,
              )}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        className="self-center -mt-3 p-1 border-2 border-neutral-600 z-10 rounded-md"
        style={{
          backgroundColor: colorThemes[selectedTheme].inputSecondaryBackground,
        }}
        onPress={() => {
          const tempCoin = selectedToCoin;
          setSelectedToCoin(selectedFromCoin);
          setSelectedFromCoin(tempCoin);
        }}>
        <Image source={require('../../../assets/images/swap-arrow.png')} />
      </TouchableOpacity>
      <View
        className="py-3 px-4 -mt-3"
        style={{
          backgroundColor: colorThemes[selectedTheme].inputSecondaryBackground,
        }}>
        <View className="flex-row items-center justify-between">
          <Text
            className="font-[PlusJakartaSans-Bold] text-md mb-2"
            style={{
              color: colorThemes[selectedTheme].textTertiary,
            }}>
            You Receive
          </Text>
        </View>
        <View className="flex-row justify-between items-center pt-6">
          <View>
            <CustomDropdown
              TitleComponent={
                <View
                  className="p-2 rounded-full flex-row items-center"
                  style={{
                    backgroundColor:
                      colorThemes[selectedTheme].dropdownBackground,
                  }}>
                  {selectedToCoin ? (
                    <View className="px-4">
                      <View className="flex-row items-center gap-x-4 relative">
                        <CoinLogo
                          symbol={selectedFromCoin?.symbol}
                          size="small"
                        />
                        <Text
                          className="font-[PlusJakartaSans-SemiBold]"
                          style={{
                            color: colorThemes[selectedTheme].textDefault,
                          }}>
                          {selectedToCoin?.symbol}
                        </Text>
                        <Text
                          className="font-[PlusJakartaSans-SemiBold] "
                          style={{
                            color: colorThemes[selectedTheme].textDefault,
                          }}>
                          ({chainMap[selectedToCoin?.chainId]?.symbol})
                        </Text>
                        {colorThemes[selectedTheme].chevronDownSecondary}
                      </View>
                    </View>
                  ) : (
                    <Text className="font-[PlusJakartaSans-SemiBold text-[#999999] flex-1 py-3.5">
                      Select token
                    </Text>
                  )}
                </View>
              }
              HeadingComponent={
                <View
                  className="rounded-xl pb-0"
                  style={{width: '95%', backgroundColor: '#000000'}}>
                  <TextInput
                    className="font-[PlusJakartaSans-semiBold] text-sm text-[#FFFFFF] px-4"
                    placeholder="Search coins"
                    onChangeText={val => setSearchToCoin(val)}
                    value={searchToCoin}
                    placeholderTextColor="#999999"
                  />
                  <ScrollView style={{height: 250, width: width * 0.85}}>
                    {coinList
                      ?.filter(
                        coin =>
                          (coin?.name
                            ?.toLowerCase()
                            ?.includes(searchToCoin?.toLowerCase()) ||
                            coin?.symbol
                              ?.toLowerCase()
                              ?.includes(searchToCoin?.toLowerCase())) &&
                          coin?.id !== selectedFromCoin?.id,
                      )
                      ?.map((coin, idx) => (
                        <TouchableOpacity
                          className="p-2 px-4"
                          key={idx}
                          onPress={() => {
                            setSelectedToCoin(coin);
                          }}>
                          <View className="w-full flex flex-row justify-between items-center gap-x-2 relative">
                            <View className="flex flex-row justify-start items-center">
                              <CoinLogo symbol={coin?.symbol} size="medium" />
                              <Text className="font-[PlusJakartaSans-semiBold] text-sm text-[#FFFFFF] ml-2">
                                {coin?.name} ({coin?.symbol})
                              </Text>
                            </View>
                            <CoinLogo
                              symbol={chainMap[coin?.chainId].symbol}
                              size="small"
                            />
                          </View>
                        </TouchableOpacity>
                      ))}
                  </ScrollView>
                </View>
              }
              selectedItem={selectedToCoin}
            />
            <Text
              className="font-[PlusJakartaSans-semiBold] text-xs pl-1 mt-0.5"
              style={{color: colorThemes[selectedTheme].textDefault}}>
              Balance: {showAmount(toCoinBalance)}
            </Text>
          </View>
          <View className="flex items-end">
            <Text
              className="font-[PlusJakartaSans-semiBold] text-2xl py-0 text-end"
              style={{color: colorThemes[selectedTheme].textDefault}}>
              {loading ? (
                <CustomLoadingAnimation />
              ) : Est_error ? (
                <CustomLoadingAnimation />
              ) : EstimatedAmount === Math.floor(EstimatedAmount) ? (
                EstimatedAmount
              ) : (
                <View className="flex-col items-end">
                  <Text
                    className="font-[PlusJakartaSans-Bold] text-2xl py-0 text-end"
                    style={{color: colorThemes[selectedTheme].textDefault}}>
                    {showAmount(EstimatedAmount)}
                  </Text>
                  <Text
                    className="font-[PlusJakartaSans-semiBold] text-md text-end"
                    style={{color: colorThemes[selectedTheme].textMuted}}>
                    ${showAmount(EstimatedAmount * selectedToCoin?.usdPrice)}
                  </Text>
                </View>
              )}
            </Text>
          </View>
        </View>
      </View>
      <View>
        <ModalKeyboard
          inputValue={fromTokenAmount}
          setInputValue={setFromTokenAmount}
          setIsDisabled={setIsKbDisabled}
          loading={loading}
          handlePreview={handlePreview}
          handleConfirm={swapTxn}
        />
      </View>
    </ScrollView>
  );
};

export default ActionsheetSwap;
