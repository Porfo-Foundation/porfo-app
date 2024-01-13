import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {updateNotification} from '../../redux/features/notificationSlice';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';

const Notification = () => {
  const dispatch = useAppDispatch();

  const {notificationType, showNotification, txHash} = useAppSelector(
    state => state.notification,
  );
  const notificationObject: Record<
    string,
    {
      image: any;
      text: string;
      color: string;
    }
  > = {
    pending: {
      image: require('../../assets/images/pending-image.png'),
      text: '1 Pending Transaction Found',
      color: '#e5a224',
    },
    failed: {
      image: require('../../assets/images/failed-image.png'),
      text: 'Transaction Failed: Fill Gas Tank',
      color: '#A53838',
    },
    warning: {
      image: require('../../assets/images/warning-image.png'),
      text: 'Time to recharge your fuel tank',
      color: '#887B05',
    },
    message: {
      image: require('../../assets/images/message-image.png'),
      text: 'You have received a payment request',
      color: '#113885',
    },
    success: {
      image: require('../../assets/images/success-image.png'),
      text: 'Transaction Successfull',
      color: '#235441',
    },
  };

  if (showNotification) {
    return (
      <View
        className="absolute w-full h-[75px] z-50 flex flex-row p-1 justify-between items-center self-center"
        style={{
          backgroundColor: `${notificationObject[notificationType]?.color}`,
        }}>
        <Image
          source={notificationObject[notificationType]?.image}
          className="w-14 h-14"
        />
        <View className="w-[70%] break-words">
          <Text className="text-neutral-100 text-[22px]">
            {notificationObject[notificationType]?.text}
          </Text>
        </View>
        <TouchableOpacity
          className="mr-2"
          onPress={() => dispatch(updateNotification(false))}>
          <Image
            source={require('../../assets/images/circle-cross.png')}
            className="w-10 h-10"
          />
        </TouchableOpacity>
      </View>
    );
  }
};

export default Notification;
