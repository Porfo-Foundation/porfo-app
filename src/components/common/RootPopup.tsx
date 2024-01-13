import React, {useContext} from 'react';
import {Modal, View, Pressable} from 'react-native';
import {togglePopup} from '../../redux/features/popupSlice';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {colorThemes} from '../../constants/themeData';
import TradeRecomdetionPopup from '../coindetails/popup/TradeRecomdetionPopup';
import ReceivePopup from '../popups/ReceivePopup';
import WatchAddressPopup from '../popups/WatchAddressPopup';
import SwapPopup from './SwapPopup';
import ExternalWalletPopup from '../popups/ExternalWalletPopup';
import ReferAndEarnPopup from '../popups/ReferAndEarnPopup';
import BuyPopup from '../popups/BuyPopup';
import TransactionReceiptPopup from '../popups/TransactionReceiptPopup';
import SwapReceiptPopup from '../popups/SwapReceiptPopup';
import AddUserNamePopup from '../popups/AddUserNamePopup';
import LinkProfilePoppup from '../popups/LinkProfilePoppup';
import ActionsheetScan from '../../screens/Dashboard/DashboardLanding/ActionsheetScan';
import ActionsheetReceive from '../../screens/Dashboard/DashboardLanding/ActionsheetReceive';
import ActionsheetBuy from '../../screens/Dashboard/DashboardLanding/ActionsheetBuy';
import ActionsheetSwap from '../../screens/Dashboard/DashboardLanding/ActionsheetSwap';
import ActionsheetAddUsername from '../../screens/Profile/ActionsheetAddUsername';
import ActionsheetCreateAddress from '../../screens/Profile/ActionsheetCreateAddress';
import {WalletContext} from '../../context/WalletContext';

const RootPopup = () => {
  const dispatch = useAppDispatch();
  const {smartAccounts, wallet} = useContext(WalletContext);
  const {showPopup, popupName} = useAppSelector(state => state.popup);
  const {selectedTheme} = useAppSelector(state => state.selectedTheme);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showPopup}
      onRequestClose={() => {
        dispatch(togglePopup());
      }}>
      <WalletContext.Provider value={{wallet, smartAccounts}}>
        <View
          className="w-scren absolute left-0 right-0 top-auto bottom-0 rounded-tl-3xl rounded-tr-3xl"
          style={{
            backgroundColor: colorThemes[selectedTheme].actionsheetBackground,
          }}>
          <Pressable
            onPress={() => dispatch(togglePopup())}
            className="w-full h-[20px] items-center justify-center">
            <View className="w-16 h-[5px] bg-typography-secondary rounded-md" />
          </Pressable>
          {popupName === 'SendPopup' && <ActionsheetScan />}
          {popupName === 'ReceivePopup' && <ActionsheetReceive />}
          {popupName === 'BuyPopup' && <ActionsheetBuy />}
          {popupName === 'SwapPopup' && <ActionsheetSwap />}
          {popupName === 'TransactionReceipt' && <TransactionReceiptPopup />}
          {popupName === 'SwapReceipt' && <SwapReceiptPopup />}
          {popupName === 'AddUserName' && <ActionsheetAddUsername />}
          {popupName === 'CreateAddress' && <ActionsheetCreateAddress />}
        </View>
      </WalletContext.Provider>
    </Modal>
  );
};

export default RootPopup;
