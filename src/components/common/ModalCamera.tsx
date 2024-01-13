import React, {useEffect, useState} from 'react';
import {Dimensions, Text} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {requestCameraPermission} from '../../utils/permissions';
const {width} = Dimensions.get('screen');
type cameraProps = {
  setAddress: (address: string) => void;
  setStep: (address: number) => void;
};
export const ModalCamera = ({setAddress, setStep}: cameraProps) => {
  const [cameraPermission, setCameraPermission] = useState(false);
  useEffect(() => {
    const checkCameraPermission = async () => {
      const permission = await requestCameraPermission();
      setCameraPermission(permission);
      if (!permission) {
        // setIsModalOpen(false);
      }
    };
    checkCameraPermission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!cameraPermission) {
    return <Text>Camera permission not granted</Text>;
  }
  //get screen height
  const height = Dimensions.get('screen').height;
  const width = Dimensions.get('screen').width;

  console.log(height, width);
  return (
    <QRCodeScanner
      cameraStyle={[
        {
          height: '85%',
          width: '90%',
          borderWidth: 5,
          borderColor: 'red',
          alignSelf: 'center',
          borderRadius: 50,
          overflow: 'hidden',
        },
      ]}
      cameraProps={{captureAudio: false}}
      onRead={e => {
        console.log(e.data);
        const addressData = e.data;
        setAddress(addressData.substring(addressData.indexOf('0x')));
        setStep(2);
        // setIsModalOpen(false);
      }}
      // flashMode={RNCamera.Constants.FlashMode.torch}
      // topContent={
      //   <Text className="text-[#fff] font-[PlusJakartaSans-semiBold] text-center mb-4">
      //     Scan the QR code
      //   </Text>
      // }
      // bottomContent={
      //   <TouchableOpacity>
      //     <Text className="text-[#fff]">OK. Got it!</Text>
      //   </TouchableOpacity>
      // }
    />
  );
};
