import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {IChatMessage} from '../../interfaces/main';
import AIText from './AIText';
import AITable from '../../screens/Dashboard/Chatbot/AITable';

type messageType = {
  message: IChatMessage;
};
const ChatMessage = ({message}: messageType) => {
  const [messageType, setMessageType] = useState('text');
  useEffect(() => {
    if (message.content.includes('chart')) {
      setMessageType('chart');
    } else {
    }
  }, [message]);
  return (
    <View className="w-full mt-2">
      {messageType === 'text' ? (
        <AIText message={message} />
      ) : messageType === 'chart' ? (
        <AITable chartInfo={message} />
      ) : null}
    </View>
  );
};

export default ChatMessage;
