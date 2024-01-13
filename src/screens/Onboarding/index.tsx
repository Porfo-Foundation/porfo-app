import {Dimensions, ScrollView, ToastAndroid} from 'react-native';
import React, {useRef, useState} from 'react';
import OnboardingLayout from './OnboardingLayout';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import SocialSignIn from './SocialSignIn';
import SetupWallet from './SetupWallet';
import FirstDeposit from './FirstDeposit';
import ContentComponent from './ContentComponent';
import SetupMpin from './SetupMpin';
import VerifyRecovery from './VerifyRecovery';
import RecoverWallet from './RecoverWallet';
import DownloadRecovery from './DownloadRecovery';
import PullDownComponent from './SocialSignIn/PullDownComponent';
import PullDownPage from '../Welcome/PullDownPage';
import {exitAppConfirmation} from '../../utils/exitAppConfirmation';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {
  updateKeywordsArray,
  updateSecureTextEntry1,
  updateSecureTextEntry2,
} from '../../redux/features/keywordsSlice';
import {ToastShowShort} from '../../utils/toast';
const screenWidth = Dimensions.get('window').width;

const OnboardingStack = ({navigation}: any) => {
  const insets = useSafeAreaInsets();
  const dispath = useAppDispatch();
  const headingMapping: any = {
    0: {
      step: '1',
      title: 'Social Sign in',
      component: <PullDownComponent />,
    },
    1: {
      step: '2',
      title: 'Setting up Wallet',
      component: <PullDownPage />,
    },
    2: {
      step: '3',
      title: 'Set up MPin',
      component: <ContentComponent />,
    },
    3: {
      step: '4',
      title: 'Download Recovery',
      component: <ContentComponent />,
    },
    4: {
      step: '5',
      title: 'Verify Recovery',
      component: <ContentComponent />,
    },
    5: {
      step: '6',
      title: 'Wallet Recovery',
      component: <ContentComponent />,
    },
  };

  const scrollViewRef: any = useRef(null);
  const [screenIndex, setScreenIndex] = useState(0);
  const [showRecover, setShowRecover] = useState(false);

  const toRecoverPage = () => {
    setScreenIndex(screenIndex + 1);
    setShowRecover(true);
    scrollViewRef.current?.scrollTo({
      x: screenWidth * (screenIndex + 1),
      animated: true,
    });
  };

  const toNextPage = () => {
    if (screenIndex === 0) {
      dispath(updateKeywordsArray(['', '']));
      dispath(updateSecureTextEntry1(true));
      dispath(updateSecureTextEntry2(true));
    }
    setScreenIndex(screenIndex + 1);
    scrollViewRef.current?.scrollTo({
      x: screenWidth * (screenIndex + 1),
      animated: true,
    });
  };
  const toBackPage = () => {
    if (screenIndex === 0) {
      exitAppConfirmation();
    } else if (screenIndex === 2) {
      setShowRecover(false);
    } else {
      setScreenIndex(screenIndex - 1);
    }
    scrollViewRef.current?.scrollTo({
      x: screenWidth * (screenIndex - 1),
      animated: true,
    });
  };
  const handleEnd = async () => {
    try {
      return navigation.navigate('DashboardStack');
    } catch (e) {
      ToastShowShort('Internal error');
    }
  };

  return (
    <OnboardingLayout>
      <ScrollView
        ref={scrollViewRef}
        className="h-full flex-1"
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        nestedScrollEnabled
        style={{paddingBottom: insets.bottom}}>
        <SocialSignIn next={toNextPage} />
        <SetupWallet next={toNextPage} toRecoverPage={toRecoverPage} />
        {showRecover ? (
          <RecoverWallet next={toNextPage} />
        ) : (
          <>
            <SetupMpin next={toNextPage} />
            <DownloadRecovery next={toNextPage} />
            <VerifyRecovery next={toNextPage} />
          </>
        )}
        <FirstDeposit
          next={toNextPage}
          handleEnd={handleEnd}
          screenIndex={screenIndex}
        />
      </ScrollView>
    </OnboardingLayout>
  );
};

export default OnboardingStack;
