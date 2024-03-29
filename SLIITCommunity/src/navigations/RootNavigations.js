import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Register from '../screens/Register';
import NewNotice from '../screens/Notices/NewNotice';
import OnboardingScreen from '../screens/onboardingScreens/onboardingScreen';
import Home from '../screens/Home';
import NewEvent from '../screens/EventManagement/AddEvent';
import ViewAllEvents from '../screens/EventManagement/ViewAllEvents';
import ViewEvent from '../screens/EventManagement/ViewEvent';
import UpdateEvent from '../screens/EventManagement/UpdateEvent';
import ViewNotice from '../screens/Notices/ViewNotice';
import AddLostOrFound from '../screens/lostAndFoundScreens/addLostOrFound';
import UpdateNotice from '../screens/Notices/UpdateNotice';
import NewCommunity from '../screens/Community/NewCommunity';
import ViewAllCommunities from '../screens/Community/ViewAllCommunities';
import ViewCommunity from '../screens/Community/ViewCommunity';
import UpdateCommunity from '../screens/Community/UpdateCommunity';
import MyNotices from '../screens/Profile/MyNotices';
import MyCommunities from '../screens/Profile/MyCommunities';
import Profile from '../screens/Profile';
import ViewSingleLostorFOund from '../screens/lostAndFoundScreens/viewSingleLostorFOund';
import AllLostOrFound from '../screens/lostAndFoundScreens/allLostOrFound';
import EditLostOrFound from '../screens/lostAndFoundScreens/editLostOrFound';
import Splash from '../components/commonComponents/Splash';

const Stack = createNativeStackNavigator();

const RootNavigations = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
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
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="ViewAllEvents"
        component={ViewAllEvents}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ViewEvent"
        component={ViewEvent}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Update Event"
        component={UpdateEvent}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="New Community"
        component={NewCommunity}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Update Community"
        component={UpdateCommunity}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="View Community"
        component={ViewCommunity}
        options={{headerShown: true}}
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
        name="My Notices"
        component={MyNotices}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="My Communities"
        component={MyCommunities}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="AddLostOrFound"
        component={AddLostOrFound}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="ViewSingleLostorFound"
        component={ViewSingleLostorFOund}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AllLostOrFound"
        component={AllLostOrFound}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditLostOrFound"
        component={EditLostOrFound}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default RootNavigations;
