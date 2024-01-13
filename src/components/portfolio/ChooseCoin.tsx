/* eslint-disable react-native/no-inline-styles */
import {View, Modal} from 'react-native';
import React, {useState, Dispatch, SetStateAction} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import colors = require('../../../config/colors');

type propsType = {
  coinList: Array<object>;
  setSelectedCoin: Dispatch<SetStateAction<string>>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onOpenFun?: () => void;
};
const ChooseCoin = ({
  coinList,
  setSelectedCoin,
  open,
  setOpen,
  onOpenFun,
}: propsType) => {
  const [value, setValue] = useState(null);

  const handleChange = (id: any) => {
    setSelectedCoin(id);
  };

  DropDownPicker.setListMode('SCROLLVIEW');
  return (
    <Modal
      transparent
      animationType="slide"
      visible={open}
      onRequestClose={() => setOpen(!open)}>
      <View style={{height: '50%', marginTop: 'auto'}}>
        <DropDownPicker
          open={open}
          onOpen={onOpenFun}
          value={value}
          items={coinList}
          setOpen={() => setOpen(!open)}
          setValue={val => setValue(val)}
          onChangeValue={item => handleChange(item)}
          // autoScroll={true}
          searchable={true}
          closeOnBackPressed={true}
          itemSeparator={true}
          dropDownDirection="BOTTOM"
          showTickIcon={true}
          closeAfterSelecting={true}
          style={{
            backgroundColor: `${colors.neutral[900]}`,
            borderColor: `${colors.neutral[900]}`,
          }}
          textStyle={{
            color: `${colors.neutral[200]}`,
          }}
          placeholderStyle={{
            color: `${colors.neutral[200]}`,
          }}
          selectedItemLabelStyle={{
            fontWeight: 'bold',
            color: 'black',
          }}
          listItemLabelStyle={{
            color: 'black',
          }}
          dropDownContainerStyle={{
            backgroundColor: '#dfdfdf',
            position: 'relative',
            // top: 0,
            // left: 0,
            // right: 0,
            // zIndex: 100001,
            // maxHeight: '80%', // Adjust the height as needed
            // overflow: 'scroll',
          }}
          // listItemContainerStyle={{
          //   position: 'relative',
          //   top: 0,
          // }}
        />
      </View>
    </Modal>
  );
};

export default ChooseCoin;
