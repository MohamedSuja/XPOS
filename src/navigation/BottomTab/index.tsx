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
import MenuStack from '../Stacks/MenuStack';
import HomeStack from '../Stacks/HomeStack';
import ReportStack from '../Stacks/ReportStack';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();
const BottomTab = () => {
  const { colors }: ThemeContextType = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView
      edges={['bottom']}
      style={{ flex: 1, backgroundColor: colors.inputField }}
    >
      <Tab.Navigator
        screenOptions={() => ({
          swipeEnabled: true,
          headerShown: false,
          tabBarStyle: {
            // backgroundColor: colors.background,
            // height: hp('12%'),
            // borderTopLeftRadius: 20,
            // borderTopRightRadius: 20,
            // justifyContent: 'center',
            // alignItems: 'center',
            // flexDirection: 'row',
            // paddingHorizontal: wp('6%'),

            backgroundColor: colors.background,
            // Remove fixed height, let it adapt
            minHeight: hp('10%'), // Use minHeight instead
            maxHeight: hp('12%'),
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            paddingHorizontal: wp('6%'),
            // Add bottom padding based on safe area
            paddingBottom: insets.bottom,

            ...Platform.select({
              ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                paddingTop: hp('2%'),
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
          component={HomeStack}
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
          name="TopTab"
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
          name="Menu"
          component={MenuStack}
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
          component={ReportStack}
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

    // <SafeAreaView
    //   edges={['bottom']}
    //   style={{
    //     flex: 1,
    //     backgroundColor: '#F9F9F9',
    //     borderTopLeftRadius: 20,
    //     borderTopRightRadius: 20,
    //   }}
    // >
    //   <Tab.Navigator
    //     screenOptions={() => ({
    //       headerShown: false,
    //       tabBarStyle: {
    //         backgroundColor: colors.background,
    //         paddingTop: 30,
    //         height: hp('12%'),
    //         borderTopLeftRadius: 20,
    //         borderTopRightRadius: 20,
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //         flexDirection: 'row',
    //         paddingHorizontal: wp('6%'),
    //         ...Platform.select({
    //           ios: {
    //             shadowColor: '#000',
    //             shadowOffset: { width: 0, height: 3 },
    //             shadowOpacity: 0.2,
    //             shadowRadius: 4,
    //           },
    //           android: {
    //             elevation: 5,
    //           },
    //         }),
    //       },
    //       tabBarShowLabel: false,
    //     })}
    //   >
    //     <Tab.Screen
    //       name="Home"
    //       component={HomeStack}
    //       options={() => ({
    //         tabBarButton: props => (
    //           <Pressable
    //             style={{
    //               flex: 1,
    //               justifyContent: 'center',
    //               alignItems: 'center',
    //             }}
    //             onPress={props.onPress}
    //           >
    //             {props.children}
    //           </Pressable>
    //         ),
    //         tabBarIcon: ({ focused }) => (
    //           <View
    //             style={{
    //               width: wp('14%'),
    //               height: wp('14%'),
    //               justifyContent: 'center',
    //               alignItems: 'center',
    //               backgroundColor: focused ? colors.tabBG : 'transparent',
    //               borderRadius: 100,
    //             }}
    //           >
    //             {focused ? (
    //               <View>
    //                 <Image
    //                   source={require('@/assets/icons/ICHomeFocus.png')}
    //                   style={{
    //                     width: wp('6%'),
    //                     height: wp('6%'),
    //                     resizeMode: 'contain',
    //                   }}
    //                 />
    //               </View>
    //             ) : (
    //               <View style={{ alignItems: 'center' }}>
    //                 <Image
    //                   source={require('@/assets/icons/ICHome.png')}
    //                   style={{
    //                     width: wp('6%'),
    //                     height: wp('6%'),
    //                     resizeMode: 'contain',
    //                   }}
    //                 />
    //                 <Text
    //                   style={[
    //                     globalStyles.h11,
    //                     { color: colors.dropDownIcon, textAlign: 'center' },
    //                   ]}
    //                 >
    //                   Home
    //                 </Text>
    //               </View>
    //             )}
    //           </View>
    //         ),
    //       })}
    //     />
    //     <Tab.Screen
    //       name="TopTab"
    //       component={TopTabNavigator}
    //       options={() => ({
    //         tabBarButton: props => (
    //           <Pressable
    //             style={{
    //               flex: 1,
    //               justifyContent: 'center',
    //               alignItems: 'center',
    //             }}
    //             onPress={props.onPress}
    //           >
    //             {props.children}
    //           </Pressable>
    //         ),
    //         tabBarIcon: ({ focused }) => (
    //           <View
    //             style={{
    //               width: wp('14%'),
    //               height: wp('14%'),
    //               justifyContent: 'center',
    //               alignItems: 'center',
    //               backgroundColor: focused ? colors.tabBG : 'transparent',
    //               borderRadius: 100,
    //             }}
    //           >
    //             {focused ? (
    //               <View>
    //                 <Image
    //                   source={require('@/assets/icons/OrderFocus.png')}
    //                   style={{
    //                     width: wp('6%'),
    //                     height: wp('6%'),
    //                     resizeMode: 'contain',
    //                   }}
    //                 />
    //               </View>
    //             ) : (
    //               <View style={{ alignItems: 'center' }}>
    //                 <Image
    //                   source={require('@/assets/icons/Order.png')}
    //                   style={{
    //                     width: wp('6%'),
    //                     height: wp('6%'),
    //                     resizeMode: 'contain',
    //                   }}
    //                 />
    //                 <Text
    //                   style={[
    //                     globalStyles.h11,
    //                     { color: colors.dropDownIcon, textAlign: 'center' },
    //                   ]}
    //                 >
    //                   Order
    //                 </Text>
    //               </View>
    //             )}
    //           </View>
    //         ),
    //       })}
    //     />
    //     <Tab.Screen
    //       name="Menu"
    //       component={MenuStack}
    //       options={() => ({
    //         tabBarButton: props => (
    //           <Pressable
    //             style={{
    //               flex: 1,
    //               justifyContent: 'center',
    //               alignItems: 'center',
    //             }}
    //             onPress={props.onPress}
    //           >
    //             {props.children}
    //           </Pressable>
    //         ),
    //         tabBarIcon: ({ focused }) => (
    //           <View
    //             style={{
    //               width: wp('14%'),
    //               height: wp('14%'),
    //               justifyContent: 'center',
    //               alignItems: 'center',
    //               backgroundColor: focused ? colors.tabBG : 'transparent',
    //               borderRadius: 100,
    //             }}
    //           >
    //             {focused ? (
    //               <View>
    //                 <Image
    //                   source={require('@/assets/icons/MenuFocus.png')}
    //                   style={{
    //                     width: wp('6%'),
    //                     height: wp('6%'),
    //                     resizeMode: 'contain',
    //                   }}
    //                 />
    //               </View>
    //             ) : (
    //               <View style={{ alignItems: 'center' }}>
    //                 <Image
    //                   source={require('@/assets/icons/Menu.png')}
    //                   style={{
    //                     width: wp('6%'),
    //                     height: wp('6%'),
    //                     resizeMode: 'contain',
    //                   }}
    //                 />
    //                 <Text
    //                   style={[
    //                     globalStyles.h11,
    //                     { color: colors.dropDownIcon, textAlign: 'center' },
    //                   ]}
    //                 >
    //                   Menu
    //                 </Text>
    //               </View>
    //             )}
    //           </View>
    //         ),
    //       })}
    //     />
    //     <Tab.Screen
    //       name="Report"
    //       component={ReportStack}
    //       options={() => ({
    //         tabBarButton: props => (
    //           <Pressable
    //             style={{
    //               flex: 1,
    //               justifyContent: 'center',
    //               alignItems: 'center',
    //             }}
    //             onPress={props.onPress}
    //           >
    //             {props.children}
    //           </Pressable>
    //         ),
    //         tabBarIcon: ({ focused }) => (
    //           <View
    //             style={{
    //               width: wp('14%'),
    //               height: wp('14%'),
    //               justifyContent: 'center',
    //               alignItems: 'center',
    //               backgroundColor: focused ? colors.tabBG : 'transparent',
    //               borderRadius: 100,
    //             }}
    //           >
    //             {focused ? (
    //               <View>
    //                 <Image
    //                   source={require('@/assets/icons/ReportsFocus.png')}
    //                   style={{
    //                     width: wp('6%'),
    //                     height: wp('6%'),
    //                     resizeMode: 'contain',
    //                   }}
    //                 />
    //               </View>
    //             ) : (
    //               <View style={{ alignItems: 'center' }}>
    //                 <Image
    //                   source={require('@/assets/icons/Reports.png')}
    //                   style={{
    //                     width: wp('6%'),
    //                     height: wp('6%'),
    //                     resizeMode: 'contain',
    //                   }}
    //                 />
    //                 <Text
    //                   style={[
    //                     globalStyles.h11,
    //                     { color: colors.dropDownIcon, textAlign: 'center' },
    //                   ]}
    //                 >
    //                   Report
    //                 </Text>
    //               </View>
    //             )}
    //           </View>
    //         ),
    //       })}
    //     />
    //   </Tab.Navigator>
    // </SafeAreaView>
  );
};

export default BottomTab;
