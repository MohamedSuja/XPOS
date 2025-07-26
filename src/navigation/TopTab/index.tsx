import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';
import { createStyles } from './styles';

// Import screen components
import RequestScreen from '@/screens/app/Report/RequestScreen';
import OngoingScreen from '@/screens/app/Report/OngoingScreen';
import ScheduledScreen from '@/screens/app/Report/ScheduledScreen';
import CompletedScreen from '@/screens/app/Report/CompletedScreen';
import CancelledScreen from '@/screens/app/Report/CancelledScreen';
import { View } from 'react-native';
import TabButton from './Tab';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createMaterialTopTabNavigator();

interface TopTabNavigatorProps {
  // Add any props if needed
}

const TopTabNavigator: React.FC<TopTabNavigatorProps> = () => {
  const { colors }: ThemeContextType = useTheme();
  const styles = createStyles(colors);
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        backgroundColor: colors.background,
      }}
    >
      <Tab.Navigator tabBar={props => <TabButton {...props} />}>
        <Tab.Screen name="Request" component={RequestScreen} />
        <Tab.Screen name="Ongoing" component={OngoingScreen} />
        <Tab.Screen name="Scheduled" component={ScheduledScreen} />
        <Tab.Screen name="Completed" component={CompletedScreen} />
        <Tab.Screen name="Cancelled" component={CancelledScreen} />
      </Tab.Navigator>
    </View>
  );
};

export default TopTabNavigator;
