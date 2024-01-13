import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {toggleLoader} from '../../../redux/features/popupSlice';
import {createSmartAccount, createWallet} from '../../../helpers/wallet';
import {
  updatePrivateKey,
  updateSmartAccountAddress,
  updateWalletAddress,
} from '../../../redux/features/authSlice';
import EyeClose from '../../../assets/icons/svg/eye-hidden.svg';
import Eye from '../../../assets/icons/svg/eye.svg';
import {updateKeywords} from '../../../redux/features/onBoardingSlice';
import {createNewWallet} from '../../../apiCalls/wallet';
import {addSmartAccount} from '../../../apiCalls/auth';
import {
  updateKeywordsArray,
  updateSecureTextEntry1,
  updateSecureTextEntry2,
} from '../../../redux/features/keywordsSlice';
import {ToastShowShort} from '../../../utils/toast';
import LottieView from 'lottie-react-native';
import {colorThemes} from '../../../constants/themeData';
import {updateFileRecovered} from '../../../redux/features/fileShareSlice';
import CheckBox from '../../../components/common/CheckBox';
const {width} = Dimensions.get('screen');

const SetupWallet = ({next, toRecoverPage}: any) => {
  const dispatch = useAppDispatch();
  const {selectedTheme} = useAppSelector(state => state.selectedTheme);
  const {keywordsArray, secureTextEntry1, secureTextEntry2} = useAppSelector(
    state => state.keywords,
  );
  const {customerObject} = useAppSelector(state => state.onBoarding);
  const [checked, setChecked] = useState(false);
  const [isAllRequiredField, setIsAllRequiredField] = useState(true);

  function isDisabled() {
    return !(
      keywordsArray[0].length > 8 &&
      keywordsArray[1].length > 8 &&
      keywordsArray[0] !== keywordsArray[1] &&
      checked
    );
  }

  useEffect(() => {
    if (
      keywordsArray[0].length > 0 &&
      keywordsArray[1].length > 0 &&
      keywordsArray[0] === keywordsArray[1]
    ) {
      ToastShowShort('Please enter two distinct Keywords');
    }
  }, [keywordsArray]);

  const handleCreate = async () => {
    try {
      if (isDisabled()) {
        setIsAllRequiredField(false);
        return;
      }
      dispatch(toggleLoader());
      const wallet = await createWallet(customerObject.user.id!, keywordsArray);
      if (!wallet) {
        return;
      }
      const smartAccount = await createSmartAccount(wallet, 80001);
      if (!smartAccount) {
        return;
      }
      const address = await smartAccount.getAccountAddress();
      const walletAddress = wallet.address.toLowerCase();
      if (!address) {
        ToastShowShort('Internal error');
        dispatch(toggleLoader());
        return;
      }
      await addSmartAccount(address.toLowerCase());
      dispatch(updateKeywords(keywordsArray));
      dispatch(updateSmartAccountAddress(address));
      dispatch(updateWalletAddress(walletAddress));
      dispatch(updatePrivateKey(wallet.privateKey));
      await createNewWallet(address, walletAddress);
      dispatch(toggleLoader());
      next();
    } catch (e) {
      ToastShowShort('Internal error');
      dispatch(toggleLoader());
    }
  };
  return (
    // <View
    //   className="justify-between h-full pb-6 px-6 flex"
    //   style={{width: width}}>
    //   <View>
    //     <Text className="font-[PlusJakartaSans-SemiBold] text-xl text-[#FFFFFF] text-center">
    //       Setup Keywords for your Wallet
    //     </Text>
    //     <Text className="font-[PlusJakartaSans-SemiBold] text-xs text-[#999999] text-center mt-1">
    //       This will be used to recover your wallet:
    //     </Text>
    //     <View className="mt-6">
    //       <Text className="font-[PlusJakartaSans-SemiBold] text-base text-[#FEFDFD] mb-1">
    //         Keyword 1
    //       </Text>
    //       <View className="bg-[#2E304E] rounded-md border border-[#393B57] flex flex-row items-center px-2">
    //         <TextInput
    //           secureTextEntry={secureTextEntry1}
    //           className="flex-1 font-[PlusJakartaSans-SemiBold] text-[#ffffff]"
    //           value={keywordsArray[0]}
    //           onChangeText={(text: string) =>
    //             dispatch(updateKeywordsArray([text, keywordsArray[1]]))
    //           }
    //           placeholder="Enter distinct & unique keywords"
    //           placeholderTextColor="gray"
    //           autoCapitalize="none"
    //         />
    //         <Pressable
    //           onPress={() =>
    //             dispatch(updateSecureTextEntry1(!secureTextEntry1))
    //           }
    //           className="w-8 h-8 justify-center items-center">
    //           {secureTextEntry1 ? (
    //             <EyeClose height={25} width={25} />
    //           ) : (
    //             <Eye height={25} width={25} />
    //           )}
    //         </Pressable>
    //       </View>
    //     </View>
    //     <View className="mt-4">
    //       <Text className="font-[PlusJakartaSans-SemiBold] text-base text-[#FEFDFD] mb-1">
    //         Keyword 2
    //       </Text>
    //       <View className="bg-[#2E304E] rounded-md border border-[#393B57] flex flex-row items-center px-2">
    //         <TextInput
    //           secureTextEntry={secureTextEntry2}
    //           className="flex-1 font-[PlusJakartaSans-SemiBold] text-[#ffffff]"
    //           value={keywordsArray[1]}
    //           onChangeText={(text: string) =>
    //             dispatch(updateKeywordsArray([keywordsArray[0], text]))
    //           }
    //           placeholderTextColor="gray"
    //           placeholder="Enter distinct & unique keywords"
    //           autoCapitalize="none"
    //         />
    //         <Pressable
    //           onPress={() =>
    //             dispatch(updateSecureTextEntry2(!secureTextEntry2))
    //           }
    //           className="w-8 h-8 justify-center items-center">
    //           {secureTextEntry2 ? (
    //             <EyeClose height={25} width={25} />
    //           ) : (
    //             <Eye height={25} width={25} />
    //           )}
    //         </Pressable>
    //       </View>
    //     </View>
    //     <View className="h-12 flex flex-row items-center mt-2 mb-6 justify-center">
    //       <Text className="font-[PlusJakartaSans-SemiBold] text-[#ffffff] text-center ">
    //         Have a recovery file?{' '}
    //       </Text>
    //       <TouchableOpacity onPress={toRecoverPage}>
    //         <Text className="text-[#3675ff] ml-2">Recover Now.</Text>
    //       </TouchableOpacity>
    //     </View>
    //     <View className="flex items-center">
    //       <Checkbox
    //         isChecked={checked}
    //         value="test"
    //         onChange={() => setChecked(!checked)}>
    //         <Text className="font-[PlusJakartaSans-SemiBold] text-sm text-[#FFFFFF]">
    //           Agree to the Term & Privacy Policy
    //         </Text>
    //       </Checkbox>
    //     </View>
    //     <View className="flex flex-col mt-2">
    //       {keywordsArray[0].length &&
    //       keywordsArray[1].length &&
    //       keywordsArray[0] !== keywordsArray[1] ? (
    //         <View className="flex flex-row">
    //           <GreenTick width={20} height={15} />
    //           <Text className="text-semantic-success ml-2">
    //             Two words can not be same
    //           </Text>
    //         </View>
    //       ) : (
    //         <Text className="text-semantic-error">
    //           * Two words can not be same
    //         </Text>
    //       )}

    //       {keywordsArray[0].length &&
    //       keywordsArray[1].length &&
    //       keywordsArray[0] !== keywordsArray[1] ? (
    //         <View className="flex flex-row">
    //           <GreenTick width={20} height={15} />
    //           <Text className="text-semantic-success ml-2">
    //             This should be unique and not your name
    //           </Text>
    //         </View>
    //       ) : (
    //         <Text className="text-semantic-error">
    //           * This should be unique and not your name
    //         </Text>
    //       )}
    //       <Text className="text-semantic-warning mt-2">
    //         * This should be tough to guess for anyone apart from you
    //       </Text>
    //       <Text className="text-semantic-warning mt-2">
    //         * These will be used to recover your wallets so keep it safe
    //       </Text>
    //       <Text className="text-semantic-warning mt-2">
    //         * Porfo doesn't hold your private keys and recovery words, ensure
    //         they are safe
    //       </Text>
    //     </View>
    //   </View>

    //   <View className="flex flex-row items-center justify-between">
    //     <Logo />
    //     <TouchableOpacity
    //       className="bg-[#4845F8] px-8 py-3 rounded-full mb-2"
    //       onPress={handleCreate}>
    //       <Text className="font-[PlusJakartaSans-semiBold] text-sm text-[#FFFFFF]">
    //         Get Started
    //       </Text>
    //     </TouchableOpacity>
    //   </View>
    // </View>
    //..................below new design..............
    <View
      className="w-screen px-4 h-screen justify-between"
      style={{backgroundColor: colorThemes[selectedTheme].background}}>
      <LottieView
        source={require('../../../assets/lottie/LockAndKey.json')}
        autoPlay
        loop
        style={{width: width, height: '30%'}}
      />
      <Text
        className="font-[PlusJakartaSans-Bold] text-3xl"
        style={{color: colorThemes[selectedTheme].textPrimary}}>
        Magic Words
      </Text>
      <Text
        className="font-[PlusJakartaSans-semiBold] mt-2"
        style={{color: colorThemes[selectedTheme].textPrimary}}>
        Your wallet , Your keys.Enter set of unique keys to create wallet
      </Text>
      <View className="bg-[#2D2D2D] rounded-xl border bg-[#2D2D2D] h-12 flex flex-row items-center px-2 mt-4">
        <TextInput
          secureTextEntry={secureTextEntry1}
          className="flex-1 font-[PlusJakartaSans-SemiBold] text-[#ffffff]"
          value={keywordsArray[0]}
          onChangeText={(text: string) =>
            dispatch(updateKeywordsArray([text, keywordsArray[1]]))
          }
          placeholder="Enter distinct & unique keywords"
          placeholderTextColor="#484747"
          autoCapitalize="none"
        />
        <Pressable
          onPress={() => dispatch(updateSecureTextEntry1(!secureTextEntry1))}
          className="w-8 h-8 justify-center items-center">
          {secureTextEntry1 ? (
            <EyeClose height={25} width={25} />
          ) : (
            <Eye height={25} width={25} />
          )}
        </Pressable>
      </View>
      <View className="bg-[#2D2D2D] rounded-xl border h-12 flex flex-row items-center px-2 mt-2">
        <TextInput
          secureTextEntry={secureTextEntry2}
          className="flex-1 font-[PlusJakartaSans-SemiBold] text-[#ffffff]"
          value={keywordsArray[1]}
          onChangeText={(text: string) =>
            dispatch(updateKeywordsArray([keywordsArray[0], text]))
          }
          placeholderTextColor="#484747"
          placeholder="Enter distinct & unique keywords"
          autoCapitalize="none"
        />
        <Pressable
          onPress={() => dispatch(updateSecureTextEntry2(!secureTextEntry2))}
          className="w-8 h-8 justify-center items-center">
          {secureTextEntry2 ? (
            <EyeClose height={25} width={25} />
          ) : (
            <Eye height={25} width={25} />
          )}
        </Pressable>
      </View>
      <View className="h-12 flex flex-row items-center mt-2 justify-center">
        <Text className="font-[PlusJakartaSans-SemiBold] text-[#ffffff] text-center ">
          Have a recovery file?{' '}
        </Text>
        <TouchableOpacity
          onPress={() => {
            dispatch(updateFileRecovered(true));
            toRecoverPage();
          }}>
          <Text className="text-[#3675ff] ml-2">Recover Now.</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text
          className="font-[PlusJakartaSans-semiBold] mt-2"
          style={{
            color: `${
              keywordsArray[0].length &&
              keywordsArray[1].length &&
              keywordsArray[0] !== keywordsArray[1]
                ? colorThemes[selectedTheme].successGreen
                : colorThemes[selectedTheme].textPrimary
            }`,
          }}>
          Enter two unique keywords
        </Text>
        <Text
          className="font-[PlusJakartaSans-semiBold]"
          style={{
            color: `${
              keywordsArray[0].length &&
              keywordsArray[1].length &&
              keywordsArray[0] !== keywordsArray[1]
                ? colorThemes[selectedTheme].successGreen
                : colorThemes[selectedTheme].textPrimary
            }`,
          }}>
          Keywords can not be same
        </Text>
        <Text
          className="font-[PlusJakartaSans-semiBold]"
          style={{
            color: `${
              keywordsArray[0].length > 8 &&
              keywordsArray[1].length > 8 &&
              keywordsArray[0] !== keywordsArray[1]
                ? colorThemes[selectedTheme].successGreen
                : colorThemes[selectedTheme].textPrimary
            }`,
          }}>
          Keywords should be bigger than 8 characters
        </Text>
        <Text
          className="font-[PlusJakartaSans-semiBold]"
          style={{
            color: `${
              checked
                ? colorThemes[selectedTheme].successGreen
                : colorThemes[selectedTheme].textPrimary
            }`,
          }}>
          Agree to the terms and privacy policy
        </Text>
        <Text
          className="font-[PlusJakartaSans-semiBold]"
          style={{
            color: `${
              isDisabled()
                ? colorThemes[selectedTheme].textPrimary
                : colorThemes[selectedTheme].successGreen
            }`,
          }}>
          You are ready to create wallet
        </Text>
      </View>
      <View className="w-full mb-2 mt-8">
        <View className="flex flex-row gap-x-2 items-center mt-4 justify-center">
          <CheckBox isChecked={checked} setIsChecked={setChecked} />
          <Text className="font-[PlusJakartaSans-SemiBold] text-sm text-[#FFFFFF]">
            Agree to the
          </Text>
          <TouchableOpacity>
            <Text
              className="font-[PlusJakartaSans-Bold] text-center"
              style={{
                color: colorThemes[selectedTheme].textSecondary,
              }}>
              Term & Privacy Policy
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          disabled={isDisabled()}
          onPress={handleCreate}
          className={`py-3 rounded-full mt-4 ${
            isDisabled() ? 'opacity-50' : 'opacity-100'
          }`}
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
    </View>
  );
};

export default SetupWallet;
