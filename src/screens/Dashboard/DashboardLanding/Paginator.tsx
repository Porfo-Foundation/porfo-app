import {StyleSheet, View, Animated, useWindowDimensions} from 'react-native';
import React from 'react';

const Paginator = ({data, scrollX}: any) => {
  const {width} = useWindowDimensions();
  return (
    <View style={styles.container}>
      {data.map((_: any, i: any) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            style={[styles.dot, {width: dotWidth, opacity}]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
};

export default Paginator;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 64,
    marginBottom: 20,
  },
  dot: {
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: 'purple',
  },
});
