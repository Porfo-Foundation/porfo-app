import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import CoinLogo from '../../../../components/coindetails/CoinLogo';
import DropDown from '../../../../assets/icons/svg/drop-down.svg';
import DropDownUp from '../../../../assets/icons/svg/drop-down-up.svg';
import {getTime} from '../../../../utils/getTime';
import Swap from '../../../../assets/icons/svg/swap-icon.svg';
import {showAmount} from '../../../../helpers/showAmount';
import Copy from '../../../../assets/icons/svg/copy.svg';
import {useAppDispatch} from '../../../../redux/hooks';
import {updateSelectedTransaction} from '../../../../redux/features/selectedTransactionSlice';
import {
  updatepopupName,
  togglePopup,
} from '../../../../redux/features/popupSlice';

const SimpleSwapCard = ({transaction}: {transaction: any}) => {
  const dispatch = useAppDispatch();
  const [isFullView, setIsFullView] = useState(false);

  const getGasFees = () => {
    const fees = (
      (transaction.gas * transaction.gasPrice) /
      Math.pow(10, 18)
    ).toFixed(5);
    return fees;
  };
  return (
    <ImageBackground
      className="rounded-xl flex my-1.5 py-3 px-5"
      // eslint-disable-next-line react-native/no-inline-styles
      imageStyle={{borderRadius: 12}}
      source={require('../../../../assets/images/history-swap-bg.png')}>
      <TouchableOpacity
        onPress={() => {
          dispatch(updateSelectedTransaction(transaction));
          dispatch(updatepopupName('SwapReceipt'));
          dispatch(togglePopup());
        }}>
        <View className="w-full h-6 flex flex-row justify-between items-start">
          <View className="flex flex-row">
            <Swap />
            <Text
              className={
                'font-[PlusJakartaSans-SemiBold] text-xs text-[#999999] ml-2 mr-4'
              }>
              TRADE
            </Text>
            <Text
              className={
                'font-[PlusJakartaSans-SemiBold] text-xs text-[#999999]'
              }>
              {transaction.txTime !== undefined
                ? getTime(transaction.txTime)
                : '12.36 pm'}
            </Text>
          </View>
          <Text className="font-[PlusJakartaSans-Bold] text-xs text-[#fff] ml-2 mr-4">
            SIMPLE SWAP
          </Text>
          {transaction.txnStatus === false && (
            <Text className="text-[#d5d152]">Pending</Text>
          )}
        </View>
        <View className="mt-3 flex-row items-center">
          <View className="flex-1 flex-row items-center">
            <CoinLogo
              symbol={transaction?.sendCoin?.symbol!}
              chainId={transaction?.sendCoin?.chainId}
            />
            <View className="ml-2">
              <Text
                className={
                  'font-[PlusJakartaSans-SemiBold] text-base text-[#FFFFFF]'
                }>
                {showAmount(transaction.sendValue)}{' '}
                {transaction?.sendCoin?.symbol}
              </Text>
              <Text
                className={
                  'font-[PlusJakartaSans-SemiBold] text-xs text-[#999999]'
                }>
                $
                {(
                  transaction?.sendCoin?.usdPrice! * transaction?.sendValue
                ).toFixed(2)}
              </Text>
            </View>
          </View>
          <Image
            source={require('../../../../assets/images/double-arrow.png')}
            className="w-3 h-4 mx-4"
          />
          <View className="flex-1 flex-row items-center">
            <CoinLogo
              symbol={transaction?.recieveCoin?.symbol!}
              chainId={transaction?.recieveCoin?.chainId}
            />
            <View className="ml-2">
              <Text
                className={
                  'font-[PlusJakartaSans-SemiBold] text-base text-[#FFFFFF]'
                }>
                {showAmount(transaction.recieveValue)}{' '}
                {transaction?.recieveCoin?.symbol}
              </Text>
              <Text
                className={
                  'font-[PlusJakartaSans-SemiBold] text-xs text-[#999999]'
                }>
                $
                {(
                  transaction?.recieveCoin?.usdPrice! *
                  transaction?.recieveValue
                ).toFixed(2)}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => setIsFullView(!isFullView)}
            className="ml-4">
            {!isFullView ? <DropDown /> : <DropDownUp />}
          </TouchableOpacity>
        </View>
        {isFullView && (
          <View className="pt-4 flex flex-row items-center justify-between">
            <View className="flex-1">
              <Text
                className={
                  'font-[PlusJakartaSans-SemiBold] text-xs text-[#999999]'
                }>
                Fee
              </Text>
              <Text
                className={
                  'font-[PlusJakartaSans-SemiBold] text-base text-[#FFFFFF]'
                }>
                ${getGasFees()}
              </Text>
            </View>
            <View className="flex-row ml-4 flex-1 justify-between items-center">
              <View>
                <Text
                  className={
                    'font-[PlusJakartaSans-SemiBold] text-xs text-[#999999]'
                  }>
                  Transaction Hash
                </Text>
                <Text
                  className={
                    'font-[PlusJakartaSans-SemiBold] text-base text-[#FFFFFF]'
                  }>
                  {transaction.hash.substring(0, 4)}....
                  {transaction.hash.substring(transaction.hash.length - 4)}
                </Text>
              </View>
              <Copy />
            </View>
          </View>
        )}
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default SimpleSwapCard;

// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   ImageBackground,
//   Image,
//   TouchableOpacity,
// } from 'react-native';
// import CoinLogo from '../../../../components/coindetails/CoinLogo';
// import DropDown from '../../../../assets/icons/svg/drop-down.svg';
// import DropDownUp from '../../../../assets/icons/svg/drop-down-up.svg';
// import {getTime} from '../../../../utils/getTime';
// import Swap from '../../../../assets/icons/svg/swap-icon.svg';
// import {showAmount} from '../../../../helpers/showAmount';
// import Copy from '../../../../assets/icons/svg/copy.svg';
// import {useAppDispatch} from '../../../../redux/hooks';
// import {updateSelectedTransaction} from '../../../../redux/features/selectedTransactionSlice';
// import {
//   updatepopupName,
//   togglePopup,
// } from '../../../../redux/features/popupSlice';

// const SimpleSwapCard = ({transaction}: {transaction: any}) => {
//   const dispatch = useAppDispatch();
//   const [isFullView, setIsFullView] = useState(false);

//   const getGasFees = () => {
//     const fees = (
//       (transaction.gas * transaction.gasPrice) /
//       Math.pow(10, 18)
//     ).toFixed(5);
//     return fees;
//   };
//   return (
//     <ImageBackground
//       className="rounded-xl flex my-1.5 py-3"
//       imageStyle={{borderRadius: 12}}
//     >
//       <TouchableOpacity
//         onPress={() => {
//           dispatch(updateSelectedTransaction(transaction));
//           dispatch(updatepopupName('SwapReceipt'));
//           dispatch(togglePopup());
//         }}>
//         <View className="mt-3 flex-row items-center">
//           <View className="flex-1 flex-row items-center">
//             <CoinLogo
//               logoURI={transaction?.sendCoin?.logoURI!}
//               chainId={transaction?.sendCoin?.chainId}
//             />
//             <View className="ml-2">
//               <Text
//                 className={
//                   'font-[PlusJakartaSans-SemiBold] text-base text-[#FFFFFF]'
//                 }>
//                 {showAmount(transaction.sendValue)}{' '}
//                 {transaction?.sendCoin?.symbol}
//               </Text>
//               <Text
//                 className={
//                   'font-[PlusJakartaSans-SemiBold] text-xs text-[#999999]'
//                 }>
//                 $
//                 {(
//                   transaction?.sendCoin?.usdPrice! * transaction?.sendValue
//                 ).toFixed(2)}
//               </Text>
//             </View>
//           </View>
//           <Image
//             source={require('../../../../assets/images/double-arrow.png')}
//             className="w-3 h-4 mx-4"
//           />
//           <View className="flex-1 flex-row items-center">
//             <CoinLogo
//               logoURI={transaction?.recieveCoin?.logoURI!}
//               chainId={transaction?.recieveCoin?.chainId}
//             />
//             <View className="ml-2">
//               <Text
//                 className={
//                   'font-[PlusJakartaSans-SemiBold] text-base text-[#FFFFFF]'
//                 }>
//                 {showAmount(transaction.recieveValue)}{' '}
//                 {transaction?.recieveCoin?.symbol}
//               </Text>
//               <Text
//                 className={
//                   'font-[PlusJakartaSans-SemiBold] text-xs text-[#999999]'
//                 }>
//                 $
//                 {(
//                   transaction?.recieveCoin?.usdPrice! *
//                   transaction?.recieveValue
//                 ).toFixed(2)}
//               </Text>
//             </View>
//           </View>
//         </View>
//         {isFullView && (
//           <View className="pt-4 flex flex-row items-center justify-between">
//             <View className="flex-1">
//               <Text
//                 className={
//                   'font-[PlusJakartaSans-SemiBold] text-xs text-[#999999]'
//                 }>
//                 Fee
//               </Text>
//               <Text
//                 className={
//                   'font-[PlusJakartaSans-SemiBold] text-base text-[#FFFFFF]'
//                 }>
//                 ${getGasFees()}
//               </Text>
//             </View>
//             <View className="flex-row ml-4 flex-1 justify-between items-center">
//               <View>
//                 <Text
//                   className={
//                     'font-[PlusJakartaSans-SemiBold] text-xs text-[#999999]'
//                   }>
//                   Transaction Hash
//                 </Text>
//                 <Text
//                   className={
//                     'font-[PlusJakartaSans-SemiBold] text-base text-[#FFFFFF]'
//                   }>
//                   {transaction.hash.substring(0, 4)}....
//                   {transaction.hash.substring(transaction.hash.length - 4)}
//                 </Text>
//               </View>
//               <Copy />
//             </View>
//           </View>
//         )}
//       </TouchableOpacity>
//     </ImageBackground>
//   );
// };

// export default SimpleSwapCard;
