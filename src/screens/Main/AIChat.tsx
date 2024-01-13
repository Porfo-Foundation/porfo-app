/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Pressable,
  ScrollView,
} from 'react-native';
import {RouterProps} from '../../interfaces/Navigation';
import SendButtton from '../../assets/icons/svg/send-button.svg';
import ChatMessage from '../../components/aichat/ChatMessage';
import {IChatMessage} from '../../interfaces/main';
import {sendQuery} from '../../apiCalls/aichat';
import {useAppDispatch} from '../../redux/hooks';
import {toggleLoader} from '../../redux/features/popupSlice';
import ThreeDotLoader from '../../components/common/ThreeDotLoader';
import { ToastShowShort } from '../../utils/toast';

const AIChat = ({route, navigation}: RouterProps) => {
  const dispatch = useAppDispatch();
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessage] = useState<IChatMessage[]>([]);
  const [theeDotLoader, setThreeDotLoader] = useState<boolean>(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSend = async () => {
    try {
      if (chatInput !== '') {
        setChatMessage([
          ...chatMessages,
          {role: 'user', content: chatInput, timeStamp: Date.now()},
        ]);
        setChatInput('');
        setThreeDotLoader(true);
        const response = await sendQuery(chatInput);
        setChatMessage([
          ...chatMessages,
          {role: 'user', content: chatInput, timeStamp: Date.now()},
          response.assistantMessage,
        ]);
        setThreeDotLoader(false);
      }
    } catch (error) {
      ToastShowShort('Internal error');
      setThreeDotLoader(false);
    }
  };
  return (
    <View className="flex-1 bg-neutral-100 dark:bg-neutral-900 p-2 ">
      {/* <KeyboardAvoidingView behavior="padding" className="flex-1 "> */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 justify-between p-2">
          <View className="flex w-full h-[90%] py-2">
            <ScrollView
              className="w-full h-full"
              ref={scrollViewRef}
              onContentSizeChange={() => {
                scrollViewRef.current?.scrollToEnd({animated: true});
              }}>
              {chatMessages.map((chat, index) => (
                <ChatMessage key={index} message={chat} />
              ))}
              {theeDotLoader && <ThreeDotLoader />}
            </ScrollView>
          </View>
          <View className="w-full h-[50px] flex flex-row border-2 border-neutral-700 rounded-md">
            <TextInput
              className="w-[85%] h-full px-2 text-neutral-0"
              placeholder="Enter Portfolio Name"
              placeholderTextColor={'#9CA3AF'}
              value={chatInput}
              onChangeText={text => setChatInput(text)}
            />
            <Pressable className="w-[10%] h-full" onPress={handleSend}>
              <SendButtton />
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
      {/* </KeyboardAvoidingView> */}
    </View>
  );
};

export default AIChat;

