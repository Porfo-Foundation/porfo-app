import React from 'react';
import {Modal} from 'react-native';
import {useAppSelector} from '../../redux/hooks';
import Loader from './Loader';

const LoaderPopup = () => {
  const {showLoader} = useAppSelector(state => state.popup);
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={showLoader}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{zIndex: 11}}
      onRequestClose={() => {}}>
      <Loader />
    </Modal>
  );
};

export default LoaderPopup;
