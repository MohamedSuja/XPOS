import { View, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { globalStyles } from '@/utils/globalStyles';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';
import { createStyles } from './styles';

interface searchBarProps {
  onChange: any;
  onClear?: any;
  value?: string;
  borderColor?: string;
  maxWidth?: any;
  placeHolder: string;
  isAutoFocus?: boolean;
  onSubmit?: any;
  onFocus?: any;
  onBlur?: any;
}
const SearchBar = (props: searchBarProps) => {
  const { colors }: ThemeContextType = useTheme();
  const styles = createStyles(colors);
  return (
    <View style={[styles.container]}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Feather name="search" size={RFValue(18)} color={colors.dateText} />
        <TextInput
          placeholder={props.placeHolder}
          style={[
            globalStyles.h9,
            styles.inputfield,
            { maxWidth: props.maxWidth ? props.maxWidth : wp('60%') },
          ]}
          value={props.value}
          onChangeText={props.onChange}
          textContentType="name"
          placeholderTextColor={colors.dateText}
          keyboardType="default"
          returnKeyType="search"
          {...(props.onSubmit && {
            onSubmitEditing: () => {
              props.onSubmit();
            },
          })}
          {...(props.onFocus && {
            onFocus: () => {
              props.onFocus();
            },
          })}
          {...(props.onBlur && {
            onBlur: () => {
              props.onBlur();
            },
          })}
          autoFocus={props.isAutoFocus ? true : false}
        />
      </View>
      {props.value && (
        <TouchableOpacity
          onPress={() => {
            props.onClear();
          }}
        >
          <EvilIcons name="close" size={RFValue(18)} color={colors.dateText} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;
