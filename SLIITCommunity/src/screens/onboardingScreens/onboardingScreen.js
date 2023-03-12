import {
  Image,
  Button,
  StyleSheet,
  Pressable,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Onboarding from 'react-native-onboarding-swiper';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../styles/appStyles';
import {primaryColors} from '../../styles/colors';

const OnboardingScreen = ({navigation}) => {
  return (
    <Onboarding
      onDone={() => navigation.navigate('Login')}
      pages={[
        {
          backgroundColor: '#ffffff',
          image: (
            <Image
              style={styles.screenImage}
              source={{
                uri: 'https://i.postimg.cc/jjGRgcpL/79812-happy-student.gif',
              }}
            />
          ),
          title: (
            <Text style={styles.titleText}>Welcome to SLIIT Community</Text>
          ),
          subtitle: (
            <Text style={styles.descText}>
              SLIIT Community is the number one place where you can get all the
              news on what is going on in SLIIT !!
            </Text>
          ),
        },
        {
          backgroundColor: '#ffffff',
          image: (
            <Image
              style={styles.screenImage}
              source={{
                uri: 'https://i.postimg.cc/sXdPm9xc/38964-group-of-people-communicating.gif',
              }}
            />
          ),
          title: (
            <Text style={styles.titleText}>
              Get to know about clubs and societies
            </Text>
          ),
          subtitle: (
            <Text style={styles.descText}>
              Get to know about the clubs and communities in SLIIT, get all the
              information about there upcoming meetings and etc..
            </Text>
          ),
        },
        {
          backgroundColor: '#ffffff',
          image: (
            <Image
              style={styles.screenImage}
              source={{
                uri: 'https://i.postimg.cc/FsyBtz3G/55823-singer-in-studio.gif',
              }}
            />
          ),
          title: (
            <Text style={styles.titleText}>
              Information about all the events
            </Text>
          ),
          subtitle: (
            <Text style={styles.descText}>
              Get all the information on events and upcoming stuff, with all the
              details including the venue and dates...
            </Text>
          ),
        },
        {
          backgroundColor: '#ffffff',
          image: (
            <Image
              style={styles.screenImage}
              source={{
                uri: 'https://i.postimg.cc/X7Y5f74X/8021-empty-and-lost.gif',
              }}
            />
          ),
          title: <Text style={styles.titleText}>Lost and found</Text>,
          subtitle: (
            <Text style={styles.descText}>
              If you lost something on SLIIT premises dont worry you can put a
              post through our lost and found section and eventually you will
              find it..
            </Text>
          ),
        },
      ]}
    />
  );
};
const styles = StyleSheet.create({
  skipButton: {
    position: 'absolute',
    bottom: 750,
    left: 340,
  },

  skipText: {
    color: '#A5A5A5',
    alignItems: 'center',
    fontWeight: 500,
    justifyContent: 'center',
  },

  buttonDiv: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    width: '206%',
  },

  titleText: {
    fontWeight: 'bold',
    position: 'absolute',
    fontSize: 20,
    paddingTop: 200,
    color: primaryColors.primaryBlue,
  },

  descText: {
    fontSize: 12,
    position: 'absolute',
    color: '#000',
    textAlign: 'center',
    padding: 30,
    lineHeight: 20,
    paddingTop: 360,
  },

  screenImage: {
    position: 'absolute',
    bottom: -90,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT / 1.5,
  },
});

export default OnboardingScreen;
