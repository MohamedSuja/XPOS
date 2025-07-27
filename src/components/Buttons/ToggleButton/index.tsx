import { View, Text, Animated, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

import { createStyles } from './styles';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';
import { globalStyles } from '@/utils/globalStyles';

interface ToggleButtonProps {
  leftLabel: string;
  rightLabel: string;
  onToggle: any;
  initialValue: boolean;
  isLoading: boolean;
}

const ToggleButton = (props: ToggleButtonProps) => {
  const { colors }: ThemeContextType = useTheme();
  const styles = createStyles(colors);

  const [isToggled, setIsToggled] = useState(props.initialValue);
  const [animatedValue] = useState(
    new Animated.Value(props.initialValue ? 1 : 0),
  );

  const handleToggle = () => {
    const newValue = !isToggled;
    setIsToggled(newValue);

    Animated.timing(animatedValue, {
      toValue: newValue ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();

    if (props.onToggle) {
      props.onToggle(newValue);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            styles.leftButton,
            !isToggled && styles.activeButton,
          ]}
          activeOpacity={0.8}
          {...(!props.isLoading && {
            onPress: () => (!isToggled ? null : handleToggle()),
          })}
        >
          <Text
            style={[
              globalStyles.h7,
              styles.buttonText,
              !isToggled && styles.activeText,
            ]}
          >
            {props.leftLabel}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            styles.rightButton,
            isToggled && styles.activeButtonGreen,
          ]}
          {...(!props.isLoading && {
            onPress: () => (isToggled ? null : handleToggle()),
          })}
          activeOpacity={0.8}
        >
          <Text style={[styles.buttonText, isToggled && styles.activeText]}>
            {props.rightLabel}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ToggleButton;
