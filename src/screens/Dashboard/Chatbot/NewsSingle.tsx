import {View, Text, TouchableOpacity, Linking} from 'react-native';
import React from 'react';
import {getTimeInAgo} from '../../../utils/getTimeInAgo';

const NewsSingle = ({data}: any) => {
  const news = data[0];

  const openURL = (url: any) => {
    Linking.openURL(url)
      .then(link => {
        console.log('URL opened successfully', link);
      })
      .catch(err => {
        console.error('Error opening URL:', err);
      });
  };

  return (
    <View className="w-[270px] w-max-[50vw] ml-1 p-1">
      <View className="w-full flex flex-row items-center justify-start">
        <Text className="text-neutral-100 font-bold text-lg">{news.title}</Text>
      </View>
      <View className="w-full flex flex-row items-center justify-start mt-2">
        <Text className="text-neutral-100 text-left break-words text-xs opacity-75">
          {news.contentSnippet}
        </Text>
      </View>
      <View className="w-full flex flex-row items-center justify-end mt-2">
        <Text className="text-neutral-100 text-xs">
          {getTimeInAgo(news.pubDate)}
        </Text>
      </View>
      <View className="w-full flex flex-row items-center justify-start">
        <Text className="text-neutral-100">By- {news.creator}</Text>
      </View>
      <View className="w-full flex flex-row items-center justify-center mt-4">
        <TouchableOpacity onPress={() => openURL(news.link)}>
          <Text className="text-[#6c4bb9] font-bold">Click To Read More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NewsSingle;
