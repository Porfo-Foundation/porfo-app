import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import {useAppSelector, useAppDispatch} from '../../redux/hooks';
import {colorThemes} from '../../constants/themeData';

import React, {useState, useEffect} from 'react';
import {checkUserName} from '../../apiCalls/profile';
import {claimUserName} from '../../apiCalls/profile';
import {updateProfile} from '../../apiCalls/profile';
import {updatePnsProfile} from '../../redux/features/popupSlice';

const ActionsheetAddUsername = ({isOpen, onClose}: any) => {
  const {selectedTheme} = useAppSelector(state => state.selectedTheme);
  const {smartAccountAddress} = useAppSelector(state => state.auth);

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
    onClose();
    const res = await updateProfile(name, avatarUrl);
    dispatch(updatePnsProfile(res.profile));
  };
  const handleClaimUserName = async () => {
    const res = await claimUserName(`${userName}.porfo`);
    dispatch(updatePnsProfile(res.profile));
  };
  return (
    // <Actionsheet isOpen={isOpen} onClose={onClose}>
    //   <Actionsheet.Content
    //     style={{
    //       backgroundColor: colorThemes[selectedTheme].actionsheetBackground,
    //     }}>

    <ScrollView
      className="w-full px-3"
      style={{
        backgroundColor: colorThemes[selectedTheme].actionsheetBackground,
      }}>
      <View className="flex-1 rounded-md px-2">
        <Text
          className="font-[PlusJakartaSans-SemiBold] text-lg mt-3"
          style={{color: colorThemes[selectedTheme].textDefault}}>
          User Name
        </Text>

        <View
          className={`border w-full mt-2 flex-row items-center justify-between rounded-full ${
            pnsProfile?.userName !== '' ? 'opacity-20' : 'opacity-100'
          }`}
          style={{borderColor: colorThemes[selectedTheme].background}}>
          <TextInput
            editable={pnsProfile?.userName !== '' ? false : true}
            autoCapitalize="none"
            placeholder="Enter UserName"
            placeholderTextColor="gray"
            value={
              pnsProfile?.userName !== '' ? pnsProfile?.userName : userName
            }
            onChangeText={val => setUserName(val)}
            className={`font-[PlusJakartaSans-SemiBold] flex-1 text-lg px-2 ${
              pnsProfile?.userName !== '' ? 'opacity-40' : 'opacity-100'
            }`}
            style={{color: colorThemes[selectedTheme].textDefault}}
          />
          <View
            className="w-20 h-full items-center rounded-r-full"
            style={{
              backgroundColor: colorThemes[selectedTheme].background,
            }}>
            <Text
              className="font-[PlusJakartaSans-SemiBold] text-lg mt-2"
              style={{color: colorThemes[selectedTheme].textPrimary}}>
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
            <Text
              className="font-[PlusJakartaSans-SemiBold] text-md"
              style={{color: colorThemes[selectedTheme].textTertiary}}>
              Claim UserName
            </Text>
          </TouchableOpacity>
        )}
        <Text
          className="font-[PlusJakartaSans-SemiBold] text-lg mt-3"
          style={{color: colorThemes[selectedTheme].textDefault}}>
          Account Name
        </Text>
        <View
          className="border rounded-full w-full mt-2 flex-row items-center justify-between"
          style={{borderColor: colorThemes[selectedTheme].background}}>
          <TextInput
            placeholder="Enter Your name"
            placeholderTextColor="gray"
            value={name}
            onChangeText={val => setName(val)}
            className="font-[PlusJakartaSans-SemiBold] text-lg w-full px-2"
            style={{color: colorThemes[selectedTheme].textDefault}}
          />
        </View>

        <View className="my-4">
          <Image source={require('../../assets/images/pfp.png')} />
        </View>
        <View className="items-center">
          <TouchableOpacity
            onPress={handleSave}
            className="rounded w-fit my-6"
            style={{
              backgroundColor: colorThemes[selectedTheme].textSecondary,
            }}>
            <Text
              className="font-[PlusJakartaSans-SemiBold] text-lg px-8 py-2"
              style={{color: colorThemes[selectedTheme].textPrimary}}>
              {pnsProfile?.userName === '' ? 'Save' : 'Update'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
    //   </Actionsheet.Content>
    // </Actionsheet>
  );
};

export default ActionsheetAddUsername;
