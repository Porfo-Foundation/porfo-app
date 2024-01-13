import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import DashboardLayout from '../DashboardLayout';
import Clipboard from '@react-native-clipboard/clipboard';
import {
  handleTrxnConfirmation,
  sendTransaction,
} from '../../../helpers/transactions';
import {WalletContext} from '../../../context/WalletContext';
import {ethers} from 'ethers';
import CoinLogo from '../../../components/coindetails/CoinLogo';
import useBalances from '../../../hooks/reactQuery/apiHooks/useBalances';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {
  updateNotification,
  updateNotificationType,
} from '../../../redux/features/notificationSlice';
import {CustomKeyboard} from '../CustomKeyboard';
import {showAmount} from '../../../helpers/showAmount';
import {resolvePnsName} from '../../../apiCalls/pns';
import {ToastShowShort} from '../../../utils/toast';

const SendPage = ({navigation}: any) => {
  const {data: balanceData} = useBalances();
  const dispatch = useAppDispatch();
  const {senderAddress} = useAppSelector(state => state.assets);
  const balances = balanceData?.balances || [];
  const {smartAccounts} = useContext(WalletContext);
  const [selectedCoin, setSelectedCoin] = useState(balances[0]?.coin);
  const [contentVisible, setContentVisible] = useState(false);
  const [address, setAddress] = useState(senderAddress);
  const [value, setValue] = useState('0');
  const [sendProgress, setSendProgress] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const pasteClipboard = async () => {
    const clipboardText = await Clipboard.getString();
    setAddress(clipboardText);
  };

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  console.log(isKeyboardVisible, 'IS KEYBOARD VISIBLE');

  const balanceDetails = balances?.find(
    balance => balance.coin.id === selectedCoin?.id,
  );
  const coinBalance = balanceDetails?.value;

  //Resolves ENS name
  useEffect(() => {
    if (address.includes('.eth')) {
      const provider = new ethers.providers.JsonRpcProvider(
        'https://rpc.ankr.com/eth',
      );
      const resolveName = async () => {
        const resolvedAddress = await provider.resolveName(address);
        if (!resolvedAddress) {
          return ToastShowShort('Invalid ENS name');
        }
        setAddress(resolvedAddress);
      };
      resolveName();
    }
    if (address.includes('.porfo')) {
      const resolvePNS = async () => {
        const resolvedAddress = await resolvePnsName(address);
        if (!resolvedAddress) {
          return ToastShowShort('Invalid ENS name');
        }
        setAddress(resolvedAddress);
      };
      resolvePNS();
    }
  }, [address]);

  const handleSendTransaction = async () => {
    const smartAccount = smartAccounts[selectedCoin?.chainId];
    console.log(
      smartAccount,
      ' Smart Account Details on chain ',
      selectedCoin?.chainId,
    );
    if (!smartAccount) {
      return ToastShowShort('Smart Account not found');
    }
    if (Number(value) > coinBalance) {
      return ToastShowShort('Insufficient balance');
    }
    setSendProgress(true);
    try {
      const userOpResponse = await sendTransaction(
        smartAccount,
        ethers.utils.parseUnits(value, selectedCoin?.decimals),
        address,
        selectedCoin?.address,
        selectedCoin,
        navigation,
      );

      if (userOpResponse?.userOpHash) {
        handleTrxnConfirmation(userOpResponse)
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
        navigation.goBack();
      }
    } catch (error) {
      console.log('error in sending transation...', error);
      ToastShowShort('' + error);
    }
  };

  const handlePreview = () => {
    const previewData = {
      address: address,
      sendAmount:
        '' +
        value +
        selectedCoin?.symbol +
        '($' +
        showAmount(value * selectedCoin?.usdPrice) +
        ')',
    };
    return previewData;
  };
  return (
    <DashboardLayout
      openContent={contentVisible}
      onCloseContent={() => setContentVisible(false)}>
      <View className="justify-between flex-1 pt-2">
        <View className="flex-1">
          <View className="bg-[#FEFDFD1A] mx-4 rounded-md flex flex-row justify-between items-center">
            <TextInput
              editable={!isDisable}
              placeholder="Enter Wallet Address / ENS"
              placeholderTextColor="gray"
              className="py-2 text-[#ffffff] font-[PlusJakartaSans-semiBold] px-2 w-[80%]"
              value={address}
              onChangeText={val => setAddress(val)}
            />
            <TouchableOpacity
              disabled={isDisable}
              activeOpacity={0.8}
              className="px-2"
              onPress={pasteClipboard}>
              <Image
                source={require('../../../assets/images/paste.png')}
                className="w-4 h-4"
              />
            </TouchableOpacity>
          </View>
          <View className="my-6">
            <FlatList
              data={balances}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={item => {
                return (
                  <View className="mx-3.5 flex flex-col items-center">
                    <TouchableOpacity
                      disabled={isDisable}
                      className={`border rounded-2xl p-1 w-12 h-12 ${
                        selectedCoin?.id === item.item.coin.id
                          ? 'border-[#fff]'
                          : 'border-[#fff0]'
                      }`}
                      onPress={() => setSelectedCoin(item.item.coin)}>
                      <View className="w-12 h-8">
                        <CoinLogo
                          symbol={item?.item?.coin?.logoURI}
                          chainId={item?.item?.coin?.chainId}
                        />
                      </View>
                    </TouchableOpacity>
                    <Text
                      className={
                        'text-[#ffffff] font-[PlusJakartaSans-semiBold] text-center text-xs mt-2'
                      }>
                      {item.item.value?.toFixed(4)} {item.item.coin.symbol}
                    </Text>
                  </View>
                );
              }}
            />
          </View>
          <View className="flex flex-col">
            <View className="flex-row items-end justify-center my-2">
              <Text className="text-[#ffffff] text-6xl font-[PlusJakartaSans-ExtraBold]">
                {value}
              </Text>
              <Text className="text-[#ffffff] font-[PlusJakartaSans-semiBold] text-lg mb-2 ml-2">
                {selectedCoin?.symbol}
              </Text>
            </View>
          </View>
          <View className="flex flex-row items-end justify-center">
            <Text className="text-[#ffffff] font-[PlusJakartaSans-semiBold] text-lg opacity-50">
              ${(parseFloat(value) * selectedCoin?.usdPrice).toFixed(4)}
            </Text>
          </View>
        </View>

        <CustomKeyboard
          inputValue={value}
          setInputValue={setValue}
          setIsDisabled={setIsDisable}
          loading={false}
          handlePreview={handlePreview}
          handleConfirm={handleSendTransaction}
        />
      </View>
    </DashboardLayout>
  );
};

export default SendPage;
