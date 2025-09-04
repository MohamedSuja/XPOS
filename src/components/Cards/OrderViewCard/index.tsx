import { View, Text, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';
import { createButtonStyles } from './styles';
import { globalStyles } from '@/utils/globalStyles';
import PlusIcon from '@/assets/icons/Plus.svg';
import DangerIcon from '@/assets/icons/Danger.svg';
import CrossIcon from '@/assets/icons/Cross.svg';
import { wp } from '@/utils/Scaling';

interface OrderCardProps {}

const OrderViewCard = (props: OrderCardProps) => {
  const {} = props;
  const { colors }: ThemeContextType = useTheme();
  const styles = createButtonStyles(colors);

  return (
    <View style={[styles.container]}>
      <View style={styles.titleContainer}>
        <View style={styles.titleTextContainer}>
          <Text style={[globalStyles.h5, styles.title]}>
            Dum Chicken Biriyani{' '}
          </Text>
          <View style={styles.titleSubContainer}>
            <Text style={[globalStyles.h9, styles.subtitle]}>Large : </Text>
            <Text style={[globalStyles.h5, styles.subtitleNumber]}>1</Text>
            <Text style={[globalStyles.h9, styles.subtitle]}>
              Extra Large :{' '}
            </Text>
            <Text style={[globalStyles.h5, styles.subtitleNumber]}>1</Text>
          </View>
        </View>
        <View style={styles.totalContainer}>
          <CrossIcon width={wp(3)} height={wp(3)} />
          <Text style={[globalStyles.h2, styles.totalText]}>2</Text>
        </View>
      </View>
      <Text style={[globalStyles.h8, styles.addOns]}>Add-ons</Text>

      <View style={styles.addOnsItemContainer}>
        <PlusIcon width={wp(3)} height={wp(3)} />
        <Text style={[globalStyles.h9, styles.addOnsItem]}>
          Lorem ipsum dolor sit amet, consectetur
        </Text>
      </View>
      <View style={styles.addOnsItemContainer}>
        <PlusIcon width={wp(3)} height={wp(3)} />
        <Text style={[globalStyles.h9, styles.addOnsItem]}>
          Lorem ipsum dolor sit amet, consectetur
        </Text>
      </View>

      <Text style={[globalStyles.h8, styles.Instruction]}>Instruction</Text>

      <View style={styles.instructionContainer}>
        <DangerIcon width={wp(3)} height={wp(3)} />
        <Text style={[globalStyles.h9, styles.instructionItemText]}>
          Lorem ipsum dolor sit amet, consectetur{' '}
        </Text>
      </View>
    </View>
  );
};

export default OrderViewCard;
