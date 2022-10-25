import React from 'react';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import { colors } from '~/theme/colors';
import { EventDetails, Home, MySubscriptions, Ticket } from '~/screens';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();

const HomeStack = createStackNavigator();
const SubscriptionStack = createStackNavigator();

export const PrivateRoutes = () => (
   <Tab.Navigator
      initialRouteName="HomeScreens"
      screenOptions={{
         headerShown: false,
         tabBarActiveTintColor: colors.primary,
         tabBarInactiveTintColor: colors.pallete.metallicSilver,
         tabBarLabelStyle: { fontSize: 12 },
         tabBarStyle: {
            paddingTop: 10,
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
         name="HomeScreens"
         component={HomeScreens}
         options={{
            tabBarLabel: '',
            tabBarIcon: ({ color }) => (
               <AntDesign name="home" size={24} color={color} />
            ),
         }}
      />
      <Tab.Screen
         name="mySubscriptions"
         component={SubscriptionScreens}
         options={{
            tabBarLabel: '',
            tabBarIcon: ({ color }) => (
               <MaterialIcons name="event-available" size={28} color={color} />
            ),
         }}
      />
      <Tab.Screen
         name="account"
         component={Home}
         options={{
            tabBarLabel: '',
            tabBarIcon: ({ color }) => (
               <AntDesign name="user" size={24} color={color} />
            ),
         }}
      />
   </Tab.Navigator>
);

const HomeScreens = () => {
   return (
      <HomeStack.Navigator screenOptions={{ headerShown: false }}>
         <HomeStack.Screen name="Home" component={Home} />
         <HomeStack.Screen name="EventDetails" component={EventDetails} />
      </HomeStack.Navigator>
   );
};

const SubscriptionScreens = () => {
   return (
      <SubscriptionStack.Navigator screenOptions={{ headerShown: false }}>
         <SubscriptionStack.Screen
            name="Subscriptions"
            component={MySubscriptions}
         />
         <SubscriptionStack.Screen name="Ticket" component={Ticket} />
      </SubscriptionStack.Navigator>
   );
};
