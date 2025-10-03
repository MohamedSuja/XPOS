import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';
import { createStyles } from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import { globalStyles } from '../../../utils/globalStyles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomStatusBar } from '../../../components/customStatusBar';
import { ErrorFlash } from '@/utils/FlashMessage';
import { requests } from '@/feature/services/api';
import BackButton from '@/components/Buttons/BackButton';

const BankDetailsScreen = ({ navigation }: any) => {
  const { colors }: ThemeContextType = useTheme();
  const styles = createStyles(colors);
  const [bankDetails, setBankDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const getBankDetails = () => {
    try {
      requests
        .get('/api/pos/wallet/primary-payout-account')
        .then(res => {
          setBankDetails(res.data?.data?.primary_account);
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
      setLoading(false);
    }
  };

  useEffect(() => {
    getBankDetails();
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
      <CustomStatusBar
        backgroundColor={colors.background}
        barStyle="dark-content"
        translucent={false}
      />
      {/* Header */}

      <View style={[styles.headerContainer]}>
        <View style={styles.headerContent}>
          <BackButton style={[styles.backBtn]} />
          <Text style={[globalStyles.h5, styles.headerTxt]}>
            Bank Account details
          </Text>
        </View>
      </View>

      <View
        style={{
          backgroundColor: colors.inputField,
          flex: 1,
        }}
      >
        <View style={styles.box}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={[
                globalStyles.h5,
                { fontSize: RFValue(16), color: colors.headerTxt },
              ]}
            >
              {bankDetails?.account_holder_name}
            </Text>
          </View>
          <Text style={[globalStyles.h5, { color: colors.primary }]}>
            {bankDetails?.account_number}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: wp('2%'),
              marginTop: hp('2%'),
            }}
          >
            <FontAwesome
              name="bank"
              size={RFValue(16)}
              color={colors.inputTxt}
            />
            <Text style={[globalStyles.h8, { color: colors.inputTxt }]}>
              {bankDetails?.bank?.name}
            </Text>
          </View>
          <Text
            style={[
              globalStyles.h9,
              { color: colors.subTitle, paddingTop: hp('1%') },
            ]}
          >
            {bankDetails?.bank_branch}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BankDetailsScreen;
