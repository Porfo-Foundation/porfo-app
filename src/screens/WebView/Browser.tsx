import {NavigationProp, RouteProp} from '@react-navigation/native';
import React, {useState} from 'react';
import {SafeAreaView, View, TextInput, TouchableOpacity} from 'react-native';
import WebView from 'react-native-webview';
import CancelIcon from '../../assets/icons/svg/xmark-solid.svg';

type Props = {
  route: RouteProp<any, any>;
  navigation: NavigationProp<any, any>;
};

const Browser = ({route, navigation}: Props) => {
  const initialUrl = route.params?.initialUrl
    ? route.params?.initialUrl
    : 'https://etherscan.io/tx/0x0';
  const [webviewUrl, setWebviewUrl] = useState<string>(initialUrl);
  return (
    <SafeAreaView className="flex-1 bg-neutral-100 dark:bg-neutral-900">
      <View className="flex-1 justify-end ">
        <View className="flex-row w-full rounded-t-2xl bg-neutral-100 ">
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            className="w-1/12 h-10 flex justify-center">
            <CancelIcon height={20} />
          </TouchableOpacity>
          <TextInput
            defaultValue={webviewUrl}
            onSubmitEditing={e => setWebviewUrl(e.nativeEvent.text)}
            className="w-full h-10 text-typography-primary "
          />
        </View>
        <WebView source={{uri: webviewUrl}} />
      </View>
    </SafeAreaView>
  );
};

export default Browser;
