import {
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import React from 'react';
import { createButtonStyles } from './styles';
import { useTheme } from '@/utils/ThemeContext';
import { ThemeContextType } from '@/utils/ThemeContext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { wp } from '@/utils/Scaling';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';

interface BackButtonProps {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean | undefined;
}

const BackButton = (props: BackButtonProps) => {
  const navigation = useNavigation();
  const { onPress, style, disabled } = props;
  const { colors }: ThemeContextType = useTheme();
  const styles = createButtonStyles(colors);

  return (
    <TouchableOpacity
      onPress={() => {
        if (onPress) {
          onPress();
        } else {
          navigation.goBack();
        }
      }}
      style={[styles.container, disabled && styles.disabled, style]}
      disabled={disabled}
      activeOpacity={0.5}
    >
      <AntDesign name="arrowleft" size={RFValue(18)} color={colors.primary} />
    </TouchableOpacity>
  );
};

export default BackButton;
