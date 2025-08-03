import {
  View,
  Text,
  TextInput,
  ViewStyle,
  StyleProp,
  KeyboardTypeOptions,
  TextInputFocusEventData,
  NativeSyntheticEvent,
  TextStyle,
} from 'react-native';
import React, { useState } from 'react';
import { createInputStyles } from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';
import SearchIcon from '@/assets/icons/Search.svg';

interface TextInputProps {
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  valueStyle?: StyleProp<TextStyle>;
  error?: string | undefined;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  value?: string;
  keyboardType?: KeyboardTypeOptions | undefined;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  editable?: boolean;
  ref?: React.Ref<TextInput> | undefined;
}

const SearchInput = (props: TextInputProps) => {
  const {
    style,
    inputStyle,
    valueStyle,
    error,
    placeholder,
    onChangeText,
    value,
    keyboardType,
    onBlur,
    autoCapitalize,
    editable,
    ref,
  } = props;
  const [focus, setFocus] = useState(false);
  const { colors }: ThemeContextType = useTheme();
  const styles = createInputStyles(colors);

  return (
    <View style={[styles.container, style]}>
      <SearchIcon width={20} height={20} />
      <TextInput
        ref={ref}
        onFocus={() => setFocus(true)}
        onBlur={e => {
          setFocus(false);
          onBlur && onBlur(e);
        }}
        editable={editable}
        style={[
          styles.inputContainer,
          error !== '' && error !== undefined && styles.errorInputContainer,
          inputStyle,
          value
            ? [styles.activeInput, valueStyle] // Applied when user types
            : {}, // Default style (for placeholder)
        ]}
        placeholder={placeholder}
        placeholderTextColor={colors.placeHolder}
        onChangeText={onChangeText}
        value={value}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        testID="custom-text-input"
      />
    </View>
  );
};

export default SearchInput;
