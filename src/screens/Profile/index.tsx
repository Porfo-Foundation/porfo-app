import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Linking,
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import RightArrow from '../../assets/icons/svg/right-arrow-yellow.svg';
import LeftArrow from '../../assets/icons/svg/left-arrow-yellow.svg';
import RightArrowButton from '../../assets/icons/svg/right-arrow-button.svg';
import {getUserName} from '../../apiCalls/profile';
import {
  updatepopupName,
  togglePopup,
  updatePnsProfile,
} from '../../redux/features/popupSlice';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {EmptyPnsProfile} from '../../helpers/pns';
import QRCode from 'react-native-qrcode-svg';
import colors from '../../../config/colors';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {linkUserProfile} from '../../apiCalls/user';
import {toggleLoader} from '../../redux/features/popupSlice';
import {useNotp} from '../../hooks/useNotp';
import {updateCustomerObject} from '../../redux/features/onBoardingSlice';
import {colorThemes} from '../../constants/themeData';
import BottomBarBack from '../../components/common/BottomBarBack';
import {ToastShowShort} from '../../utils/toast';
import {QRCODEURL} from '../../config/config';
import LottieView from 'lottie-react-native';

const {width, height} = Dimensions.get('screen');

const Profile = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const {customerObject} = useAppSelector(state => state.onBoarding);
  const {notpLinkData, notpCheckData, startCheck} = useNotp();
  const {pnsProfile} = useAppSelector(state => state.popup);
  const scrollViewRef = useRef<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const handleUserName = async () => {
      try {
        const user = await getUserName();
        // console.log('user name ...', user);
        // console.log('subdoman...', user.pnsProfile.subdomains);
        if (user?.message === 'Profile not found') {
          dispatch(updatePnsProfile(EmptyPnsProfile));
        } else {
          dispatch(updatePnsProfile(user.pnsProfile));
        }
      } catch (error) {
        console.log('error...', error);
      }
    };
    handleUserName();
  }, [dispatch]);

  // adding card
  const handleAddCard = () => {
    if (pnsProfile.userName === '') {
      dispatch(updatepopupName('AddUserName'));
      dispatch(togglePopup());
    }
  };

  // updating left right arrow
  const screenWidth = width * 0.9;

  const handleRightArrowClick = () => {
    if (currentIndex < pnsProfile.subdomains.length) {
      setCurrentIndex(currentIndex + 1);
      scrollToIndex(currentIndex + 1);
    }
  };

  const handleLeftArrowClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      scrollToIndex(currentIndex - 1);
    }
  };

  const scrollToIndex = (index: number) => {
    if (scrollViewRef.current) {
      const xOffset = index * screenWidth; // Assuming each element has the same width
      scrollViewRef.current.scrollTo({x: xOffset, animated: true});
    }
  };

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / screenWidth);
    setCurrentIndex(index);
  };

  // link emailId
  const linkEmailId = async () => {
    try {
      dispatch(toggleLoader());
      GoogleSignin.configure();
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const res = await linkUserProfile(
        userInfo.user.email,
        customerObject.user.mobile,
      );

      dispatch(toggleLoader());
      if (res.user) {
        let obj = {
          isRecoveryAvailable: customerObject.isRecoveryAvailable,
          tokens: customerObject.tokens,
          user: res.user,
        };
        dispatch(updateCustomerObject(obj));
      }
      if (res.message === 'Email already taken') {
        ToastShowShort('This Email Id is already Linked with another account');
      }
      // You can now use userInfo to access user details like userInfo.user.email, userInfo.user.name, etc.
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('Google Sign-In Cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Google Sign-In is in progress.');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Google Play Services is not available.');
      } else {
        console.log('Google Sign-In Error:', error);
      }
    }
  };

  // link mobile number
  const linkMobileNumber = async () => {
    try {
      dispatch(toggleLoader());
      Linking.openURL(notpLinkData.waLink);
      startCheck(notpLinkData.org);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const handleNotpVerificationSuccess = async () => {
      try {
        if (notpCheckData.waId) {
          console.log('NOTP Verification Success');
          const res = await linkUserProfile(
            customerObject.user.email,
            notpCheckData.waId,
          );

          dispatch(toggleLoader());
          if (res.user) {
            let obj = {
              isRecoveryAvailable: customerObject.isRecoveryAvailable,
              tokens: customerObject.tokens,
              user: res.user,
            };
            dispatch(updateCustomerObject(obj));
          }
          if (res.message === 'Mobile already taken') {
            ToastShowShort(
              'This Mobile Number is already Linked with another account',
            );
          }
        }
      } catch (e) {
        console.log(e);
        dispatch(toggleLoader());
      }
    };
    handleNotpVerificationSuccess();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notpCheckData]);
  const {selectedTheme} = useAppSelector(state => state.selectedTheme);

  return (
    // <View
    //   className="pt-4"
    //   style={{
    //     minHeight: height - 70,
    //     backgroundColor: colorThemes[selectedTheme]['background'],
    //   }}>
    //   <BottomBarBack />
    //   <ScrollView className="w-full h-full pb-10">
    //     <View className="flex-row items-center justify-between mx-4">
    //       <View className="w-[60%]">
    //         <Text
    //           className="font-[PlusJakartaSans-SemiBold] text-xl"
    //           style={{color: colorThemes[selectedTheme].textPrimary}}>
    //           Welcome, {pnsProfile?.name}
    //         </Text>
    //         <View className="flex flex-row mt-2">
    //           <Text
    //             className="font-[PlusJakartaSans-SemiBold] text-xs"
    //             style={{color: colorThemes[selectedTheme].textPrimary}}>
    //             {pnsProfile?.userName}
    //           </Text>
    //           {pnsProfile?.userName === '' ? (
    //             <TouchableOpacity
    //               onPress={() => {
    //                 dispatch(updatepopupName('AddUserName'));
    //                 dispatch(togglePopup());
    //               }}>
    //               <Text
    //                 className="font-[PlusJakartaSans-SemiBold] text-sm ml-2"
    //                 style={{
    //                   color: colorThemes[selectedTheme].textTertiary,
    //                 }}>
    //                 Claim Username
    //               </Text>
    //             </TouchableOpacity>
    //           ) : null}
    //         </View>
    //       </View>
    //       <View>
    //         <Image source={require('../../assets/images/pfp.png')} />
    //       </View>
    //     </View>
    //     {pnsProfile?.userName !== '' ? (
    //       <View className="flex-row items-center my-2">
    //         <TouchableOpacity
    //           disabled={currentIndex === 0 ? true : false}
    //           onPress={handleLeftArrowClick}
    //           className={`${
    //             currentIndex === 0 ? 'opacity-40' : 'opacity-400'
    //           }`}>
    //           <LeftArrow />
    //         </TouchableOpacity>
    //         <ScrollView
    //           ref={scrollViewRef}
    //           horizontal
    //           pagingEnabled
    //           onScroll={handleScroll}>
    //           <View
    //             className=" flex-1 bg-[#171A3B] p-3 flex-row gap-x-2 rounded-xl"
    //             style={{
    //               width: screenWidth, // Assuming all elements have the same width
    //             }}>
    //             <View className="p-1 justify-center items-center">
    //               <QRCode
    //                 value={`${pnsProfile?.pointer}`}
    //                 size={100}
    //                 color={colors.neutral[100]}
    //                 backgroundColor="#0D2B59"
    //               />
    //             </View>
    //             <View className="justify-between flex-1">
    //               <View>
    //                 <Text
    //                   className="font-[PlusJakartaSans-SemiBold] text-xl"
    //                   style={{color: colorThemes[selectedTheme].textPrimary}}>
    //                   Main
    //                 </Text>
    //                 <Text
    //                   className="font-[PlusJakartaSans-SemiBold] text-xs"
    //                   style={{color: colorThemes[selectedTheme].textPrimary}}>
    //                   wallet@{pnsProfile?.userName}
    //                 </Text>
    //               </View>
    //               <View className="flex-row justify-between items-center opacity-40">
    //                 <View className="flex-row items-center gap-x-2">
    //                   <Image
    //                     source={require('../../assets/images/icon-1.png')}
    //                     className="w-6 h-6"
    //                   />
    //                   <Image
    //                     source={require('../../assets/images/icon-1.png')}
    //                     className="w-6 h-6"
    //                   />
    //                   <Image
    //                     source={require('../../assets/images/icon-1.png')}
    //                     className="w-6 h-6"
    //                   />
    //                 </View>
    //                 <RightArrowButton />
    //               </View>
    //             </View>
    //           </View>
    //           {pnsProfile?.subdomains?.map((subdomain: any, index: number) => {
    //             return (
    //               <View
    //                 key={index}
    //                 style={{
    //                   width: screenWidth, // Assuming all elements have the same width
    //                 }}
    //                 className="flex-1 bg-[#171A3B] p-3 flex-row gap-x-2 rounded-xl ml-2">
    //                 <View className="p-1 justify-center items-center">
    //                   <QRCode
    //                     value={`${subdomain?.pointer}`}
    //                     size={100}
    //                     color={colors.neutral[100]}
    //                     backgroundColor="#0D2B59"
    //                   />
    //                 </View>
    //                 <View className="justify-between flex-1">
    //                   <View>
    //                     <Text
    //                       className="font-[PlusJakartaSans-SemiBold] text-xl"
    //                       style={{
    //                         color: colorThemes[selectedTheme].textPrimary,
    //                       }}>
    //                       {subdomain?.name}
    //                     </Text>
    //                     <Text
    //                       className="font-[PlusJakartaSans-SemiBold] text-xs"
    //                       style={{
    //                         color: colorThemes[selectedTheme].textPrimary,
    //                       }}>
    //                       {subdomain?.name}@{pnsProfile?.userName}
    //                     </Text>
    //                   </View>
    //                   <View className="flex-row justify-between items-center opacity-40">
    //                     <View className="flex-row items-center gap-x-2">
    //                       <Image
    //                         source={require('../../assets/images/icon-1.png')}
    //                         className="w-6 h-6"
    //                       />
    //                       <Image
    //                         source={require('../../assets/images/icon-1.png')}
    //                         className="w-6 h-6"
    //                       />
    //                       <Image
    //                         source={require('../../assets/images/icon-1.png')}
    //                         className="w-6 h-6"
    //                       />
    //                     </View>
    //                     <TouchableOpacity>
    //                       <RightArrowButton />
    //                     </TouchableOpacity>
    //                   </View>
    //                 </View>
    //               </View>
    //             );
    //           })}
    //         </ScrollView>
    //         <TouchableOpacity
    //           disabled={
    //             currentIndex === pnsProfile?.subdomains?.length ? true : false
    //           }
    //           onPress={handleRightArrowClick}
    //           className={`${
    //             currentIndex === pnsProfile?.subdomains?.length
    //               ? 'opacity-40'
    //               : 'opacity-400'
    //           }`}>
    //           <RightArrow />
    //         </TouchableOpacity>
    //       </View>
    //     ) : (
    //       <View className="w-[90%] h-36 bg-[#171A3B] p-3 flex-row gap-x-2 rounded-xl my-4 self-center justify-center items-center">
    //         <Text
    //           className="text-3xl"
    //           style={{color: colorThemes[selectedTheme].textPrimary}}>
    //           No Card
    //         </Text>
    //       </View>
    //     )}
    //     <View className="px-4">
    //       <View className="flex-row gap-x-3">
    //         <TouchableOpacity
    //           disabled
    //           className="rounded py-2 flex-1 opacity-30"
    //           style={{
    //             backgroundColor: colorThemes[selectedTheme].textTertiary,
    //           }}>
    //           <Text
    //             className="font-[PlusJakartaSans-SemiBold] text-base text-center"
    //             style={{color: colorThemes[selectedTheme].textPrimary}}>
    //             Remove Card
    //           </Text>
    //         </TouchableOpacity>
    //         <TouchableOpacity
    //           onPress={handleAddCard}
    //           className="rounded py-2 flex-1"
    //           style={{
    //             backgroundColor: colorThemes[selectedTheme].textSecondary,
    //           }}>
    //           <Text
    //             className="font-[PlusJakartaSans-SemiBold] textbase text-center"
    //             style={{color: colorThemes[selectedTheme].textPrimary}}>
    //             Add Card
    //           </Text>
    //         </TouchableOpacity>
    //       </View>
    //       <View className="flex-row text-center justify-center my-4 items-center opacity-40">
    //         <Text
    //           className="font-[PlusJakartaSans-SemiBold] text-xs text-center"
    //           style={{color: colorThemes[selectedTheme].textPrimary}}>
    //           Withdraw some funds to Main Wallet or Vault.
    //         </Text>
    //         <Text
    //           className="font-[PlusJakartaSans-Bold] text-sm text-center ml-1"
    //           style={{color: colorThemes[selectedTheme].textTertiary}}>
    //           Click Here
    //         </Text>
    //       </View>
    //     </View>
    //     <View className="mx-4">
    //       <TouchableOpacity
    //         activeOpacity={0.8}
    //         onPress={() => {
    //           dispatch(updatepopupName('AddUserName'));
    //           dispatch(togglePopup());
    //         }}
    //         className="border-b flex-row gap-x-2 py-3 px-2 items-center mx-0 justify-between"
    //         style={{borderColor: colorThemes[selectedTheme].seperatorColor}}>
    //         {/* <Mint /> */}
    //         <Text
    //           className="font-[PlusJakartaSans-semiBold] text-lg"
    //           style={{color: colorThemes[selectedTheme].textPrimary}}>
    //           Create Payment Address
    //         </Text>
    //         {colorThemes[selectedTheme].rightArrowIcon}
    //       </TouchableOpacity>
    //       <TouchableOpacity
    //         disabled
    //         activeOpacity={0.8}
    //         className="border-b flex-row gap-x-2 py-3 px-2 items-center mx-0 opacity-40 justify-between"
    //         style={{borderColor: colorThemes[selectedTheme].seperatorColor}}>
    //         <Text
    //           className="font-[PlusJakartaSans-semiBold] text-lg"
    //           style={{color: colorThemes[selectedTheme].textPrimary}}>
    //           Move Funds To Vault
    //         </Text>
    //         {colorThemes[selectedTheme].rightArrowIcon}
    //       </TouchableOpacity>
    //       <TouchableOpacity
    //         disabled
    //         activeOpacity={0.8}
    //         className="border-b flex-row gap-x-2 py-3 px-2 items-center mx-0 opacity-40 justify-between"
    //         style={{borderColor: colorThemes[selectedTheme].seperatorColor}}>
    //         <Text
    //           className="font-[PlusJakartaSans-semiBold] text-lg"
    //           style={{color: colorThemes[selectedTheme].textPrimary}}>
    //           Export Vault Private Key
    //         </Text>
    //         {colorThemes[selectedTheme].rightArrowIcon}
    //       </TouchableOpacity>
    //     </View>
    //     <View className="mx-4 gap-y-2.5">
    //       <TouchableOpacity
    //         disabled
    //         activeOpacity={0.8}
    //         className="border-b flex-row gap-x-2 py-3 px-2 items-center mx-0 opacity-40 justify-between"
    //         style={{borderColor: colorThemes[selectedTheme].seperatorColor}}>
    //         <Text
    //           className="font-[PlusJakartaSans-semiBold] text-lg"
    //           style={{color: colorThemes[selectedTheme].textPrimary}}>
    //           Store Recovery File To Cloud
    //         </Text>
    //         {colorThemes[selectedTheme].rightArrowIcon}
    //       </TouchableOpacity>
    //       <TouchableOpacity
    //         disabled
    //         activeOpacity={0.8}
    //         className="border-b flex-row gap-x-2 py-3 px-2 items-center mx-0 opacity-40 justify-between">
    //         <Text
    //           className="font-[PlusJakartaSans-semiBold] text-lg"
    //           style={{color: colorThemes[selectedTheme].textPrimary}}>
    //           Enable 2FA on Recovery
    //         </Text>
    //         {colorThemes[selectedTheme].rightArrowIcon}
    //       </TouchableOpacity>
    //     </View>
    //     <View className="flex-row items-center justify-around mx-8 mt-4 mb-20">
    //       <View className="flex-col items-center gap-y-1">
    //         {colorThemes[selectedTheme].whatsapp}
    //         {customerObject?.user?.mobile ? (
    //           <Text className="font-[PlusJakartaSans-semiBold] text-[#3897E3]">
    //             Linked
    //           </Text>
    //         ) : (
    //           <TouchableOpacity activeOpacity={0.8} onPress={linkMobileNumber}>
    //             <Text
    //               className="font-[PlusJakartaSans-semiBold]"
    //               style={{color: colorThemes[selectedTheme].textTertiary}}>
    //               Link Now
    //             </Text>
    //           </TouchableOpacity>
    //         )}
    //       </View>
    //       <View className="flex-col items-center gap-y-1">
    //         {colorThemes[selectedTheme].gmail}
    //         {customerObject?.user?.email ? (
    //           <Text className="font-[PlusJakartaSans-semiBold] text-[#3897E3]">
    //             Linked
    //           </Text>
    //         ) : (
    //           <TouchableOpacity activeOpacity={0.8} onPress={linkEmailId}>
    //             <Text
    //               className="font-[PlusJakartaSans-semiBold]"
    //               style={{color: colorThemes[selectedTheme].textTertiary}}>
    //               Link Now
    //             </Text>
    //           </TouchableOpacity>
    //         )}
    //       </View>
    //       <View className="flex-col items-center gap-y-1 opacity-40">
    //         {colorThemes[selectedTheme].discord}
    //         <Text
    //           className="font-[PlusJakartaSans-semiBold]"
    //           style={{color: colorThemes[selectedTheme].textTertiary}}>
    //           Link Now
    //         </Text>
    //       </View>
    //     </View>
    //   </ScrollView>
    // </View>
    //...................... 2nd design.....................
    // <View
    //   className="w-full"
    //   style={{
    //     backgroundColor: colorThemes[selectedTheme]['background'],
    //   }}>
    //   <View
    //     className="w-full h-24 flex flex-row items-center"
    //     style={{
    //       backgroundColor: colorThemes[selectedTheme].textSecondary,
    //     }}>
    //     <Image
    //       source={require('../../assets/images/profile-avatar.png')}
    //       className="w-24 h-24 rounded-full"
    //     />
    //     <View>
    //       <View className="w-[70%] flex flex-row justify-between">
    //         <View>
    //           <Text
    //             className="font-[PlusJakartaSans-semiBold]"
    //             style={{color: colorThemes[selectedTheme].textPrimary}}>
    //             {/* Anonymous */}
    //             Welcome, {pnsProfile?.name}
    //           </Text>
    //           <TouchableOpacity
    //             onPress={() => {
    //               dispatch(updatepopupName('AddUserName'));
    //               dispatch(togglePopup());
    //             }}>
    //             <Text
    //               className="font-[PlusJakartaSans-semiBold]"
    //               style={{color: colorThemes[selectedTheme].textTertiary}}>
    //               claim username
    //             </Text>
    //           </TouchableOpacity>
    //         </View>
    //         <Text
    //           className="font-[PlusJakartaSans-semiBold]"
    //           style={{color: colorThemes[selectedTheme].textTertiary}}>
    //           Golden Boy
    //         </Text>
    //       </View>
    //       <View className="w-[75%] flex flex-row mt-2 justify-between items-center">
    //         <View
    //           className="flex-1 h-3 rounded-md"
    //           style={{
    //             backgroundColor: colorThemes[selectedTheme].textPrimary,
    //           }}>
    //           <View
    //             className="w-[70%] h-3 rounded-md"
    //             style={{
    //               backgroundColor: colorThemes[selectedTheme].textTertiary,
    //             }}
    //           />
    //         </View>
    //         <Image
    //           source={require('../../assets/images/profile-beer.png')}
    //           className="w-5 h-6 ml-2"
    //         />
    //         <View className="w-14 mr-2">
    //           <Text
    //             className="font-[PlusJakartaSans-semiBold] text-center text-xs"
    //             style={{color: colorThemes[selectedTheme].textPrimary}}>
    //             BEAR HOLDER
    //           </Text>
    //         </View>
    //       </View>
    //     </View>
    //   </View>
    //   <View className="w-full p-3">
    //     <View className="flex flex-row gap-x-4 items-center">
    //       <View
    //         className="w-32 h-44 rounded-md justify-end items-center"
    //         style={{
    //           backgroundColor: colorThemes[selectedTheme].textPrimary,
    //         }}>
    //         <View className="w-full flex-row justify-center items-center">
    //           <View
    //             className="w-[70%] h-2"
    //             style={{
    //               backgroundColor: colorThemes[selectedTheme].textTertiary,
    //             }}
    //           />
    //           <Image
    //             source={require('../../assets/images/etherium-logo.png')}
    //             className="w-5 h-5"
    //           />
    //         </View>
    //         <Image
    //           source={require('../../assets/images/qr-full.png')}
    //           // source={{uri: `${QRCODEURL}`}}
    //           className="w-24 h-20"
    //         />
    //         <View className="w-full justify-center items-center">
    //           <Text
    //             className="font-[PlusJakartaSans-Bold]"
    //             style={{color: colorThemes[selectedTheme].background}}>
    //             Savings
    //           </Text>
    //           <Text
    //             className="font-[PlusJakartaSans-semiBold]"
    //             style={{color: colorThemes[selectedTheme].background}}>
    //             soneshwar.porfo
    //           </Text>
    //         </View>

    //         <TouchableOpacity
    //           className="w-full h-7 items-center justify-center rounded-bl-md rounded-br-md mt-1"
    //           style={{
    //             backgroundColor: colorThemes[selectedTheme].textSecondary,
    //           }}>
    //           <Text
    //             className="font-[PlusJakartaSans-semiBold]"
    //             style={{color: colorThemes[selectedTheme].textPrimary}}>
    //             VIEW DETAILS
    //           </Text>
    //         </TouchableOpacity>
    //       </View>
    //       <View
    //         className="w-32 h-36 rounded-md justify-end items-center"
    //         style={{
    //           backgroundColor: colorThemes[selectedTheme].textPrimary,
    //         }}>
    //         <Image
    //           source={require('../../assets/images/qr-full.png')}
    //           className="w-20 h-20"
    //         />

    //         {/* <Image source={{uri: `${QRCODEURL}`}} className="w-20 h-20" /> */}
    //         <TouchableOpacity
    //           className="w-full h-10 items-center justify-center rounded-bl-md rounded-br-md mt-3"
    //           style={{
    //             backgroundColor: colorThemes[selectedTheme].textTertiary,
    //           }}>
    //           <Text
    //             className="font-[PlusJakartaSans-semiBold]"
    //             style={{color: colorThemes[selectedTheme].textPrimary}}>
    //             ADD NEW
    //           </Text>
    //         </TouchableOpacity>
    //       </View>
    //     </View>
    //     <View className="w-full h-60 rounded-md mt-4">
    //       <ImageBackground
    //         source={require('../../assets/images/profile-porfo-logo-card.png')}
    //         className="w-full h-full">
    //         <View className="w-full h-10 items-start mt-4">
    //           <TouchableOpacity
    //             className="ml-4 w-28 h-10 justify-center items-center rounded-md"
    //             style={{
    //               backgroundColor: colorThemes[selectedTheme].textSecondary,
    //             }}>
    //             <Text
    //               className="font-[PlusJakartaSans-semiBold] text-center text-lg"
    //               style={{color: colorThemes[selectedTheme].textPrimary}}>
    //               BONUS
    //             </Text>
    //           </TouchableOpacity>
    //         </View>
    //         <View className="w-full flex-row justify-between">
    //           <View className="w-[50%] items-center justify-center gap-y-2">
    //             <Text
    //               className="font-[PlusJakartaSans-Bold] text-center text-lg"
    //               style={{color: colorThemes[selectedTheme].textPrimary}}>
    //               Win up to 100,000 PFT with every purchase
    //             </Text>
    //             <TouchableOpacity
    //               className="ml-4 w-40 h-10 justify-center items-center rounded-md"
    //               style={{
    //                 backgroundColor: colorThemes[selectedTheme].background,
    //               }}>
    //               <Text
    //                 className="font-[PlusJakartaSans-semiBold] text-center text-lg"
    //                 style={{color: colorThemes[selectedTheme].textPrimary}}>
    //                 BUY NOW
    //               </Text>
    //             </TouchableOpacity>
    //             <Text
    //               className="font-[PlusJakartaSans-semiBold] text-center text-xs"
    //               style={{color: colorThemes[selectedTheme].textPrimary}}>
    //               *Minimum 100 USDT
    //             </Text>
    //           </View>
    //           <Image
    //             source={require('../../assets/images/profile-porfo-logo.png')}
    //             className="w-40 h-40"
    //           />
    //         </View>
    //       </ImageBackground>
    //     </View>
    //     <View className="w-full flex flex-row mt-4 justify-between">
    //       <TouchableOpacity
    //         className="w-[32%] rounded-md items-center justify-center p-2"
    //         style={{
    //           backgroundColor: colorThemes[selectedTheme].textPrimary,
    //         }}>
    //         <Image
    //           source={require('../../assets/images/profile-setting.png')}
    //           className="w-20 h-20"
    //         />
    //         <Text
    //           className="font-[PlusJakartaSans-Bold] text-lg"
    //           style={{color: colorThemes[selectedTheme].background}}>
    //           SETTINGS
    //         </Text>
    //       </TouchableOpacity>
    //       <TouchableOpacity
    //         className="w-[32%] rounded-md items-center justify-center p-2"
    //         style={{
    //           backgroundColor: colorThemes[selectedTheme].textPrimary,
    //         }}>
    //         <Image
    //           source={require('../../assets/images/profile-dapps.png')}
    //           className="w-20 h-20"
    //         />
    //         <Text
    //           className="font-[PlusJakartaSans-Bold] text-lg"
    //           style={{color: colorThemes[selectedTheme].background}}>
    //           DAPPS
    //         </Text>
    //       </TouchableOpacity>
    //       <TouchableOpacity
    //         className="w-[32%] rounded-md items-center justify-center p-2"
    //         style={{
    //           backgroundColor: colorThemes[selectedTheme].textPrimary,
    //         }}>
    //         <Image
    //           source={require('../../assets/images/profile-backups.png')}
    //           className="w-20 h-20"
    //         />
    //         <Text
    //           className="font-[PlusJakartaSans-Bold] text-lg"
    //           style={{color: colorThemes[selectedTheme].background}}>
    //           BACKUP
    //         </Text>
    //       </TouchableOpacity>
    //     </View>
    //   </View>
    // </View>
    //.......................3rd design.....................
    <View
      className="w-full px-4"
      style={{
        backgroundColor: colorThemes[selectedTheme]['background'],
      }}>
      <View>
        <View className="w-full h-24 flex flex-row justify-between items-center">
          <View className="flex flex-row w-[40%] items-center">
            <Image
              source={require('../../assets/images/profile-avatar.png')}
              className="w-20 h-20 rounded-full"
            />
            <Text
              className="font-[PlusJakartaSans-semiBold] text-lg"
              style={{color: colorThemes[selectedTheme].textPrimary}}>
              Welcome! {pnsProfile?.name}
            </Text>
          </View>
          <View className="flex flex-row w-24 items-center">
            <Image
              source={require('../../assets/images/profile-beer.png')}
              className="w-6 h-6"
            />
            <View className="w-16">
              <Text
                className="font-[PlusJakartaSans-semiBold] text-center text-md"
                style={{color: colorThemes[selectedTheme].textPrimary}}>
                BEAR HOLDER
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View className="w-full flex flex-row items-center justify-between">
        <View className="w-[95%] h-52 rounded-lg bg-[#191919] mt-2 items-center justify-center">
          <View className="w-[90%] h-32 rounded-lg bg-[#6D59EA] justify-between p-2 px-4">
            <View className="flex flex-row gap-x-2">
              <View className="h-8 bg-[#8270F2] justify-center items-center p-2 rounded-3xl">
                <Text
                  className="font-[PlusJakartaSans-semiBold]"
                  style={{color: colorThemes[selectedTheme].textSecondary}}>
                  USDT
                </Text>
              </View>
              <View className="h-8 bg-[#8270F2] justify-center items-center p-2 rounded-3xl">
                <Text
                  className="font-[PlusJakartaSans-semiBold]"
                  style={{color: colorThemes[selectedTheme].textSecondary}}>
                  Main
                </Text>
              </View>
            </View>
            <View className="w-full flex flex-row">
              <View className="items-start">
                <Text
                  className="font-[PlusJakartaSans-semiBold] text-center text-md"
                  style={{color: colorThemes[selectedTheme].textPrimary}}>
                  Balance
                </Text>
                <Text
                  className="font-[PlusJakartaSans-semiBold] text-center text-2xl"
                  style={{color: colorThemes[selectedTheme].textPrimary}}>
                  $1580.90
                </Text>
              </View>
            </View>
          </View>
          <View className="w-[90%] mt-2 flex flex-row justify-between">
            <View className="flex flex-row items-center">
              <View className="h-10 w-10 rounded-full bg-[#6D59EA]" />
              <View className="items-start pl-2">
                <Text
                  className="font-[PlusJakartaSans-semiBold] text-center text-md"
                  style={{color: colorThemes[selectedTheme].textPrimary}}>
                  Savings Account
                </Text>
                <Text
                  className="font-[PlusJakartaSans-semiBold] text-center text-md"
                  style={{color: colorThemes[selectedTheme].textMuted}}>
                  Savings@vestor.porfo
                </Text>
              </View>
            </View>
            <View className="flex flex-row items-center gap-x-1">
              <TouchableOpacity className="h-10 w-10 rounded-full bg-[#383838] justify-center items-center">
                <Image
                  source={require('../../assets/images/delete.png')}
                  className="h-6 w-6"
                />
              </TouchableOpacity>
              <TouchableOpacity className="h-10 w-10 rounded-full bg-[#383838] justify-center items-center">
                <Image
                  source={require('../../assets/images/zoom.png')}
                  className="h-6 w-6"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <TouchableOpacity>
          <LottieView
            source={require('../../assets/lottie/right.json')}
            autoPlay
            loop
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        className="w-full h-16 border-dashed border-2 mt-4 items-center justify-center"
        style={{
          borderColor: colorThemes[selectedTheme].textTertiary,
        }}>
        <View className="flex flex-row items-center">
          <Image
            source={require('../../assets/images/plus-pink-icon.png')}
            className="w-6 h-6"
          />
          <Text
            className="font-[PlusJakartaSans-semiBold]"
            style={{color: colorThemes[selectedTheme].textTertiary}}>
            Add a new card
          </Text>
        </View>
      </TouchableOpacity>
      <Text
        className="font-[PlusJakartaSans-semiBold] text-3xl mt-4"
        style={{color: colorThemes[selectedTheme].textPrimary}}>
        Account Options
      </Text>
      <TouchableOpacity
        onPress={() => {
          dispatch(updatepopupName('CreateAddress'));
          dispatch(togglePopup());
        }}
        className="w-full flex flex-row h-16 items-center justify-between border-b-2 border-[#202020]">
        <View className="flex flex-row items-center">
          <Image
            source={require('../../assets/images/ox-icon.png')}
            className="w-10 h-10"
          />
          <Text
            className="font-[PlusJakartaSans-semiBold] text-xl ml-4"
            style={{color: colorThemes[selectedTheme].textMuted}}>
            Create New Address
          </Text>
        </View>
        <Image
          source={require('../../assets/images/right-arrow.png')}
          className="w-6 h-6"
        />
      </TouchableOpacity>
      <TouchableOpacity className="w-full flex flex-row h-16 items-center justify-between border-b-2 border-[#202020]">
        <View className="flex flex-row items-center">
          <Image
            source={require('../../assets/images/move-icon.png')}
            className="w-10 h-10"
          />
          <Text
            className="font-[PlusJakartaSans-semiBold] text-xl ml-4"
            style={{color: colorThemes[selectedTheme].textMuted}}>
            Move Funds to Vault
          </Text>
        </View>
        <Image
          source={require('../../assets/images/right-arrow.png')}
          className="w-6 h-6"
        />
      </TouchableOpacity>
      <TouchableOpacity className="w-full flex flex-row h-16 items-center justify-between border-b-2 border-[#202020]">
        <View className="flex flex-row items-center">
          <Image
            source={require('../../assets/images/key-icon.png')}
            className="w-10 h-10"
          />
          <Text
            className="font-[PlusJakartaSans-semiBold] text-xl ml-4"
            style={{color: colorThemes[selectedTheme].textMuted}}>
            Export Vault Private Key
          </Text>
        </View>
        <Image
          source={require('../../assets/images/right-arrow.png')}
          className="w-6 h-6"
        />
      </TouchableOpacity>
      <View className="flex-row items-center justify-around mx-8 mt-4 mb-20">
        <View className="flex-col items-center gap-y-1">
          {colorThemes[selectedTheme].whatsapp}
          {customerObject?.user?.mobile ? (
            <Text className="font-[PlusJakartaSans-semiBold] text-[#3897E3]">
              Linked
            </Text>
          ) : (
            <TouchableOpacity activeOpacity={0.8} onPress={linkMobileNumber}>
              <Text
                className="font-[PlusJakartaSans-semiBold]"
                style={{color: colorThemes[selectedTheme].textTertiary}}>
                Link Now
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View className="flex-col items-center gap-y-1">
          {colorThemes[selectedTheme].gmail}
          {customerObject?.user?.email ? (
            <Text className="font-[PlusJakartaSans-semiBold] text-[#3897E3]">
              Linked
            </Text>
          ) : (
            <TouchableOpacity activeOpacity={0.8} onPress={linkEmailId}>
              <Text
                className="font-[PlusJakartaSans-semiBold]"
                style={{color: colorThemes[selectedTheme].textTertiary}}>
                Link Now
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View className="flex-col items-center gap-y-1 opacity-40">
          {colorThemes[selectedTheme].discord}
          <Text
            className="font-[PlusJakartaSans-semiBold]"
            style={{color: colorThemes[selectedTheme].textTertiary}}>
            Link Now
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Profile;
