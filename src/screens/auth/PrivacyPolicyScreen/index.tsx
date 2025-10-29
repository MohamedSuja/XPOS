import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
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
import { ErrorFlash } from '@/utils/FlashMessage';
import { requests } from '@/feature/services/api';
import Markdown from 'react-native-markdown-display';

const DATA = [
  'Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod Lorem ipsum dolor.',
  'Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
  'Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed do eiusmod Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
];
const PrivacyPolicyScreen = ({ navigation }: any) => {
  const { colors }: ThemeContextType = useTheme();
  const styles = createStyles(colors);

  const [privacyPolicy, setPrivacyPolicy] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const getPrivacyPolicy = () => {
    try {
      requests
        .get('/api/pos/support/privacy-policy')
        .then(res => {
          setPrivacyPolicy(res.data?.data?.privacy_policy);
        })
        .catch(error => {
          console.log(error);
          ErrorFlash(error?.message || 'Something went wrong!');
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      ErrorFlash('Something went wrong!');
    }
  };

  useEffect(() => {
    getPrivacyPolicy();
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

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

      <ScrollView
        contentContainerStyle={{
          marginHorizontal: wp('4%'),
          marginTop: hp('1%'),
          paddingBottom: hp('5%'),
        }}
      >
        {/* <Text style={[globalStyles.h5, { color: colors.headerTxt }]}>
          Terms and conditions
        </Text> */}
        {/* <FlatList
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
        /> */}
        <Markdown>{privacyPolicy}</Markdown>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyPolicyScreen;
