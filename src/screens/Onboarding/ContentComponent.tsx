import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ContentComponent = () => {
  return (
    <View className="flex-row items-center">
      <Image
        source={require('../../assets/images/connection-lost.png')}
        style={{width: 200, height: 200}}
      />
    </View>
  );
};

export default ContentComponent;

const styles = StyleSheet.create({});
