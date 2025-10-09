import {
  View,
  Text,
  Platform,
  Image,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';
import { globalStyles } from '@/utils/globalStyles';
import TopTabNavigator from '../TopTab';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import HomeScreen from '@/screens/app/HomeScreen';
import CategoryScreen from '@/screens/app/Menu/CategoryScreen';
import ReportScreen from '@/screens/app/ReportScreen';

const Tab = createBottomTabNavigator();
const BottomTab = () => {
  const { colors }: ThemeContextType = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
      edges={Platform.OS === 'ios' ? [] : ['bottom']}
    >
      <Tab.Navigator
        screenOptions={() => ({
          swipeEnabled: true,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.background,
            height: Platform.OS === 'ios' ? hp('12%') : hp('10%'),
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            flexDirection: 'row',
            paddingHorizontal: wp('6%'),
            paddingBottom: Platform.OS === 'ios' ? insets.bottom : 0,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: -4,
            },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 5,

            ...Platform.select({
              ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                paddingTop: hp('3%'),
              },
              android: {
                elevation: 5,
                paddingTop: hp('1.5%'),
              },
            }),
          },
          tabBarShowLabel: false,
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={() => ({
            tabBarButton: props => (
              <Pressable
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={props.onPress}
              >
                {props.children}
              </Pressable>
            ),
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  width: wp('14%'),
                  height: wp('14%'),
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: focused ? colors.tabBG : 'transparent',
                  borderRadius: 100,
                }}
              >
                {focused ? (
                  <View>
                    <Image
                      source={require('@/assets/icons/ICHomeFocus.png')}
                      style={{
                        width: wp('6%'),
                        height: wp('6%'),
                        resizeMode: 'contain',
                      }}
                    />
                  </View>
                ) : (
                  <View style={{ alignItems: 'center' }}>
                    <Image
                      source={require('@/assets/icons/ICHome.png')}
                      style={{
                        width: wp('6%'),
                        height: wp('6%'),
                        resizeMode: 'contain',
                      }}
                    />
                    <Text
                      style={[
                        globalStyles.h11,
                        { color: colors.dropDownIcon, textAlign: 'center' },
                      ]}
                    >
                      Home
                    </Text>
                  </View>
                )}
              </View>
            ),
          })}
        />
        <Tab.Screen
          name="OrderStack"
          component={TopTabNavigator}
          options={() => ({
            tabBarButton: props => (
              <Pressable
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={props.onPress}
              >
                {props.children}
              </Pressable>
            ),
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  width: wp('14%'),
                  height: wp('14%'),
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: focused ? colors.tabBG : 'transparent',
                  borderRadius: 100,
                }}
              >
                {focused ? (
                  <View>
                    <Image
                      source={require('@/assets/icons/OrderFocus.png')}
                      style={{
                        width: wp('6%'),
                        height: wp('6%'),
                        resizeMode: 'contain',
                      }}
                    />
                  </View>
                ) : (
                  <View style={{ alignItems: 'center' }}>
                    <Image
                      source={require('@/assets/icons/Order.png')}
                      style={{
                        width: wp('6%'),
                        height: wp('6%'),
                        resizeMode: 'contain',
                      }}
                    />
                    <Text
                      style={[
                        globalStyles.h11,
                        { color: colors.dropDownIcon, textAlign: 'center' },
                      ]}
                    >
                      Order
                    </Text>
                  </View>
                )}
              </View>
            ),
          })}
        />
        <Tab.Screen
          name="Category"
          component={CategoryScreen}
          options={() => ({
            tabBarButton: props => (
              <Pressable
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={props.onPress}
              >
                {props.children}
              </Pressable>
            ),
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  width: wp('14%'),
                  height: wp('14%'),
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: focused ? colors.tabBG : 'transparent',
                  borderRadius: 100,
                }}
              >
                {focused ? (
                  <View>
                    <Image
                      source={require('@/assets/icons/MenuFocus.png')}
                      style={{
                        width: wp('6%'),
                        height: wp('6%'),
                        resizeMode: 'contain',
                      }}
                    />
                  </View>
                ) : (
                  <View style={{ alignItems: 'center' }}>
                    <Image
                      source={require('@/assets/icons/Menu.png')}
                      style={{
                        width: wp('6%'),
                        height: wp('6%'),
                        resizeMode: 'contain',
                      }}
                    />
                    <Text
                      style={[
                        globalStyles.h11,
                        { color: colors.dropDownIcon, textAlign: 'center' },
                      ]}
                    >
                      Menu
                    </Text>
                  </View>
                )}
              </View>
            ),
          })}
        />
        <Tab.Screen
          name="Report"
          component={ReportScreen}
          options={() => ({
            tabBarButton: props => (
              <Pressable
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={props.onPress}
              >
                {props.children}
              </Pressable>
            ),
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  width: wp('14%'),
                  height: wp('14%'),
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: focused ? colors.tabBG : 'transparent',
                  borderRadius: 100,
                }}
              >
                {focused ? (
                  <View>
                    <Image
                      source={require('@/assets/icons/ReportsFocus.png')}
                      style={{
                        width: wp('6%'),
                        height: wp('6%'),
                        resizeMode: 'contain',
                      }}
                    />
                  </View>
                ) : (
                  <View style={{ alignItems: 'center' }}>
                    <Image
                      source={require('@/assets/icons/Reports.png')}
                      style={{
                        width: wp('6%'),
                        height: wp('6%'),
                        resizeMode: 'contain',
                      }}
                    />
                    <Text
                      style={[
                        globalStyles.h11,
                        { color: colors.dropDownIcon, textAlign: 'center' },
                      ]}
                    >
                      Report
                    </Text>
                  </View>
                )}
              </View>
            ),
          })}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default BottomTab;
