import React, {useEffect, useState} from 'react';
import {Dimensions, Text} from 'react-native';
// import QRCodeScanner from 'react-native-qrcode-scanner';
import {requestCameraPermission} from '../../utils/permissions';
import {useAppDispatch} from '../../redux/hooks';
import {updateSenderAddress} from '../../redux/features/assetsSlice';
const {width} = Dimensions.get('screen');
type cameraProps = {
  handleSend: () => void;
  // setIsModalOpen: (isOpen: boolean) => void;
};
export const Camera = ({
  handleSend,
}: // setIsModalOpen
cameraProps) => {
  // const dispatch = useAppDispatch();
  // const [cameraPermission, setCameraPermission] = useState(false);
  // useEffect(() => {
  //   const checkCameraPermission = async () => {
  //     const permission = await requestCameraPermission();
  //     setCameraPermission(permission);
  //     if (!permission) {
  //       // setIsModalOpen(false);
  //     }
  //   };
  //   checkCameraPermission();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  // if (!cameraPermission) {
  //   return <Text>Camera permission not granted</Text>;
  // }
  return (
    // <QRCodeScanner
    //   containerStyle={{height: 250}}
    //   cameraStyle={[{height: 200}]}
    //   cameraContainerStyle={{height: 300}}
    //   cameraProps={{captureAudio: false}}
    //   // topViewStyle={{backgroundColor: '#fff', zIndex: 1000}}
    //   // bottomViewStyle={{backgroundColor: '#fff'}}
    //   // containerStyle={{width: 10}}
    //   // cameraStyle={{width: width - 20, height: 30}}
    //   onRead={e => {
    //     console.log(e.data);
    //     const addressData = e.data;
    //     // setAddress(addressData.substring(addressData.indexOf('0x')));
    //     dispatch(
    //       updateSenderAddress(addressData.substring(addressData.indexOf('0x'))),
    //     );
    //     handleSend();
    //     // setIsModalOpen(false);
    //   }}
    //   // flashMode={RNCamera.Constants.FlashMode.torch}
    //   // topContent={
    //   //   <Text className="text-[#fff] font-[PlusJakartaSans-semiBold] text-center mb-4">
    //   //     Scan the QR code
    //   //   </Text>
    //   // }
    //   // bottomContent={
    //   //   <TouchableOpacity>
    //   //     <Text className="text-[#fff]">OK. Got it!</Text>
    //   //   </TouchableOpacity>
    //   // }
    // />
    <Text>sadfasdfsfsda</Text>
  );
};
