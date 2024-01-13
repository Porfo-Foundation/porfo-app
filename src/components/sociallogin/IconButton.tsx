import React from 'react';
import {Pressable, Text, Image} from 'react-native';

type buttonType = {
  name: string;
  iconUrl: string;
  color: string;
  operation: () => void;
};
const IconButton = ({name, iconUrl, color, operation}: buttonType) => {
  return (
    <Pressable
      onPress={operation}
      className={`bg-[${color}] rounded-md  w-[300px] h-14 justify-center items-center flex`}>
      <Image source={{uri: iconUrl}} />
      <Text className="text-neutral-200">{name}</Text>
    </Pressable>
  );
};

export default IconButton;
