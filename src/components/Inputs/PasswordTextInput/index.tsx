import {
  View,
  Text,
  TextInput,
  ViewStyle,
  StyleProp,
  TouchableOpacity,
  TextInputFocusEventData,
  NativeSyntheticEvent,
} from 'react-native';
import React, { useState } from 'react';
import Eye from '@/assets/icons/Eye.svg';
import EyeClosed from '@/assets/icons/EyeClosed.svg';
import { createInputStyles } from './styles';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';

interface PasswordTextInputProps {
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
  activeInput?: StyleProp<ViewStyle>;
  error?: string | undefined;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  value?: string;
  editable?: boolean;
  ref?: React.Ref<TextInput> | undefined;
}

const PasswordTextInput = (props: PasswordTextInputProps) => {
  const {
    style,
    inputStyle,
    activeInput,
    error,
    placeholder,
    onChangeText,
    onBlur,
    value,
    editable,
    ref,
  } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [focus, setFocus] = useState(false);
  const { colors }: ThemeContextType = useTheme();
  const styles = createInputStyles(colors);

  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.inputContainer,
          focus && styles.activeInputContainer,
          focus && activeInput,
          error !== '' && styles.errorInputContainer,
          inputStyle,
        ]}
        testID="password-input-container"
      >
        <TextInput
          ref={ref}
          onFocus={() => setFocus(true)}
          onBlur={e => {
            setFocus(false);
            onBlur && onBlur(e);
          }}
          secureTextEntry={!showPassword}
          style={[
            styles.textInput,
            value
              ? styles.activeInput // Applied when user types
              : {}, // Default style (for placeholder)
          ]}
          placeholder={placeholder}
          placeholderTextColor={colors.placeHolder}
          onChangeText={onChangeText}
          value={value}
          editable={editable}
          testID="custom-password-input"
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          {/* istanbul ignore next */}
          {showPassword ? (
            <Eye testID="eye-open" />
          ) : (
            <EyeClosed testID="eye-closed" />
          )}
        </TouchableOpacity>
      </View>
      {error && (
        <Text style={[styles.validationText, { color: colors.errorText }]}>
          {error}
        </Text>
      )}
    </View>
  );
};

export default PasswordTextInput;
