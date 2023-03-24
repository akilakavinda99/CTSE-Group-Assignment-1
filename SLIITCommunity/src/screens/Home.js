import React, { useState } from 'react';
import {
  Alert,
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ViewAllCommunities from './Community/ViewAllCommunities';
import ViewAllEvents from './EventManagement/ViewAllEvents';
import ViewAllNotices from './Notices/ViewAllNotices';
import Profile from './Profile';
import * as Animatable from 'react-native-animatable';

export default function Home({ screen }) {
  const [showingTab, setShowingTab] = useState(screen ? screen : 'Notices');

  const _renderIcon = (routeName, selectedTab) => {
    let icon = '';

    switch (routeName) {
      case 'Notices':
        icon = 'chatbubble-outline';
        break;
      case 'Communities':
        icon = 'people-outline';
        break;
      case 'Events':
        icon = 'calendar-outline';
        break;
      case 'Profile':
        icon = 'person-outline';
        break;
    }

    return (
      <Ionicons
        name={icon}
        size={25}
        color={routeName === selectedTab ? 'black' : 'gray'}
      />
    );
  };
  const renderTabBar = ({ routeName, selectedTab, navigate }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigate(routeName)
          setShowingTab(routeName)
        }}
        style={styles.tabbarItem}
      >
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };

  return (
    <CurvedBottomBar.Navigator
      type="UP"
      style={styles.bottomBar}
      shadowStyle={styles.shawdow}
      height={55}
      circleWidth={50}
      bgColor="white"
      initialRouteName={screen}
      borderTopLeftRight
      screenOptions={{ headerShown: false }}
      renderCircle={({ selectedTab, navigate }) => {
        switch (selectedTab) {
          case 'Notices':
            return (
              <Animatable.View animation="bounceIn" iterationCount={"infinite"} direction="alternate" style={styles.btnCircleUp}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    navigate('New Notice');
                  }}
                >
                  <Ionicons name={'add-outline'} color="white" size={40} />
                </TouchableOpacity>
              </Animatable.View>
            );

          case 'Communities':
            return (
              <Animatable.View animation="bounceIn" iterationCount={"infinite"} direction="alternate" style={styles.btnCircleUp}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    navigate('New Community');
                  }}
                >
                  <Ionicons name={'add-outline'} color="white" size={40} />
                </TouchableOpacity>
              </Animatable.View>
            );

          case 'Events':
            return (
              <Animated.View style={styles.btnCircleUp}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    navigate('NewEvent');
                  }}
                >
                  <Ionicons name={'add-outline'} color="gray" size={40} />
                </TouchableOpacity>
              </Animated.View>
            );

          default:
            return (
              <Animated.View style={styles.btnCircleUp}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => Alert.alert('Click Action')}
                >
                  <Ionicons name={'apps-sharp'} color="white" size={25} />
                </TouchableOpacity>
              </Animated.View>
            );
        }
      }}
      tabBar={renderTabBar}
    >
      <CurvedBottomBar.Screen style={backgroundColor = "red"}
        name="Notices"
        position="LEFT"
        component={() => <ViewAllNotices />}
      />
      <CurvedBottomBar.Screen
        name="Events"
        component={() => <ViewAllEvents />}
        position="LEFT"
      />
      <CurvedBottomBar.Screen
        name="Communities"
        component={() => <ViewAllCommunities />}
        position="RIGHT"
      />
    </CurvedBottomBar.Navigator>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  shawdow: {
    shadowColor: '#DDDDDD',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomBar: {},
  btnCircleUp: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#242D66',
    bottom: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  imgCircle: {
    width: 30,
    height: 30,
    tintColor: 'gray',
  },
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 30,
    height: 30,
  },
  screen1: {
    flex: 1,
    backgroundColor: '#BFEFFF',
  },
  screen2: {
    flex: 1,
    backgroundColor: '#FFEBCD',
  },
});
