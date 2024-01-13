import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useEffect} from 'react';
import OneSignal from 'react-native-onesignal';
import {ONESIGNAL_APP_ID} from '../config/config';
import {useAppSelector} from '../redux/hooks';

type additionalDataType = {
  type:
    | 'received_connection_request'
    | 'accepted_connection_request'
    | 'received_aggrement'
    | 'received_aggrement_update'
    | 'received_aggrement_message'
    | 'received_aggrement_response';
};
export const useOneSignal = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const {userAddress} = useAppSelector(state => state.auth);
  useEffect(() => {
    // OneSignal Initialization
    OneSignal.setAppId(ONESIGNAL_APP_ID);

    //Method for handling notifications received while app in foreground
    OneSignal.setNotificationWillShowInForegroundHandler(
      notificationReceivedEvent => {
        // console.log(
        //   'OneSignal: notification will show in foreground:',
        //   notificationReceivedEvent,
        // );
        let notification = notificationReceivedEvent.getNotification();
        // console.log('notification: ', notification);
        // const data = notification.additionalData;
        // console.log('additionalData: ', data);
        // Complete with null means don't show a notification.
        notificationReceivedEvent.complete(notification);
      },
    );

    //Method for handling notifications opened
    OneSignal.setNotificationOpenedHandler(openedEvent => {
      // console.log('OneSignal: notification opened:', openedEvent);
      const {action, notification} = openedEvent;
      // console.log('action: ', action);
      // console.log('notification: ', notification);

      const data = notification.additionalData as additionalDataType;
      if (!userAddress) {
        return;
      }
      switch (data.type) {
        case 'received_connection_request':
          return navigation.navigate('MainStack', {
            screen: 'TabScreens',
            params: {
              screen: 'HomeConnections',
              params: {
                screen: 'Requests',
              },
            },
          });

        case 'accepted_connection_request':
          return navigation.navigate('MainStack', {
            screen: 'TabScreens',
            params: {
              screen: 'HomeConnections',
              params: {
                screen: 'Connected',
              },
            },
          });

        case 'received_aggrement_response' ||
          'received_aggrement_message' ||
          'received_aggrement_update' ||
          'received_aggrement':
          return navigation.navigate('MainStack', {
            screen: 'TabScreens',
            params: {
              screen: 'HomeConnections',
              params: {
                screen: 'Aggrements',
              },
            },
          });

        default:
          return navigation.navigate('MainStack', {
            screen: 'TabScreens',
            params: {
              screen: 'HomeCards',
            },
          });
      }
    });
  }, [navigation, userAddress]);
};
