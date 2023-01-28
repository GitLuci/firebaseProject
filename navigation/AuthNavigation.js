import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Alerts from '../screens/Alerts';
import Turns from '../screens/Turns';

const AuthNavigation = props => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Tasks" component={Home} />
      <Tab.Screen name="Alerts" component={Alerts} />
      <Tab.Screen name="Turn Change" component={Turns} />
    </Tab.Navigator>
  );
};

export default AuthNavigation;
