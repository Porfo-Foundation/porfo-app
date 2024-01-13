import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  Dimensions,
} from 'react-native';

type PropsType = {
  TitleComponent: React.ReactNode;
  HeadingComponent: React.ReactNode;
  selectedItem: any;
};
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const CustomDropdown = ({
  TitleComponent,
  HeadingComponent,
  selectedItem,
}: PropsType) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [xPosition, setXPosition] = useState(0);
  const [yPosition, setYPosition] = useState(0);
  const buttonRef = useRef(null);

  useEffect(() => {
    closeMenu();
  }, [selectedItem]);

  const getButtonPosition = () => {
    if (buttonRef.current) {
      buttonRef.current.measure((x, y, width, height, pageX, pageY) => {
        const spaceBelow = windowHeight - (pageY + height);
        const spaceToRight = windowWidth - (pageX + width);
        if (spaceBelow >= 100) {
          setXPosition(pageX);
          setYPosition(pageY + height + 20);
        } else {
          setYPosition(pageY - 240);
        }

        if (spaceToRight >= 10) {
          setXPosition(pageX);
        } else {
          setXPosition(pageX - width);
        }
        setIsMenuVisible(!isMenuVisible);
      });
    }
  };

  const closeMenu = () => {
    setIsMenuVisible(false);
  };

  return (
    <View className="flex-1">
      <TouchableOpacity ref={buttonRef} onPress={getButtonPosition}>
        {TitleComponent}
      </TouchableOpacity>
      <Modal
        visible={isMenuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeMenu}>
        <TouchableOpacity
          style={styles.modalBackground}
          className="w-screen h-screen"
          onPress={closeMenu}>
          <View style={{position: 'absolute', left: xPosition, top: yPosition}}>
            {HeadingComponent}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default CustomDropdown;
