import { View, Text, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';
import { createButtonStyles } from './styles';
import WarningIcon from '@/assets/icons/Warning.svg';
import { globalStyles } from '@/utils/globalStyles';

interface InstructionCardCardProps {
  title: string;
}

const InstructionCard = (props: InstructionCardCardProps) => {
  const { title } = props;
  const { colors }: ThemeContextType = useTheme();
  const styles = createButtonStyles(colors);

  return (
    <View style={[styles.container]}>
      <View style={styles.titleContainer}>
        <WarningIcon />
        <Text style={[styles.title, globalStyles.h12]}>Instruction</Text>
      </View>
      <Text style={[styles.description, globalStyles.h9]}>{title}</Text>
    </View>
  );
};

export default InstructionCard;
