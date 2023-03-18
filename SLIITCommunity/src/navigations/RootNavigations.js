import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Register from '../screens/Register';
import NewNotice from '../screens/Notices/NewNotice';
import OnboardingScreen from '../screens/onboardingScreens/onboardingScreen';
import BottomNavTest from '../screens/BottomNavTest';
import NewEvent from '../screens/EventManagement/AddEvent';
import ViewNotice from '../screens/Notices/ViewNotice';

const Stack = createNativeStackNavigator();

const RootNavigations = () => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name="Login"
        component={BottomNavTest}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NewEvent"
        component={NewEvent}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={BottomNavTest}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NewNotice"
        component={NewNotice}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ViewNotice"
        component={ViewNotice}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddLostOrFound"
        component={AddLostOrFound}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default RootNavigations;
