import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import CoinLogo from '../../../../components/coindetails/CoinLogo';
import Send from '../../../../assets/icons/svg/send.svg';
import Receive from '../../../../assets/icons/svg/receive.svg';
import DropDown from '../../../../assets/icons/svg/drop-down.svg';
import DropDownUp from '../../../../assets/icons/svg/drop-down-up.svg';
import {getTime} from '../../../../utils/getTime';
import {showAmount} from '../../../../helpers/showAmount';
import Copy from '../../../../assets/icons/svg/copy.svg';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import {updateSelectedTransaction} from '../../../../redux/features/selectedTransactionSlice';
import {
  updatepopupName,
  togglePopup,
} from '../../../../redux/features/popupSlice';
import {colorThemes} from '../../../../constants/themeData';

const TrxnCard = ({
  transaction,
  navigation,
}: {
  transaction: any;
  navigation: any;
}) => {
  const dispatch = useAppDispatch();
  const coin = transaction.coin;
  const [isFullView, setIsFullView] = useState(false);

  const getGasFees = () => {
    const fees = (
      (transaction.gas * transaction.gasPrice) /
      Math.pow(10, 18)
    ).toFixed(5);
    return fees;
  };
  const {selectedTheme} = useAppSelector(state => state.selectedTheme);
  return (
    // <ImageBackground
    //   className="rounded-xl flex my-1.5 py-3 px-5"
    //   // eslint-disable-next-line react-native/no-inline-styles
    //   imageStyle={{borderRadius: 12}}
    //   source={require('../../../../assets/images/history-bg.png')}>
    //   <TouchableOpacity
    //     onPress={() => {
    //       dispatch(updateSelectedTransaction(transaction));
    //       dispatch(updatepopupName('TransactionReceipt'));
    //       dispatch(togglePopup());
    //     }}>
    //     <View className="w-full h-6 flex flex-row justify-between items-start">
    //       <View className="flex flex-row">
    //         {transaction.txnType === 'RECIEVE' ? <Receive /> : <Send />}
    //         <Text
    //           className={
    //             'font-[PlusJakartaSans-SemiBold] text-xs text-[#999999] ml-2 mr-4'
    //           }>
    //           {transaction.txnType}
    //         </Text>
    //         <Text
    //           className={
    //             'font-[PlusJakartaSans-SemiBold] text-xs text-[#999999]'
    //           }>
    //           {transaction.txTime !== undefined
    //             ? getTime(transaction.txTime)
    //             : '12.36 pm'}
    //         </Text>
    //       </View>
    //       {transaction.txnStatus === false && (
    //         <Text className="text-[#d5d152]">Pending</Text>
    //       )}
    //     </View>
    //     <View className="mt-3 flex-row items-center">
    //       <CoinLogo logoURI={coin?.logoURI!} chainId={coin?.chainId} />
    //       <View className="ml-2 w-1/3">
    //         <Text
    //           className={
    //             'font-[PlusJakartaSans-SemiBold] text-base text-[#FFFFFF]'
    //           }>
    //           {showAmount(transaction.value)} {coin?.name}
    //         </Text>
    //         <Text
    //           className={
    //             'font-[PlusJakartaSans-SemiBold] text-xs text-[#999999]'
    //           }>
    //           ${(coin?.usdPrice! * transaction.value).toFixed(2)}
    //         </Text>
    //       </View>
    //       <View className="ml-2 flex-1">
    //         <Text
    //           className={
    //             'font-[PlusJakartaSans-SemiBold] text-xs text-[#999999]'
    //           }>
    //           {transaction.txnType === 'RECIEVE' ? 'From' : 'To'}
    //         </Text>
    //         <View className="flex-row items-center">
    //           <Image
    //             source={require('../../../../assets/images/rectangle.png')}
    //           />
    //           {transaction.txnType === 'RECIEVE' ? (
    //             <Text
    //               className={
    //                 'font-[PlusJakartaSans-SemiBold] text-base text-[#FFFFFF] ml-1'
    //               }>
    //               {transaction.fromAddress.substring(0, 4)}....
    //               {transaction.fromAddress.substring(
    //                 transaction.fromAddress.length - 4,
    //               )}
    //             </Text>
    //           ) : (
    //             <Text
    //               className={
    //                 'font-[PlusJakartaSans-SemiBold] text-base text-[#FFFFFF] ml-1'
    //               }>
    //               {transaction.toAddress.substring(0, 4)}....
    //               {transaction.toAddress.substring(
    //                 transaction.toAddress.length - 4,
    //               )}
    //             </Text>
    //           )}
    //         </View>
    //       </View>
    //       <TouchableOpacity onPress={() => setIsFullView(!isFullView)}>
    //         {!isFullView ? <DropDown /> : <DropDownUp />}
    //       </TouchableOpacity>
    //     </View>
    //     {isFullView && (
    //       <View className="pt-4 flex flex-row items-center justify-between">
    //         <View className="flex-1">
    //           <Text
    //             className={
    //               'font-[PlusJakartaSans-SemiBold] text-xs text-[#999999]'
    //             }>
    //             Fee
    //           </Text>
    //           <Text
    //             className={
    //               'font-[PlusJakartaSans-SemiBold] text-base text-[#FFFFFF]'
    //             }>
    //             ${getGasFees()}
    //           </Text>
    //         </View>
    //         <View className="flex-row ml-4 flex-1 justify-between items-center">
    //           <View>
    //             <Text
    //               className={
    //                 'font-[PlusJakartaSans-SemiBold] text-xs text-[#999999]'
    //               }>
    //               Transaction Hash
    //             </Text>
    //             <Text
    //               className={
    //                 'font-[PlusJakartaSans-SemiBold] text-base text-[#FFFFFF]'
    //               }>
    //               {transaction.hash.substring(0, 4)}....
    //               {transaction.hash.substring(transaction.hash.length - 4)}
    //             </Text>
    //           </View>
    //           <Copy />
    //         </View>
    //       </View>
    //     )}
    //   </TouchableOpacity>
    // </ImageBackground>

    <TouchableOpacity
      onPress={() => {
        dispatch(updateSelectedTransaction(transaction));
        dispatch(updatepopupName('TransactionReceipt'));
        dispatch(togglePopup());
      }}
      className="flex-row items-center gap-x-3 py-3">
      <View className="w-12 h-12">
        <CoinLogo symbol={coin?.symbol!} chainId={coin?.chainId} />
      </View>
      <View className="flex-1">
        {transaction.txnType === 'RECIEVE' ? (
          <>
            <Text
              className={'font-[PlusJakartaSans-SemiBold] text-base ml-1'}
              style={{color: colorThemes[selectedTheme].textPrimary}}>
              {transaction.fromAddress.substring(0, 4)}....
              {transaction.fromAddress.substring(
                transaction.fromAddress.length - 4,
              )}
            </Text>
            <View className="flex-row items-end gap-x-2">
              <Text
                className={'font-[PlusJakartaSans-SemiBold] text-sm'}
                style={{color: colorThemes[selectedTheme].textSecondary}}>
                Receive
              </Text>
              <Text
                className={'font-[PlusJakartaSans-SemiBold] text-xs'}
                style={{color: colorThemes[selectedTheme].textMuted}}>
                {transaction.txTime !== undefined
                  ? getTime(transaction.txTime)
                  : '12.36 pm'}
              </Text>
            </View>
          </>
        ) : (
          <>
            <Text
              className={'font-[PlusJakartaSans-SemiBold] text-base ml-1'}
              style={{color: colorThemes[selectedTheme].textPrimary}}>
              {transaction.toAddress.substring(0, 4)}....
              {transaction.toAddress.substring(
                transaction.toAddress.length - 4,
              )}
            </Text>
            <View className="flex-row items-end gap-x-2">
              <Text
                className={'font-[PlusJakartaSans-SemiBold] text-sm'}
                style={{color: colorThemes[selectedTheme].textTertiary}}>
                Send
              </Text>
              <Text
                className={'font-[PlusJakartaSans-SemiBold] text-xs'}
                style={{color: colorThemes[selectedTheme].textMuted}}>
                {transaction.txTime !== undefined
                  ? getTime(transaction.txTime)
                  : '12.36 pm'}
              </Text>
            </View>
          </>
        )}
      </View>
      <View className="flex items-end">
        <Text
          style={{color: colorThemes[selectedTheme].textPrimary}}
          className={'font-[PlusJakartaSans-SemiBold] text-base'}>
          {showAmount(transaction.value)} {coin?.symbol}
        </Text>
        <Text
          className={'font-[PlusJakartaSans-SemiBold] text-xs'}
          style={{color: colorThemes[selectedTheme].textMuted}}>
          ${(coin?.usdPrice! * transaction.value).toFixed(2)}
        </Text>
      </View>
      <View>
        {transaction.txnType === 'RECIEVE' ? (
          <>{colorThemes[selectedTheme].receiveArrowHistory}</>
        ) : (
          <>{colorThemes[selectedTheme].sendArrowHistory}</>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default TrxnCard;
