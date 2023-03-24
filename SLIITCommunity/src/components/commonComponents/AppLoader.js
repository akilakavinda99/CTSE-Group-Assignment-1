import React from 'react';
import {View, StyleSheet} from 'react-native';
import AnimatedLottieView from 'lottie-react-native';

const AppLoader = () => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <AnimatedLottieView
        style={{ transform: [{ scale: 0.55 }] }}
        source={require('../../assets/93603-loading-lottie-animation.json')}
        autoPlay
        loop
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',
    zIndex: 1,
  },
});

export default AppLoader;
