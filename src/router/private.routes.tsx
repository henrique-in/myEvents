import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import { colors } from '~/theme/colors';
import { Home } from '~/screens';

const Tab = createBottomTabNavigator();

export const PrivateRoutes = () => (
   <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
         headerShown: false,
         tabBarActiveTintColor: colors.primary,
         tabBarInactiveTintColor: colors.pallete.metallicSilver,
         tabBarStyle: {
            backgroundColor: colors.background,
            ...Platform.select({
               android: {
                  elevation: 3,
               },
               ios: {
                  shadowColor: '#000',
                  shadowOffset: {
                     width: 0,
                     height: 2,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 3.84,
               },
            }),
         },
      }}>
      <Tab.Screen
         name="Home"
         component={Home}
         options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
               <AntDesign name="home" size={24} color={color} />
            ),
         }}
      />
   </Tab.Navigator>
);
