import React from 'react';
import {
  Text,
  TouchableOpacity,
  GestureResponderEvent,
  Image,
} from 'react-native';

type Props = {
  onPress: (event: GestureResponderEvent) => Promise<void | undefined>;
  text: string;
  bgColor?: string;
  color?: string;
};
const IconButton = ({
  onPress,
  text,
  color = 'primary',
  bgColor = 'primary',
}: Props) => {
  const backgroundColor: Record<string, string> = {
    primary: 'bg-primary-600',
    transparent: 'bg-transparent border border-primary-600',
  };
  const textColor: Record<string, string> = {
    primary: 'text-typography-primary',
    secondary: 'text-typography-primary dark:text-primary-600',
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row justify-center content-center py-[12] px-4 my-5 rounded-md ${backgroundColor[bgColor]} w-full h-12 shadow-boxShadow-1 shadow-md`}>
      <Text
        className={`mr-2 text-md text-center text-base ${textColor[color]} font-[Poppins-SemiBold]`}>
        {text}
      </Text>
      <Image
        source={require('../../assets/icons/copy1.png')}
        className="w-[25] h-[25]"
      />
    </TouchableOpacity>
  );
};

export default IconButton;
