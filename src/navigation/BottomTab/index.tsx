import { hp, wp } from '@/utils/Scaling';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Platform, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppStackScreenProps } from '../NavigationModels/AppStack';
import Colors from '@/utils/Colors';

const Tab = createBottomTabNavigator<any>();

const BottomTab: React.FC<AppStackScreenProps<'BottomTab'>> = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.brand['white'],
        tabBarStyle: {
          height: Platform.OS === 'ios' ? wp(26) : wp(23) + insets.bottom,
          borderColor: Colors.grey['100'],
          borderTopWidth: 1,
          backgroundColor: Colors.brand['white'],
        },
        tabBarItemStyle: {
          marginTop: hp(2),
        },

        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={<View />}
        options={({ navigation, route }) => ({
          tabBarIcon: ({ focused }) => <View></View>,
        })}
      />
      <Tab.Screen
        name="MainMenuScreen"
        component={<View />}
        options={() => ({
          tabBarIcon: ({ focused }) => <View></View>,
        })}
      />
      <Tab.Screen
        name="BreakScreen"
        component={<View />}
        options={() => ({
          tabBarIcon: ({ focused }) => <View></View>,
        })}
      />
      <Tab.Screen
        name="SettingsHomeScreen"
        component={<View />}
        options={() => ({
          tabBarIcon: ({ focused }) => <View></View>,
        })}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
