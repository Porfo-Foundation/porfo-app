import {Dimensions, ScrollView, ToastAndroid} from 'react-native';
import React, {useRef, useState} from 'react';
import OnboardingLayout from '../Onboarding/OnboardingLayout';
import SetupPortfolio from '../Onboarding/SetupPortfolio';
import SelectCoins from '../Onboarding/SelectCoins';
import SetupInvestment from '../Onboarding/SetupInvestment';
import FirstDeposit from '../Onboarding/FirstDeposit';
import { ToastShowShort } from '../../utils/toast';

const screenWidth = Dimensions.get('window').width;

const AddPortfolio = ({navigation}: any) => {
  const headingMapping: any = {
    0: {
      step: '1',
      title: 'Create a portfolio',
    },
    1: {
      step: '2',
      title: 'Create a portfolio',
    },
    2: {
      step: '3',
      title: 'Create a portfolio',
    },
    3: {
      step: '4',
      title: 'Buy/Deposit in portfolio',
    },
  };
  const scrollViewRef: any = useRef(null);
  const [screenIndex, setScreenIndex] = useState(0);
  console.log(screenIndex, 'Screen iNdex');

  const toNextPage = () => {
    setScreenIndex(screenIndex + 1);
    scrollViewRef.current?.scrollTo({
      x: screenWidth * (screenIndex + 1),
      animated: true,
    });
  };
  const toBackPage = () => {
    if (screenIndex !== 0) {
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
  const handeSkip = async () => {
    try {
      return navigation.navigate('AssetDashboard');
    } catch (e) {
      ToastShowShort('Internal error');
    }
  };
  return (
    <OnboardingLayout
      back={toBackPage}
      currentScreen={screenIndex}
      noOfScreens={4}
      title={headingMapping[screenIndex].title}
      step={headingMapping[screenIndex].step}>
      <ScrollView
        ref={scrollViewRef}
        className="h-full flex-1"
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        nestedScrollEnabled>
        <SetupPortfolio next={toNextPage} handledSkip={handeSkip} />
        <SelectCoins next={toNextPage} />
        <SetupInvestment next={toNextPage} />
        <FirstDeposit next={toNextPage} handleEnd={handleEnd} />
      </ScrollView>
    </OnboardingLayout>
  );
};

export default AddPortfolio;
