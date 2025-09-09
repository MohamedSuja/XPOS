import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';
import { createStyles } from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { RFValue } from 'react-native-responsive-fontsize';
import { globalStyles } from '@/utils/globalStyles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '@/components/Buttons/BackButton';

const DATA = [
  'Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod Lorem ipsum dolor.',
  'Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
  'Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
];
const PrivacyPolicyScreen = ({ navigation }: any) => {
  const { colors }: ThemeContextType = useTheme();
  const styles = createStyles(colors);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.background}
        animated={true}
        translucent={false}
      />
      {/* Header */}

      <View style={[styles.headerContainer]}>
        <View style={styles.headerContent}>
          <BackButton style={[styles.backBtn]} />
          <Text style={[globalStyles.h5, styles.headerTxt]}>
            Privacy Policy
          </Text>
        </View>
      </View>

      <View style={{ marginHorizontal: wp('4%'), marginTop: hp('2%') }}>
        <Text style={[globalStyles.h5, { color: colors.headerTxt }]}>
          Terms and conditions
        </Text>
        <FlatList
          data={DATA}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            gap: hp('1%'),
            paddingHorizontal: wp('4%'),
            paddingTop: hp('1%'),
          }}
          renderItem={({ item }) => (
            <Text style={[globalStyles.h9, { color: colors.inputTxt }]}>
              {item}
            </Text>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default PrivacyPolicyScreen;
