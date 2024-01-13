import * as React from 'react';
import {Easing, TextInput, Animated, View, StyleSheet} from 'react-native';
import Svg, {G, Circle} from 'react-native-svg';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export default function DonutChart({
  min = 75,
  radius = 60,
  strokeWidth = 10,
  duration = 500,
  color = 'tomato',
  delay = 10,
  // textColor,
  max = 100,
}) {
  const animated = React.useRef(new Animated.Value(0)).current;
  const circleRef = React.useRef();
  const inputRef = React.useRef();
  const circumference = 2 * Math.PI * radius;
  const halfCircle = radius + strokeWidth;

  console.log(max, min);

  const animation = toValue => {
    return Animated.timing(animated, {
      delay: delay,
      toValue,
      duration,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  };

  React.useEffect(() => {
    animation(min);
    animated.addListener(
      v => {
        const maxPerc = (100 * v.value) / max;
        const strokeDashoffset =
          circumference - (circumference * maxPerc) / 100;
        if (inputRef?.current) {
          inputRef.current.setNativeProps({
            text: `${(v.value * (100 / max)).toFixed(2)}%`,
          });
        }
        if (circleRef?.current) {
          circleRef.current.setNativeProps({
            strokeDashoffset,
          });
        }
      },
      [max, min],
    );

    return () => {
      animated.removeAllListeners();
    };
  });

  return (
    <View style={{width: radius * 2, height: radius * 2}}>
      <Svg
        height={radius * 2}
        width={radius * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
        <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
          <Circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="transparent"
            stroke="#D9D9D9"
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
            strokeOpacity="1"
          />
          <Circle
            ref={circleRef}
            cx="50%"
            cy="50%"
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth={strokeWidth}
            // strokeLinecap="round"
            strokeDashoffset={circumference}
            strokeDasharray={circumference}
          />
        </G>
      </Svg>
      {/* <AnimatedTextInput
        ref={inputRef}
        underlineColorAndroid="transparent"
        editable={false}
        defaultValue="0"
        style={[
          StyleSheet.absoluteFillObject,
          {fontSize: radius / 2.5, color: textColor ?? color},
          styles.text,
        ]}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {textAlign: 'center', fontFamily: 'Rale6'},
});
