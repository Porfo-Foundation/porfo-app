import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {IChatMessage} from '../../interfaces/main';

type messageType = {
  message: IChatMessage;
};
const AIText = ({message}: messageType) => {
  const [content, setContent] = useState('');
  // useEffect(() => {
  //   try {
  //     const text = message.content.replace(/\\n/g, '');
  //     setContent(text);
  //   } catch (error) {
  //   }
  //   message.content.replace(/\\n/g, '');
  // }, [message]);
  return (
    <View className="w-full mt-2">
      <View className="self-end bg-primary-100 rounded-tl-md rounded-tr-md rounded-bl-md inline-block">
        <Text>{JSON.stringify(message)}</Text>
        {/* <Text className="self-end font-thin">
          {new Date(message.timeStamp).toLocaleTimeString()}
        </Text> */}
      </View>
    </View>
  );
};

export default AIText;
