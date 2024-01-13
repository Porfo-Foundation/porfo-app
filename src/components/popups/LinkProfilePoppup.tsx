import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';

import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {togglePopup} from '../../redux/features/popupSlice';
import {linkUserProfile} from '../../apiCalls/user';

const {width} = Dimensions.get('screen');

const LinkProfilePoppup = () => {
  const dispatch = useAppDispatch();
  const {customerObject} = useAppSelector(state => state.onBoarding);
  const [mobileOrEmail, setMobileOrEmail] = useState('');
  const [profileOption, setProfileOption] = useState('mobile');

  useEffect(() => {
    if (customerObject.user.email === undefined) {
      setProfileOption('email');
    } else {
      setProfileOption('mobile');
    }
  }, []);

  const handleLink = async () => {
    dispatch(togglePopup());
    if (profileOption === 'mobile') {
      const res = await linkUserProfile(
        customerObject?.user?.email,
        mobileOrEmail,
      );
      console.log('profile linking response...', res);
    } else {
      console.log('inside email updation...');
      const res = await linkUserProfile(
        mobileOrEmail,
        customerObject?.user?.mobile,
      );
      console.log('profile linking response...', res);
    }
  };
  return (
    <View className="bg-[#0D2B59] flex-1 rounded-md absolute top-auto left-0 right-0 bottom-0 px-2">
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          dispatch(togglePopup());
        }}>
        <Image
          source={require('../../assets/images/pull-down.png')}
          className="w-full h-[40px]"
        />
      </TouchableOpacity>
      {profileOption === 'mobile' ? (
        <View>
          <Text className="font-[PlusJakartaSans-SemiBold] text-lg text-[#FFFFFF] mt-3">
            Link Mobile
          </Text>
          <View className="border border-[#3897E3] w-full mt-2 flex-row items-center justify-between">
            <TextInput
              placeholder="Enter Your Mobile Number"
              placeholderTextColor="gray"
              value={mobileOrEmail}
              onChangeText={val => setMobileOrEmail(val)}
              className="font-[PlusJakartaSans-SemiBold] text-lg text-[#FFFFFF] w-full px-2"
            />
          </View>
        </View>
      ) : (
        <View>
          <Text className="font-[PlusJakartaSans-SemiBold] text-lg text-[#FFFFFF] mt-3">
            Link Email
          </Text>
          <View className="border border-[#3897E3] w-full mt-2 flex-row items-center justify-between">
            <TextInput
              placeholder="Enter Your Email Id"
              placeholderTextColor="gray"
              value={mobileOrEmail}
              onChangeText={val => setMobileOrEmail(val)}
              className="font-[PlusJakartaSans-SemiBold] text-lg text-[#FFFFFF] w-full px-2"
            />
          </View>
        </View>
      )}

      <View className="items-center">
        <TouchableOpacity
          onPress={handleLink}
          className="bg-[#3897E3] rounded w-fit my-6">
          <Text className="font-[PlusJakartaSans-SemiBold] text-lg text-[#FFFFFF] px-8 py-2">
            Link Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LinkProfilePoppup;
