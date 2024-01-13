import LottieView from 'lottie-react-native';
import React from 'react';
import {SafeAreaView} from 'react-native';

const Loader = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#000000] justify-center items-center">
      <LottieView
        source={require('../../assets/lottie/Loader.json')}
        autoPlay
        loop
        // eslint-disable-next-line react-native/no-inline-styles
        style={{width: 100, height: 100}}
      />
    </SafeAreaView>
  );
};

export default Loader;
