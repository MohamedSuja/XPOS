import React, { useState } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  ViewStyle,
  StyleProp,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { createInputStyles } from './styles';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';
import { hp, wp } from '@/utils/Scaling';

interface CustomSwitchProps {
  value?: boolean;
  onChange?: (value: boolean) => void;
  activeColor?: string;
  inactiveColor?: string;
  thumbActiveColor?: string;
  thumbColor?: string;
  switchWidth?: number;
  switchHeight?: number;
  thumbSize?: number;
  style?: StyleProp<ViewStyle>;
}

const CustomSwitch = (props: CustomSwitchProps) => {
  const { colors }: ThemeContextType = useTheme();
  const styles = createInputStyles(colors);

  const {
    value,
    onChange,
    activeColor = colors.primary,
    inactiveColor = '#DFDFE0',
    thumbColor = '#fff',
    thumbActiveColor = '#ffff',
    switchWidth = wp(15),
    switchHeight = hp(4),
    thumbSize = wp(7),
    style,
  } = props;

  const [isSwitching, setIsSwitching] = useState(value ?? false);
  const translateX = useSharedValue(
    isSwitching ? switchWidth - thumbSize - 2.5 : 2.5,
  );

  const animatedThumbStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const handlePress = () => {
    translateX.value = withTiming(
      isSwitching ? 2.5 : switchWidth - thumbSize - 2.5,
      {
        duration: 200,
      },
    );
    setIsSwitching(!isSwitching);

    onChange && onChange(!isSwitching);
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View
        style={[
          styles.switchContainer,
          {
            backgroundColor: isSwitching ? activeColor : inactiveColor,
            width: switchWidth,
            height: switchHeight,
          },
          style,
        ]}
      >
        <Animated.View
          style={[
            styles.thumb,
            animatedThumbStyle,
            {
              backgroundColor: isSwitching ? thumbActiveColor : thumbColor,
              width: thumbSize,
              height: thumbSize,
            },
          ]}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CustomSwitch;
