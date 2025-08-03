import Colors from '@/utils/Colors';
import { hp, wp } from '@/utils/Scaling';
import { Platform, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
  IconContainer: {
    width: wp(20),
    paddingTop: hp(1),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ActiveIconContainer: {
    borderTopColor: Colors.brand['border'],
    borderTopWidth: 2,
    borderRadius: 5,
  },
  Label: {
    fontSize: Platform.OS === 'ios' ? RFValue(10) : RFValue(13),
    marginTop: hp(1),
    fontWeight: Platform.OS === 'ios' ? '400' : '400',
    color: Colors.brand['primary'],
  },

  ActiveLabel: {
    fontWeight: Platform.OS === 'ios' ? '700' : '900',
  },
});
