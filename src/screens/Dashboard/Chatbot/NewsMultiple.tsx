import {View, Text, Image, TouchableOpacity, Linking} from 'react-native';
import React from 'react';
import NewsSingle from './NewsSingle';

const NewsMultiple = ({data}: any) => {
  const newsArray = data;

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
    <View className="w-full w-max-[50vw]">
      {newsArray.length === 1 ? (
        <NewsSingle data={data} />
      ) : (
        <View className="w-[270px] w-max-[50vw] ml-1 p-0">
          <Text className="text-neutral-100 font-bold text-lg">
            Here are some updates
          </Text>
          {newsArray?.map((news: any, index: number) => {
            return (
              <View
                key={index}
                className="flex flex-row w-full justify-between items-center border-b-2 border-neutral-100 pb-2 pt-2 ml-1 mr-2">
                <View className="w-[90%]">
                  <Text className="text-neutral-100">{news.title}</Text>
                </View>
                <TouchableOpacity onPress={() => openURL(news.link)}>
                  <Image
                    source={require('../../../assets/images/right-arrow-new.png')}
                    className="w-[30px] h-[30px]"
                  />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default NewsMultiple;
