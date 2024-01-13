import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import React, {useState} from 'react';
import {capitalizeFirstLetter} from '../../../../../utils/helperFunctions';
import {respondDappConnection} from '../../../../../apiCalls/dapp';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import {getTimeDifference} from '../../../../../utils/getTime';
import {useQueryClient} from '@tanstack/react-query';
import {ToastShowShort} from '../../../../../utils/toast';

const Connect = ({data, taskId, status}: any) => {
  const {invalidateQueries} = useQueryClient();
  const [showActivityIndicator, setShowActivityIndicator] = useState(false);
  const [buttonText, setButtonText] = useState('Accept');
  const [isDisabled, setIsDisabled] = useState(false);
  const connectionExpiry = data.expiry;
  const timeDifference = getTimeDifference(new Date(connectionExpiry));
  const [isActive, setisActive] = useState(
    status === 'pending' && timeDifference > 0,
  );
  return (
    <View className="w-[300px] w-max-[70vw] flex flex-col justify-between items-start p-2 gap-4 mr-2">
      <View className="w-full flex flex-row justify-between">
        <View className="flex flex-row items-center">
          {/* <Image
            source={require('../../../../../assets/images/send.png')}
            className="w-8 h-8 mr-1"
            resizeMode="stretch"
          /> */}
          <Text className="text-neutral-100">DApp Connect</Text>
        </View>
        {isActive && (
          <View className="flex flex-row items-center">
            <CountdownCircleTimer
              isPlaying
              size={40}
              strokeWidth={5}
              duration={timeDifference}
              colors={['#004777', '#F7B801', '#A30000', '#A30000']}
              colorsTime={[7, 5, 2, 0]}
              onComplete={() => {
                setisActive(false);
                return {shouldRepeat: false};
              }}>
              {({remainingTime}) => (
                <Text className="  text-neutral-200">{remainingTime}</Text>
              )}
            </CountdownCircleTimer>
          </View>
        )}

        <View className="flex flex-row items-center">
          <View>
            <Image
              source={{
                uri: 'https://gfa.nyc3.digitaloceanspaces.com/testapp/testdir/default.png',
              }}
              className="w-8 h-8 mr-1"
            />
          </View>
          <Text className="text-neutral-100 mr-2">
            {capitalizeFirstLetter(data.dAppName)}
          </Text>
        </View>
      </View>
      <View className="flex flex-row w-full justify-center items-center gap-x-2">
        {isActive ? (
          <>
            <TouchableOpacity
              disabled={isDisabled}
              className={`w-[65%] h-9 ${
                buttonText === 'COMPLETED'
                  ? 'bg-[#14411c]'
                  : buttonText === 'REJECTED'
                  ? 'bg-[#5d5b74]'
                  : 'bg-[#12102d]'
              } items-center self-start rounded-md justify-center`}
              onPress={async () => {
                try {
                  const result = await respondDappConnection(
                    data.connectionHash,
                    taskId,
                    true,
                  );
                  invalidateQueries({queryKey: ['AIChats']});
                  setisActive(false);
                  ToastShowShort('Connection' + result ? 'success' : 'failed');
                } catch (error) {
                  ToastShowShort('' + error);
                }
              }}>
              {showActivityIndicator ? (
                <ActivityIndicator size="large" color="#F9AA4B" />
              ) : (
                <Text className="text-neutral-100">{buttonText}</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-[#db0f1a] h-8 w-[30%] items-center self-center rounded-md justify-center"
              onPress={async () => {
                try {
                  const result = await respondDappConnection(
                    data.connectionHash,
                    taskId,
                    true,
                  );
                  invalidateQueries({queryKey: ['AIChats']});
                  setisActive(false);
                  ToastShowShort('Connection' + result ? 'denied' : 'failed');
                } catch (error) {
                  ToastShowShort('' + error);
                }
              }}>
              <Text className="text-neutral-100">REJECT</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text className="text-neutral-100">Connect Request Expired</Text>
        )}
      </View>
    </View>
  );
};

export default Connect;
