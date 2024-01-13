import React, {useState} from 'react';
import {View, Modal} from 'react-native';
import {Camera} from '../../../components/common/Camera';
const Scanner = ({navigation}: any) => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleSend = () => {
    navigation.navigate('SendPage');
  };
  return (
    <Modal
      visible={isModalOpen}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setIsModalOpen(false)}>
      <View className="bg-[#647998] rounded-md">
        <Camera handleSend={handleSend} />
      </View>
    </Modal>
  );
};
export default Scanner;
