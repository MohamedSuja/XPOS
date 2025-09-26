import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import React, { useRef, useState } from 'react';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';
import { createStyles } from './styles';
import { useUpdateEffect } from '@/utils/useUpdateEffect';
import {
  selectOrdersCanceledListData,
  selectOrdersCompletedListData,
  selectOrdersOngoingListData,
  selectOrdersRequestListData,
  selectOrdersScheduledListData,
} from '@/feature/slices/orders_slice';
import { useAppSelector } from '@/feature/stateHooks';
import { globalStyles } from '@/utils/globalStyles';
import { hp, wp } from '@/utils/Scaling';

interface TabButtonProps {
  state: {
    index: number;
    routes: Array<{
      key: string;
      name: string;
      params?: any;
    }>;
  };
  descriptors: {
    [key: string]: {
      options: {
        tabBarLabel?: string;
        title?: string;
      };
    };
  };
  navigation: {
    emit: (event: any) => { defaultPrevented: boolean };
    navigate: (name: string, params?: any) => void;
  };
}

const TabButton = ({ state, descriptors, navigation }: TabButtonProps) => {
  const { colors }: ThemeContextType = useTheme();
  const styles = createStyles(colors);
  const [input, setInput] = useState<number>(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const ordersRequestListData = useAppSelector(selectOrdersRequestListData);
  const ordersOngoingListData = useAppSelector(selectOrdersOngoingListData);
  const ordersScheduledListData = useAppSelector(selectOrdersScheduledListData);
  const ordersCompletedListData = useAppSelector(selectOrdersCompletedListData);
  const ordersCanceledListData = useAppSelector(selectOrdersCanceledListData);

  const dataCount = (index: number) => {
    switch (index) {
      case 0:
        return (
          ordersRequestListData?.data?.pagination_by_status?.request?.total || 0
        );
      case 1:
        return (
          ordersOngoingListData?.data?.pagination_by_status?.ongoing?.total || 0
        );
      case 2:
        return (
          ordersScheduledListData?.data?.pagination_by_status?.scheduled
            ?.total || 0
        );
      case 3:
        return (
          ordersCompletedListData?.data?.pagination_by_status?.completed
            ?.total || 0
        );
      case 4:
        return (
          ordersCanceledListData?.data?.pagination_by_status?.cancelled
            ?.total || 0
        );
      default:
        return 0;
    }
  };

  // Scroll to last tab when index is 2
  useUpdateEffect(() => {
    if (state.index === 2 && scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [state.index]);

  // Scroll to first tab when index is 1
  useUpdateEffect(() => {
    if (state.index === 1 && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: 0, animated: true });
    }
  }, [state.index]);

  return (
    <View style={styles.container}>
      <View
        style={{
          width: '100%',
          borderRadius: 12,
          height: '100%',
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: 'transparent',
        }}
      >
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: wp(1) }}
        >
          {state.routes.map((route: any, index: number) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }
            };

            return (
              <TouchableOpacity
                onPress={onPress}
                style={[
                  styles.buttonContainer,
                  {
                    backgroundColor: isFocused
                      ? colors.primary
                      : colors.cancelledBG,
                  },
                ]}
              >
                <Text
                  style={{
                    color: isFocused ? colors.background : colors.dropDownIcon,
                  }}
                >
                  {label}
                </Text>
                {(index === 0 || index === 1 || index === 2) && (
                  <View
                    style={[
                      styles.badgeContainer,
                      {
                        backgroundColor: isFocused
                          ? colors.background
                          : colors.tab,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        globalStyles.h10,
                        styles.badgeText,
                        {
                          color: isFocused
                            ? colors.primary
                            : colors.dropDownIcon,
                        },
                      ]}
                    >
                      {dataCount(index)}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default TabButton;
