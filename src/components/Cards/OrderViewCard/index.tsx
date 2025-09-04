import { View, Text, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';
import { createButtonStyles } from './styles';
import { globalStyles } from '@/utils/globalStyles';
import PlusIcon from '@/assets/icons/Plus.svg';
import DangerIcon from '@/assets/icons/Danger.svg';

interface OrderCardProps {}

const OrderViewCard = (props: OrderCardProps) => {
  const {} = props;
  const { colors }: ThemeContextType = useTheme();
  const styles = createButtonStyles(colors);

  return (
    <View style={[styles.container]}>
      <View>
        <View>
          <Text>Dum Chicken Biriyani </Text>
          <View>
            <Text>Large : </Text>
            <Text>1</Text>
            <Text>Large : </Text>
            <Text>1</Text>
          </View>
        </View>
        <Text>X2</Text>
      </View>
      <Text>Add-ons</Text>
      <View>
        <PlusIcon />
        <Text>Lorem ipsum dolor sit amet, consectetur </Text>
      </View>
      <Text>Instruction</Text>
      <View>
        <DangerIcon />
        <Text>Lorem ipsum dolor sit amet, consectetur </Text>
      </View>
    </View>
  );
};

export default OrderViewCard;
