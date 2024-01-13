import React, {useState, useEffect} from 'react';
import {View, Animated, Easing, StyleSheet} from 'react-native';

const CustomLoadingAnimation = () => {
  const [dot1Opacity, setDot1Opacity] = useState(new Animated.Value(0));
  const [dot2Opacity, setDot2Opacity] = useState(new Animated.Value(0));
  const [dot3Opacity, setDot3Opacity] = useState(new Animated.Value(0));

  const animateDots = () => {
    Animated.sequence([
      Animated.timing(dot1Opacity, {
        toValue: 1,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(dot2Opacity, {
        toValue: 1,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(dot3Opacity, {
        toValue: 1,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(dot1Opacity, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(dot2Opacity, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(dot3Opacity, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start(() => {
      animateDots(); // Repeat the animation
    });
  };

  useEffect(() => {
    animateDots();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.dot, {opacity: dot1Opacity}]} />
      <Animated.View style={[styles.dot, {opacity: dot2Opacity}]} />
      <Animated.View style={[styles.dot, {opacity: dot3Opacity}]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: '#B13F60', // Customize the dot color
    marginHorizontal: 2,
  },
});

export default CustomLoadingAnimation;
