import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Register from '../screens/Register';
import NewNotice from '../screens/Notices/NewNotice';
import OnboardingScreen from '../screens/onboardingScreens/onboardingScreen';
import Home from '../screens/Home';
import NewEvent from '../screens/EventManagement/AddEvent';
import ViewNotice from '../screens/Notices/ViewNotice';
import AddLostOrFound from '../screens/lostAndFoundScreens/addLostOrFound';
import UpdateNotice from '../screens/Notices/UpdateNotice';
import NewCommunity from '../screens/Community/NewCommunity';
import ViewAllCommunities from '../screens/Community/ViewAllCommunities';
import ViewCommunity from '../screens/Community/ViewCommunity';
import UpdateCommunity from '../screens/Community/UpdateCommunity';

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
        component={Login}
        options={{ headerShown: false }}
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
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="New Community"
        component={NewCommunity}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Update Community"
        component={UpdateCommunity}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="View Community"
        component={ViewCommunity}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="New Notice"
        component={NewNotice}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="View Notice"
        component={ViewNotice}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Edit Notice"
        component={UpdateNotice}
        options={{headerShown: true}}
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
