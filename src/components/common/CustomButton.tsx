import React, {useState} from 'react';
import {Text, TouchableOpacity, ActivityIndicator} from 'react-native';

type Props = {
  onPress: () => Promise<void>;
  text: string;
  bgColor?: string;
  color?: string;
  disabled?: boolean;
  children?: React.ReactNode;
};
const CustomButton = ({
  onPress,
  text,
  color = 'primary',
  bgColor = 'primary',
  disabled = false,
  children,
}: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisabled, setisDisabled] = useState<boolean>(false);
  const backgroundColor: Record<string, string> = {
    primary: 'bg-primary-600',
    transparent: 'bg-transparent border border-primary-600',
    error: 'bg-semantic-error',
    success: 'bg-semantic-success',
    disabled: 'bg-typography-disabled',
  };
  const textColor: Record<string, string> = {
    primary: 'text-typography-primary',
    secondary: 'text-typography-primary dark:text-primary-600',
    white: 'text-neutral-100',
    black: 'text-neutral-900',
  };
  const handleClick = async () => {
    if (onPress) {
      setIsLoading(true);
      setisDisabled(true);
      await onPress();
      setIsLoading(false);
      setisDisabled(false);
    }
  };
  return (
    <TouchableOpacity
      disabled={isDisabled || disabled}
      onPress={handleClick}
      className={`py-[12] px-4 flex-row justify-center items-center  my-5 rounded-md  ${
        backgroundColor[isDisabled ? 'disabled' : bgColor]
      } w-full h-12 shadow-boxShadow-1 shadow-md`}>
      {isLoading && <ActivityIndicator />}
      {children}
      <Text
        className={`text-md text-center text-base  ${textColor[color]} font-[Poppins-SemiBold]`}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
