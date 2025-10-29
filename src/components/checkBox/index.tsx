import { View, Text, Pressable } from 'react-native';
import React, { useState } from 'react';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';
import { createStyles } from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { RFValue } from 'react-native-responsive-fontsize';

interface CheckBoxProps {
  isCheck: boolean;
  width: number;
  fontSize: number;
  onPress: any;
}

const CheckBox = (props: CheckBoxProps) => {
  const { colors }: ThemeContextType = useTheme();
  const styles = createStyles(colors);
  return (
    <Pressable
      style={[
        props.isCheck ? styles.focusBox : styles.box,
        { width: props.width, height: props.width },
      ]}
      onPress={() => {
        props.onPress();
      }}
    >
      {props.isCheck && (
        <AntDesign
          name="check"
          size={RFValue(props.fontSize)}
          color={colors.background}
        />
      )}
    </Pressable>
  );
};

export default CheckBox;
