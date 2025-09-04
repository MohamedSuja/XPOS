import { View, Text, TextInput } from 'react-native';
import React, { forwardRef, useState } from 'react';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';
import { createStyles } from './styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { globalStyles } from '@/utils/globalStyles';

interface CustomInputProps {
  value?: any;
  placeHolder: string;
  textContentType?: any;
  secureTextEntry?: boolean;
  returnKeyType: any;
  errorText?: string;
  maxLength?: number;
  errorTextState?: boolean;
  keyboardType?: any;
  startAdornment?: any;
  endAdornment?: any;
  onBlur?: any;
  onSubmitEditing: any;
  onChangeText: any;
}

const CustomInput = forwardRef<TextInput, CustomInputProps>((props, ref) => {
  const { colors }: ThemeContextType = useTheme();
  const styles = createStyles(colors);
  const [focused, setFocused] = useState(false);
  return (
    <View>
      <View
        style={[
          styles.container,
          {
            borderColor:
              props.errorTextState && props.errorText
                ? colors.errorText
                : focused
                ? colors.border
                : 'transparent',
            paddingHorizontal: props.startAdornment ? 0 : wp('4%'),
            backgroundColor:
              props.errorTextState && props.errorText
                ? colors.background
                : focused
                ? colors.background
                : colors.inputField,
            justifyContent: props.endAdornment ? 'space-between' : 'flex-start',
          },
        ]}
      >
        {props.startAdornment && props.startAdornment}
        <TextInput
          onChangeText={props.onChangeText}
          onBlur={e => {
            props.onBlur?.(e);
            setFocused(false);
          }}
          value={props.value}
          placeholder={props.placeHolder}
          textContentType={
            props.textContentType ? props.textContentType : 'none'
          }
          secureTextEntry={props.secureTextEntry}
          returnKeyType={props.returnKeyType}
          onSubmitEditing={props.onSubmitEditing}
          ref={ref}
          keyboardType={props.keyboardType ? props.keyboardType : 'default'}
          style={[globalStyles.h9, styles.inputfield]}
          placeholderTextColor={colors.placeHolder}
          {...(props.maxLength && { maxLength: props.maxLength })}
          onFocus={() => {
            setFocused(true);
          }}
        />
        {props.endAdornment && props.endAdornment}
      </View>
      {props.errorTextState && props.errorText && (
        <Text style={[globalStyles.h12, styles.errorText]}>
          {props.errorText}
        </Text>
      )}
    </View>
  );
});

export default CustomInput;
