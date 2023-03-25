import React, { useEffect } from 'react';
import {View, StyleSheet} from 'react-native';
import AnimatedLottieView from 'lottie-react-native';
import { StackActions } from '@react-navigation/native';

const Splash = ({ navigation }) => {

    useEffect(() => {
        const timeout = setTimeout(() => {
          navigation.dispatch(StackActions.replace('Onboarding'));
        }, 1200);
        return () => clearTimeout(timeout);
      }, [navigation]);

    return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <AnimatedLottieView
        style={{ transform: [{ scale: 0.7 }] }}
        source={require('../../assets/107910-loading-blue-and-yellow.json')}
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
    backgroundColor: 'rgba(255,255,255,1)',
    zIndex: 1,
  },
});

export default Splash;
