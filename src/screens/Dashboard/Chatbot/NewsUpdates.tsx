import React from 'react';
import {View, Text, Image, TouchableOpacity, Linking} from 'react-native';
import {colorThemes} from '../../../constants/themeData';
import {useAppSelector} from '../../../redux/hooks';
import {getTimeInAgo} from '../../../utils/getTimeInAgo';
const NewsUpdates = ({data}: any) => {
  const {selectedTheme} = useAppSelector(state => state.selectedTheme);
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
    <View className="w-full p-2">
      <Text
        className="font-[PlusJakartaSans-Bold] text-md -ml-1"
        style={{
          color: colorThemes[selectedTheme].textSecondary,
        }}>
        Timeline
      </Text>
      <Text
        className="font-[PlusJakartaSans-Bold] text-2xl -ml-1"
        style={{
          color: colorThemes[selectedTheme].actionsheetBackground,
        }}>
        Today’s News
      </Text>
      {data?.map((news: any, index: number) => (
        <TouchableOpacity
          onPress={() => openURL(news.link)}
          key={index}
          className="w-full flex flex-row border-l-2 border-neutral-100 items-center">
          <View className="w-full flex flex-row items-center -ml-[9px]">
            <View className="w-4 h-4 rounded-full bg-primary-10 justify-center items-center" />
            <View className="w-full flex flex-col ml-4 my-5">
              <View className="w-full flex flex-row">
                <View className="w-[60%]">
                  <Text
                    className="font-[PlusJakartaSans-Bold] text-md"
                    style={{
                      color: colorThemes[selectedTheme].actionsheetBackground,
                    }}>
                    {news.title}
                  </Text>
                </View>
                <Text
                  className="font-[PlusJakartaSans-semiBold] text-md"
                  style={{
                    color: colorThemes[selectedTheme].textMuted,
                  }}>
                  {getTimeInAgo(news.pubDate)}
                </Text>
              </View>
              <View className="w-full flex flex-row items-center">
                <View className="w-[60%]">
                  <Text
                    className="font-[PlusJakartaSans-semiBold] text-md"
                    style={{
                      color: colorThemes[selectedTheme].textMuted,
                    }}>
                    {news.contentSnippet.substring(0, 200)}...
                  </Text>
                </View>
                {/* <Image source={event.image} className="w-12 h-12 ml-2" /> */}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default NewsUpdates;
