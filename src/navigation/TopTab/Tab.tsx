import {
  View,
  TouchableOpacity,
  Platform,
  Text,
  ScrollView,
} from 'react-native';
import { useLinkBuilder } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';
import { createStyles } from './styles';
import { useUpdateEffect } from '@/utils/useUpdateEffect';

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
  position: any;
}

const TabButton = ({
  state,
  descriptors,
  navigation,
  position,
}: TabButtonProps) => {
  const { colors }: ThemeContextType = useTheme();
  const styles = createStyles(colors);
  const [input, setInput] = useState<number>(0);
  const scrollViewRef = useRef<ScrollView>(null);

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
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
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
              {index === 1 && (
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
                      styles.badgeText,
                      {
                        color: isFocused ? colors.primary : colors.dropDownIcon,
                      },
                    ]}
                  >
                    {index === 1 ? 4 : 0}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default TabButton;
