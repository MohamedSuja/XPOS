import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  Linking,
  Pressable,
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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '@/components/Buttons/BackButton';

const SupportCenterScreen = ({ navigation }: any) => {
  const { colors }: ThemeContextType = useTheme();
  const styles = createStyles(colors);

  const handleRedirectCall = () => {
    try {
      Linking.openURL(`tel:+94242221484`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendEmail = () => {
    const email = 'xeatadmin@gmail.com';
    Linking.openURL(`mailto:${email}`);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.background}
        animated={true}
        translucent={false}
      />

      <View style={[styles.headerContainer]}>
        <View style={styles.headerContent}>
          <BackButton style={[styles.backBtn]} />
          <Text style={[globalStyles.h5, styles.headerTxt]}>
            Support Center
          </Text>
        </View>
      </View>

      <View style={{ alignItems: 'center' }}>
        <Image
          source={require('../../../assets/icons/ICSupportCenter.png')}
          style={styles.img}
        />
        <Text
          style={[
            globalStyles.h2,
            { color: colors.headerTxt, marginBottom: hp('1%') },
          ]}
        >
          Hello, How can we help you?
        </Text>
      </View>
      <View style={styles.box}>
        <View>
          <Text style={[globalStyles.h9, { color: colors.inputTxt }]}>
            Contact Us
          </Text>
          <Text
            style={[
              globalStyles.h5,
              { color: colors.inputTxt, marginTop: hp('0.5%') },
            ]}
          >
            024 222 1484
          </Text>
        </View>
        <Pressable style={styles.iconBG} onPress={handleRedirectCall}>
          <MaterialIcons
            name="local-phone"
            size={RFValue(18)}
            color={colors.primary}
          />
        </Pressable>
      </View>

      <View style={styles.box}>
        <View>
          <Text style={[globalStyles.h9, { color: colors.inputTxt }]}>
            Email Address
          </Text>
          <Text
            style={[
              globalStyles.h5,
              { color: colors.inputTxt, marginTop: hp('0.5%') },
            ]}
          >
            xeatadmin@gmail.com
          </Text>
        </View>
        <Pressable style={styles.iconBG} onPress={handleSendEmail}>
          <Entypo name="mail" size={RFValue(16)} color={colors.primary} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default SupportCenterScreen;
