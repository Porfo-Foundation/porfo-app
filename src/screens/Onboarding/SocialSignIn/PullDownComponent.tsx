import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';

const PullDownComponent = () => {
  return (
    <View className="h-screen">
      <ScrollView className="h-[400px]">
        <View className="bg-[#533483] p-2">
          <View className="flex flex-row items-center justify-between">
            <Image
              source={require('../../../assets/images/logo_pulldown.png')}
              className="w-36"
              resizeMode="contain"
            />
            <Image source={require('../../../assets/images/biconomy.png')} />
          </View>
          <View className="flex flex-row items-center justify-between">
            <View>
              <Text className="text-[#ffffff] font-[PlusJakartaSans-SemiBold] text-xl mb-1">
                Your ID
              </Text>
              <Text className="text-[#ffffff] font-[PlusJakartaSans-SemiBold] text-xl mb-1">
                Your Wallet
              </Text>
              <Text className="text-[#ffffff] font-[PlusJakartaSans-SemiBold] text-xl">
                Your Control
              </Text>
            </View>
            <Image
              source={require('../../../assets/images/signin_illustration.png')}
            />
          </View>
        </View>
        <View className="p-3 mt-4">
          <View className="bg-[#F59300] rounded-xl">
            <View className="flex flex-row items-center justify-end px-4 pt-4 relative">
              <Image
                source={require('../../../assets/images/signin_wallet.png')}
                className="absolute -top-4 left-3"
              />
              <Text className="text-[#ffffff] font-[PlusJakartaSans-Bold] text-2xl py-4">
                Creating a Wallet
              </Text>
            </View>
            <View className="flex flex-row items-center justify-between px-4">
              <Text className="text-[#ffffff] font-[PlusJakartaSans-Bold] pb-4 w-[60%]">
                Learn how keys are determined for you and more on Porfo
                accounts.
              </Text>
              <TouchableOpacity className="bg-[#533483C9] px-4 py-2 rounded-md w-[35%]">
                <Text className="text-[#ffffff] font-[PlusJakartaSans-Bold] text-center">
                  Learn More
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text className="text-[#ffffff] font-[PlusJakartaSans-Light] text-justify py-3">
            At Porfo, we prioritize the security and easy recovery of your
            digital wallet. Traditional non-custodial wallets often involve the
            tricky task of saving and recovering through seed phrases. To
            simplify this, we offer easy login through social media channels,
            ensuring you never misplace your wallet.
          </Text>
          <Text className="text-[#ffffff] font-[PlusJakartaSans-Light] text-justify py-3">
            Upon your first login, the Porfo Address Generator assigns a unique
            identifier hash, forming the foundation of your Vault Address. To
            ensure a smooth recovery process, link all your social media
            profiles during the initial login. This guarantees that every login
            directs you to your unique Vault Address, centralizing your assets
            in one secure location.
          </Text>
          <Text className="text-[#ffffff] font-[PlusJakartaSans-Light] text-justify py-3">
            We respect your privacy, holding no claims to your private data and
            keys. While we facilitate easier recovery, safeguarding your
            recovery file and keywords is essential to prevent permanent loss.
            We are continuously working to develop even cooler, user-friendly
            features without compromising security. Entrust Porfo with your
            digital assets and experience a seamless, secure, and innovative
            wallet management journey.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default PullDownComponent;
