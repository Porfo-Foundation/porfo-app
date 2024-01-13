import {
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

const PullDownPage = () => {
  return (
    <ScrollView>
      <View className="flex flex-row items-center justify-between bg-[#533483] px-2">
        <Image
          source={require('../../assets/images/logo_pulldown.png')}
          className="w-28 h-16"
          resizeMode="contain"
        />
        <Text className="text-[#ffffff] font-[PlusJakartaSans-SemiBold] text-xl">
          The Passphrases
        </Text>
      </View>
      <View className="m-2">
        <View className="bg-[#F59300] rounded-xl flex flex-row justify-between items-center p-4">
          <View>
            <Text className="text-[#ffffff] font-[PlusJakartaSans-Bold]">
              Not your regular
            </Text>
            <Text className="text-[#ffffff] font-[PlusJakartaSans-Bold]">
              SEED PHRASES
            </Text>
          </View>
          <TouchableOpacity
            className="bg-[#533483C9] px-4 py-2 rounded-md w-[35%]"
            onPress={() =>
              Linking.openURL('https://porfo.gitbook.io').catch(err =>
                console.log(err),
              )
            }>
            <Text className="text-[#ffffff] font-[PlusJakartaSans-Bold] text-center">
              Learn More
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex items-center justify-center my-3">
          <Image
            source={require('../../assets/images/seed_phrase.png')}
            resizeMode="contain"
          />
        </View>
        <Text className="text-[#ffffff] font-[PlusJakartaSans-Light] text-justify py-3">
          All your future transactions are secured by the Private Key signature.
          The private keys are generated after grinding the keys received from
          the Porfo ID and the pass phrases you enter.
        </Text>
        <Text className="text-[#ffffff] font-[PlusJakartaSans-Light] text-justify py-3">
          These act as your seed phrases to finalise your wallet and recover
          using this. The recovery file and private keys are actually stored
          encrypted using your MPIN and this is also used to generate signatures
          using your private key saved locally. So a double verification is
          ensured to keep your local storage safe from root attacks as well.
        </Text>
      </View>
    </ScrollView>
  );
};

export default PullDownPage;
