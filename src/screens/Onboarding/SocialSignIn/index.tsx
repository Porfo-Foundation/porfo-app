import {Dimensions, Text, View} from 'react-native';
import React from 'react';

import LoginButtons from './LoginButtons';

const {width, height} = Dimensions.get('screen');
const SocialSignIn = ({next}: any) => {
  return (
    <View style={{width: width, height: height}}>
      {/* <Text className="font-[PlusJakartaSans-SemiBold] text-xl text-[#000] text-center">
        Sign in with account of your choice!
      </Text> */}
      <LoginButtons next={next} />
      {/* <View>
        <Logo />
      </View> */}
    </View>
  );
};

export default SocialSignIn;
