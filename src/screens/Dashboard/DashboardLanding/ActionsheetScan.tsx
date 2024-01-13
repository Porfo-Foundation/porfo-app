import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
  Image,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import React, { useEffect, useState, useContext } from 'react';

import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { colorThemes } from '../../../constants/themeData';
import { ModalCamera } from '../../../components/common/ModalCamera';
import useBalances from '../../../hooks/reactQuery/apiHooks/useBalances';
import CoinLogo from '../../../components/coindetails/CoinLogo';
import { showAmount } from '../../../helpers/showAmount';
import { ModalKeyboard } from '../CustomKeyboard/ModalKeyboard';
import {
  handleTrxnConfirmation,
  sendTransaction,
} from '../../../helpers/transactions';
import { WalletContext } from '../../../context/WalletContext';
import { ethers } from 'ethers';
import {
  updateNotification,
  updateNotificationType,
} from '../../../redux/features/notificationSlice';
import { updateSelectedBalance } from '../../../redux/features/mainSlice';
import { EmptyBalance } from '../../../helpers/coin';
import { ToastShowShort } from '../../../utils/toast';
import { togglePopup } from '../../../redux/features/popupSlice';

const ActionsheetScan = ({ isOpen, onClose }: any) => {
  const dispatch = useAppDispatch();
  const { selectedTheme } = useAppSelector(state => state.selectedTheme);
  const { selectedBalance } = useAppSelector(state => state.main);
  const [address, setAddress] = useState('');
  const [isDisable, setIsDisable] = useState(false);
  const [isKbDisabled, setIsKbDisabled] = useState(false);
  const [step, setStep] = useState(1);
  const [value, setValue] = useState('0');
  const pasteClipboard = async () => {
    const clipboardText = await Clipboard.getString();
    setAddress(clipboardText);
  };
  const { data: balanceData } = useBalances();
  const balances = balanceData?.balances || [];
  // const [selectedCoin, setSelectedCoin] = useState(balances[0]?.coin);
  // const [selectedBalance, setSelectedBalance] = useState(balances[0]);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const { smartAccounts } = useContext(WalletContext);
  const [sendProgress, setSendProgress] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  // console.log('smartAccounts', smartAccounts);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleClose = () => {
    dispatch(updateNotification(true));
    dispatch(updateNotificationType('pending'));
    dispatch(updateSelectedBalance(EmptyBalance));
    setStep(1);
    dispatch(togglePopup());
    // dispatch(updateSelectedBalance(EmptyBalance));
    // onClose();
  };
  const handlePreview = () => {
    if (Number(value) > selectedBalance?.value) {
      return ToastShowShort('Insufficient balance');
    }
    const previewData = {
      address: address,
      sendAmount:
        '' +
        value +
        selectedBalance?.coin.symbol +
        '($' +
        showAmount(parseFloat(value) * selectedBalance?.coin.usdPrice) +
        ')',
    };
    return previewData;
  };

  const handleSendTransaction = async () => {
    const smartAccount = smartAccounts[selectedBalance?.coin.chainId];
    if (!smartAccount) {
      return ToastShowShort('Smart Account not found');
    }
    setSendProgress(true);
    try {
      const userOpResponse = await sendTransaction(
        smartAccount,
        ethers.utils.parseUnits(value, selectedBalance?.coin.decimals),
        address,
        selectedBalance?.coin.address,
        selectedBalance?.coin,
        null,
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

        handleClose();
      }
    } catch (error) {
      console.log('error in sending transation...', error);
      ToastShowShort('' + error);
    }
  };

  const handleNextStep = () => {
    if (selectedBalance?.coin?.id === '') {
      setStep(2);
    } else {
      setStep(3);
    }
  };

  return (
    <View className="w-full px-3">
      {step === 1 && (
        <>
          {showScanner ? (
            <View>
              <Text
                className="font-[PlusJakartaSans-SemiBold] text-center text-xl"
                style={{
                  color: colorThemes[selectedTheme].textDefault,
                }}>
                Scan
              </Text>
              <View className='h-[85%]'>
                <ModalCamera setAddress={setAddress} setStep={setStep} />
              </View>
              <TouchableOpacity
                className="py-3 rounded-full"
                onPress={() => setShowScanner(false)}
                activeOpacity={0.7}
                style={{
                  backgroundColor: colorThemes[selectedTheme].textSecondary,
                }}>
                <Text
                  className="font-[PlusJakartaSans-Bold] text-lg text-center"
                  style={{
                    color: colorThemes[selectedTheme].textPrimary,
                  }}>
                  Enter Address
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <TouchableOpacity
                className="m-10 rounded-md self-center"
                onPress={() => setShowScanner(true)}
                activeOpacity={0.7}
                >
                <Image
                  source={require('../../../assets/icons/svg/scan.png')}
                  className="w-20 h-20"
                />
                <Text className="font-[PlusJakartaSans-Bold] text-xs text-center mt-2">
                  Scan QR Code
                </Text>
              </TouchableOpacity>
              <Text
                className="font-[PlusJakartaSans-semiBold]"
                style={{ color: colorThemes[selectedTheme].textDefault }}>
                Enter Wallet Address / ENS
              </Text>
              <View
                className="rounded-xl flex-row items-center border mt-1"
                style={{ borderColor: colorThemes[selectedTheme].textDefault }}>
                <TextInput
                  editable={!isDisable}
                  placeholderTextColor="gray"
                  className="py-2 font-[PlusJakartaSans-semiBold] px-2 flex-1"
                  style={{
                    color: colorThemes[selectedTheme].textDefault,
                  }}
                  value={address}
                  onChangeText={val => setAddress(val)}
                />
                <TouchableOpacity
                  disabled={isDisable}
                  activeOpacity={0.8}
                  className="px-2"
                  onPress={pasteClipboard}>
                  {colorThemes[selectedTheme].pasteIcon}
                </TouchableOpacity>
              </View>
              <Text
                className="font-[PlusJakartaSans-semiBold] mt-2"
                style={{ color: colorThemes[selectedTheme].textSecondary }}>
                Recents
              </Text>
              <ScrollView horizontal className="gap-x-4 mt-2">
                <TouchableOpacity className="items-center">
                  <Image
                    source={require('../../../assets/images/recent-avatar-1.png')}
                    className="w-10 h-10"
                  />
                  <Text
                    className="font-[PlusJakartaSans-semiBold] mt-2"
                    style={{ color: colorThemes[selectedTheme].textDefault }}>
                    soneshwar.porfo
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity className="items-center">
                  <Image
                    source={require('../../../assets/images/recent-avatar-2.png')}
                    className="w-10 h-10"
                  />
                  <Text
                    className="font-[PlusJakartaSans-semiBold] mt-2"
                    style={{ color: colorThemes[selectedTheme].textDefault }}>
                    sushant.porfo
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity className="items-center">
                  <Image
                    source={require('../../../assets/images/recent-avatar-3.png')}
                    className="w-10 h-10"
                  />
                  <Text
                    className="font-[PlusJakartaSans-semiBold] mt-2"
                    style={{ color: colorThemes[selectedTheme].textDefault }}>
                    vestor.porfo
                  </Text>
                </TouchableOpacity>
              </ScrollView>
              <TouchableOpacity
                className="py-3 rounded-full mt-4"
                onPress={handleNextStep}
                activeOpacity={0.7}
                style={{
                  backgroundColor: colorThemes[selectedTheme].textSecondary,
                }}>
                <Text
                  className="font-[PlusJakartaSans-Bold] text-lg text-center"
                  style={{
                    color: colorThemes[selectedTheme].textPrimary,
                  }}>
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
      {step === 2 && (
        <>
          <TouchableOpacity className="p-2" onPress={() => setStep(1)}>
            {colorThemes[selectedTheme].modalBackArrow}
          </TouchableOpacity>
          <Text
            className="font-[PlusJakartaSans-SemiBold] text-center text-xl mb-2"
            style={{
              color: colorThemes[selectedTheme].textDefault,
            }}>
            Select Token
          </Text>
          <FlatList
            data={balances}
            // horizontal
            // showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    dispatch(updateSelectedBalance(item));
                    setStep(3);
                  }}>
                  <View
                    key={index}
                    className="flex-row items-center gap-x-3 py-4"
                    style={{
                      borderBottomWidth: index + 1 == balances.length ? 0 : 1,
                      borderBottomColor:
                        colorThemes[selectedTheme].textPrimaryMuted,
                    }}>
                    <View className="w-12 h-8">
                      <CoinLogo
                        symbol={item?.coin?.symbol}
                        chainId={item?.coin?.chainId}
                      />
                    </View>
                    <View className="flex-1">
                      <Text
                        className="font-[PlusJakartaSans-SemiBold] text-sm"
                        style={{
                          color: colorThemes[selectedTheme].textDefault,
                        }}>
                        {item.coin.symbol}
                      </Text>
                      <Text
                        className="font-[PlusJakartaSans-SemiBold] text-lg"
                        style={{
                          color: colorThemes[selectedTheme].textDefault,
                        }}>
                        {showAmount(item.value)} {item.coin.symbol}
                      </Text>
                    </View>
                    <View>
                      <Text
                        className="font-[PlusJakartaSans-SemiBold] text-lg"
                        style={{
                          color: colorThemes[selectedTheme].textDefault,
                        }}>
                        ${showAmount(item.value * item.coin.usdPrice)}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </>
      )}
      {step === 3 && (
        <View>
          <View className="flex-row items-center justify-between">
            <TouchableOpacity className="p-2" onPress={() => setStep(2)}>
              {colorThemes[selectedTheme].modalBackArrow}
            </TouchableOpacity>
            <View className="flex-row items-center">
              <View className="w-12 h-8">
                <CoinLogo
                  symbol={selectedBalance?.coin.symbol}
                  chainId={selectedBalance?.coin.chainId}
                />
              </View>
              <View>
                <Text
                  className="font-[PlusJakartaSans-SemiBold] text-lg"
                  style={{
                    color: colorThemes[selectedTheme].textDefault,
                  }}>
                  {showAmount(selectedBalance?.value)}
                </Text>
                <Text
                  className="font-[PlusJakartaSans-SemiBold] text-xs"
                  style={{
                    color: colorThemes[selectedTheme].textMuted,
                  }}>
                  $
                  {showAmount(
                    selectedBalance?.value * selectedBalance?.coin.usdPrice,
                  )}
                </Text>
              </View>
            </View>
          </View>
          <View className="flex flex-col">
            <View className="flex-row items-end justify-center mt-2">
              <Text
                className="text-6xl font-[PlusJakartaSans-ExtraBold]"
                style={{
                  color: colorThemes[selectedTheme].textDefault,
                }}>
                {value}
              </Text>
              <Text
                className="font-[PlusJakartaSans-semiBold] text-lg mb-2 ml-2"
                style={{
                  color: colorThemes[selectedTheme].textDefault,
                }}>
                {selectedBalance?.coin.symbol}
              </Text>
            </View>
          </View>
          <View className="flex flex-row items-end justify-center mb-6">
            <Text
              className="font-[PlusJakartaSans-semiBold] text-lg opacity-50"
              style={{
                color: colorThemes[selectedTheme].textDefault,
              }}>
              ${showAmount(parseFloat(value) * selectedBalance?.coin.usdPrice)}
            </Text>
          </View>
          <View
            className="h-px w-full opacity-10 mb-4"
            style={{
              backgroundColor: colorThemes[selectedTheme].background,
            }}></View>
          <ModalKeyboard
            inputValue={value}
            setInputValue={setValue}
            setIsDisabled={setIsKbDisabled}
            loading={false}
            handlePreview={handlePreview}
            handleConfirm={handleSendTransaction}
          />
        </View>
      )}
    </View>
  );
};

export default ActionsheetScan;
