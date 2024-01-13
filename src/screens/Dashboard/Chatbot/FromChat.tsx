import {View, Image, Dimensions} from 'react-native';
import React from 'react';
import GetAIComponent from './GetAIComponent';
import RenderHTML from 'react-native-render-html';
import {colorThemes} from '../../../constants/themeData';
import {useAppSelector} from '../../../redux/hooks';

const {width} = Dimensions.get('screen');

const FromChat = ({avatar = false, type, msg, data, taskId, status}: any) => {
  const {selectedTheme} = useAppSelector(state => state.selectedTheme);
  return (
    <View className="flex flex-row items-start my-3">
      {avatar ? (
        <Image
          source={require('../../../assets/images/porfo-chat-logo.png')}
          className="w-8 h-8 rounded-full z-30 mr-2"
        />
      ) : (
        <View className="w-8 h-8" />
      )}
      <View
        className="rounded-xl p-1 pr-3 -ml-4 mt-3"
        style={{
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
          borderTopLeftRadius: 0,
          backgroundColor: colorThemes[selectedTheme].buttonBackground,
        }}>
        <View className="flex">
          {msg && (
            <View className="max-w-[80vw]">
              <RenderHTML
                contentWidth={width - 0.75}
                source={{
                  html: `<div style="color : #FFFFFF; max-width : '70' "> 
                    ${msg}
                   </div>`,
                }}
              />
            </View>
          )}
          <GetAIComponent
            type={type}
            data={data ? JSON.parse(data) : undefined}
            taskId={taskId}
            status={status}
          />
        </View>
      </View>
    </View>
  );
};

export default FromChat;
