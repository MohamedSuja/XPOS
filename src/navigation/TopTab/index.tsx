import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';
import { createStyles } from './styles';

// Import screen components
import RequestScreen from '@/screens/app/Order/RequestScreen';
import OngoingScreen from '@/screens/app/Order/OngoingScreen';
import ScheduledScreen from '@/screens/app/Order/ScheduledScreen';
import CompletedScreen from '@/screens/app/Order/CompletedScreen';
import CancelledScreen from '@/screens/app/Order/CancelledScreen';
import { View } from 'react-native';
import TabButton from './Tab';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { hp } from '@/utils/Scaling';
import { CustomStatusBar } from '@/components/customStatusBar';

const Tab = createMaterialTopTabNavigator();

interface TopTabNavigatorProps {
  // Add any props if needed
}

const TopTabNavigator: React.FC<TopTabNavigatorProps> = () => {
  const { colors }: ThemeContextType = useTheme();
  const styles = createStyles(colors);
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: hp(1.5),
        backgroundColor: colors.background,
      }}
    >
      <CustomStatusBar
        backgroundColor={colors.background}
        barStyle="dark-content"
        translucent={false}
      />
      <Tab.Navigator tabBar={props => <TabButton {...props} />}>
        <Tab.Screen name="Request" component={RequestScreen} />
        <Tab.Screen name="Ongoing" component={OngoingScreen} />
        <Tab.Screen name="Scheduled" component={ScheduledScreen} />
        <Tab.Screen name="Completed" component={CompletedScreen} />
        <Tab.Screen name="Cancelled" component={CancelledScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default TopTabNavigator;
