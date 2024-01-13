import React from 'react';
import {Modal, Text, View} from 'react-native';
import CustomButton from '../../components/common/CustomButton';
type props = {
  showPopup: boolean;
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
};
const RecoveryPopup = ({showPopup, setShowPopup}: props) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showPopup}
      onRequestClose={() => {
        setShowPopup(false);
      }}>
      <View className="flex-1 bg-[#00000080] justify-end items-center ">
        <View className="bg-primary-600 h-fit flex justify-start p-4 border-2 border-primary-500 rounded-lg">
          <View className="flex-row justify-center border-b">
            <Text className=" text-typography-primary text-2xl ml-3 text-center">
              Account Recovery Available
            </Text>
          </View>
          <View className="mx-4">
            <Text className="text-typography-primary text-base mt-2">
              You have an existing wallet. Would you like to recover it?
            </Text>
            <Text className="text-typography-primary text-base mt-2">
              If you choose to recover your wallet, enter your previous
              keywords.Else a new wallet will be created.
            </Text>
            <View className="flex-row justify-around">
              <View className="w-1/3">
                <CustomButton
                  onPress={async () => {
                    setShowPopup(false);
                  }}
                  text="Ok"
                  bgColor="success"
                  color="black"
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default RecoveryPopup;
