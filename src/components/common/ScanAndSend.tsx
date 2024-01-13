import {View, TouchableOpacity, Image, Modal} from 'react-native';
import React, {useState} from 'react';
import {Camera} from './Camera';
const ScanAndSend = ({handleSend}: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <View>
      <Modal
        visible={isModalOpen}
        animationType="fade"
        onRequestClose={() => setIsModalOpen(false)}>
        <View className="bg-[#0D2B59] rounded-md">
          <Camera handleSend={handleSend} />
        </View>
      </Modal>
      <TouchableOpacity
        activeOpacity={0.8}
        className="px-2"
        onPress={() => setIsModalOpen(true)}>
        <Image
          source={require('../../assets/icons/svg/scan.png')}
          className="w-4 h-4"
        />
      </TouchableOpacity>
    </View>
  );
};

export default ScanAndSend;
