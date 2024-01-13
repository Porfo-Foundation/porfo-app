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
import {checkUserName} from '../../apiCalls/profile';
import {claimUserName} from '../../apiCalls/profile';
import {updateProfile} from '../../apiCalls/profile';
import {updatePnsProfile} from '../../redux/features/popupSlice';

const {width} = Dimensions.get('screen');

const AddUserNamePopup = () => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [isUserNameAvailable, setIsUserNameAvailable] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState(
    'https://www.google.com/search?sca_esv=571940854&rlz=1C1CHBF_enIN890IN890&sxsrf=AM9HkKmSJ1cWzcPUe2mh7TOvoGjwGXj8wg:1696867542608&q=avatar+logo+png&tbm=isch&source=lnms&sa=X&ved=2ahUKEwj5oe6YrOmBAxUhyzgGHc_ND1IQ0pQJegQICxAB&biw=1536&bih=715&dpr=1.25#imgrc=fMsy8mQf2jzxGM',
  );
  const {pnsProfile} = useAppSelector(state => state.popup);

  useEffect(() => {
    // Define a function to update the debouncedValue state
    const debounce = setTimeout(() => {
      const findUserName = async () => {
        const isAvailable = await checkUserName(`${userName}.porfo`);
        setIsUserNameAvailable(isAvailable.isAvailable);
      };
      findUserName();
    }, 3000); // Adjust the delay time as needed (e.g., 500 milliseconds)

    // Clear the previous timeout if the input value changes before the timeout expires
    return () => clearTimeout(debounce);
  }, [userName]);

  // if userName already exist
  useEffect(() => {
    setName(pnsProfile?.name);
  }, []);

  const handleSave = async () => {
    dispatch(togglePopup());
    const res = await updateProfile(name, avatarUrl);
    dispatch(updatePnsProfile(res.profile));
  };
  const handleClaimUserName = async () => {
    const res = await claimUserName(`${userName}.porfo`);
    dispatch(updatePnsProfile(res.profile));
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
          // style={{width: width}}
          // resizeMode="stretch"
          // className="rounded-t-md"
        />
      </TouchableOpacity>
      <Text className="font-[PlusJakartaSans-SemiBold] text-lg text-[#FFFFFF] mt-3">
        User Name
      </Text>

      <View
        className={`border border-[#3897E3] w-full mt-2 flex-row items-center justify-between ${
          pnsProfile?.userName !== '' ? 'opacity-20' : 'opacity-100'
        }`}>
        <TextInput
          editable={pnsProfile?.userName !== '' ? false : true}
          autoCapitalize="none"
          placeholder="Enter UserName"
          placeholderTextColor="gray"
          value={pnsProfile?.userName !== '' ? pnsProfile?.userName : userName}
          onChangeText={val => setUserName(val)}
          className={`font-[PlusJakartaSans-SemiBold] flex-1 text-lg text-[#FFFFFF] px-2 ${
            pnsProfile?.userName !== '' ? 'opacity-40' : 'opacity-100'
          }`}
        />
        <View className="w-20 h-full bg-[#000000] items-center">
          <Text className="font-[PlusJakartaSans-SemiBold] text-lg text-[#FFFFFF] mt-2">
            .porfo
          </Text>
        </View>
      </View>
      {!isUserNameAvailable && userName !== '' ? (
        <Text className="text-semantic-error">UserName is not available</Text>
      ) : (
        userName !== '' && (
          <Text className="text-semantic-success">UserName is available</Text>
        )
      )}
      {pnsProfile?.userName === '' && (
        <TouchableOpacity
          className="mt-2 self-end"
          onPress={handleClaimUserName}>
          <Text className="font-[PlusJakartaSans-SemiBold] text-md text-[#a39dde]">
            Claim UserName
          </Text>
        </TouchableOpacity>
      )}
      <Text className="font-[PlusJakartaSans-SemiBold] text-lg text-[#FFFFFF] mt-3">
        Account Name
      </Text>
      <View className="border border-[#3897E3] w-full mt-2 flex-row items-center justify-between">
        <TextInput
          placeholder="Enter Your name"
          placeholderTextColor="gray"
          value={name}
          onChangeText={val => setName(val)}
          className="font-[PlusJakartaSans-SemiBold] text-lg text-[#FFFFFF] w-full px-2"
        />
      </View>

      <View className="my-4">
        <Image source={require('../../assets/images/pfp.png')} />
      </View>
      <View className="items-center">
        <TouchableOpacity
          onPress={handleSave}
          className="bg-[#3897E3] rounded w-fit my-6">
          <Text className="font-[PlusJakartaSans-SemiBold] text-lg text-[#FFFFFF] px-8 py-2">
            {pnsProfile?.userName === '' ? 'Save' : 'Update'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddUserNamePopup;
