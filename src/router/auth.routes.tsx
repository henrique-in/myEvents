import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { SignIn, SignUp } from '~/screens/index';

const Auth = createStackNavigator();

export const AuthRoutes = () => (
   <Auth.Navigator
      screenOptions={{
         headerShown: false,
      }}
      initialRouteName="SignIn">
      <Auth.Screen name="SignIn" component={SignIn} />
      <Auth.Screen name="SignUp" component={SignUp} />
   </Auth.Navigator>
);
