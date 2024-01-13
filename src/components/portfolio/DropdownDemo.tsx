import {View, Text} from 'react-native';
import React from 'react';
import {Dropdown} from 'react-native-material-dropdown';

const DropdownDemo = () => {
  let data = [
    {
      value: 'Banana',
    },
    {
      value: 'Mango',
    },
    {
      value: 'Pear',
    },
  ];

  return (
    <View>
      <Text>fasdfasfasfs</Text>
      <Dropdown label="Favorite Fruit" data={data} />
    </View>
  );
};

export default DropdownDemo;
