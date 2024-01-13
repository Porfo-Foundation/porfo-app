import {useColorScheme} from 'nativewind';
import React, {Dispatch, SetStateAction} from 'react';
import {Text, TextInput, View} from 'react-native';
import colors from '../../../config/colors';

interface props {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  label?: string;
  placeholder?: string;
}
const CustomTextInput = ({value, setValue, label, placeholder}: props) => {
  const {colorScheme} = useColorScheme();
  return (
    <View className="w-full mb-4 min-h-4">
      <Text className="text-typography-primary justify-start mb-2 font-poppins dark:text-primary-600">
        {label}
      </Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={
          colorScheme === 'light'
            ? colors.typography.primary
            : colors.neutral[400]
        }
        // eslint-disable-next-line react-native/no-inline-styles
        style={{textAlignVertical: 'top'}}
        value={value}
        onChangeText={setValue}
        className="border border-primary-600 rounded-md w-full text-neutral-100 font-poppins shadow-boxShadow-1 shadow-md p-2 dark:border-neutral-400"
        multiline={true}
        numberOfLines={7}
        maxLength={200}
      />
    </View>
  );
};

export default CustomTextInput;
