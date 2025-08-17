import {
  View,
  Text,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useRef, useEffect, useState } from 'react';
import { ThemeContextType, useTheme } from '@/utils/ThemeContext';
import { createStyles } from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppStackScreenProps } from '@/navigation/NavigationModels/MenuStack';
import BackButton from '@/components/Buttons/BackButton';
import { globalStyles } from '@/utils/globalStyles';
import { hp } from '@/utils/Scaling';
import EditIcon from '@/assets/icons/fe_edit.svg';
import MapMarkerIcon from '@/assets/icons/MapMarker.svg';
import ToggleButton from '@/components/Buttons/ToggleButton';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import EditProfileIcon from '@/assets/icons/EditProfile.svg';
import ChangePasswordIcon from '@/assets/icons/ChangePassword.svg';
import DriverIcon from '@/assets/icons/Driver.svg';
import SupportIcon from '@/assets/icons/Support.svg';
import PrivacyIcon from '@/assets/icons/Privacy.svg';
import Right from '@/assets/icons/Right.svg';

const ProfileScreen = ({
  navigation,
}: AppStackScreenProps<'CategoryViewScreen'>) => {
  const { colors }: ThemeContextType = useTheme();
  const styles = createStyles(colors);

  const insets = useSafeAreaInsets();
  const [profileImage, setProfileImage] = useState('');

  return (
    <View style={[styles.root]}>
      <View style={[styles.headerContainer, { paddingTop: hp(2.5) }]}>
        <View style={styles.headerContent}>
          <BackButton style={[styles.backBtn]} />
          <Text style={[globalStyles.h4, styles.headerTxt]}>Profile</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileContainer}>
          <View style={styles.profileHeader}>
            <View style={styles.profileImageContainer}>
              <Image
                source={{ uri: profileImage }}
                style={styles.profileImage}
              />
              <TouchableOpacity style={styles.editIcon}>
                <EditIcon width={hp(2)} height={hp(2)} />
              </TouchableOpacity>
            </View>

            <Text style={[globalStyles.h4, styles.profileName]}>
              The Valampuri
            </Text>
            <View style={styles.locationContainer}>
              <MapMarkerIcon width={hp(2)} height={hp(2)} />
              <Text style={[globalStyles.h8, styles.locationText]}>
                No. 123, KKS Road, Kopay, Jaffna
              </Text>
            </View>
            <ToggleButton
              leftLabel="Closed"
              rightLabel="Open"
              onToggle={() => {}}
              initialValue={true}
              isLoading={false}
            />
          </View>

          <View style={styles.profileButtonContainer}>
            <TouchableOpacity style={styles.profileButton}>
              <View style={styles.profileButtonContent}>
                <EditProfileIcon width={hp(3)} height={hp(3)} />
                <Text style={[globalStyles.h7, styles.profileButtonText]}>
                  Edit Profile
                </Text>
              </View>
              <Right width={hp(2)} height={hp(2)} />
            </TouchableOpacity>

            <View style={styles.profileButtonSeparator} />

            <TouchableOpacity style={styles.profileButton}>
              <View style={styles.profileButtonContent}>
                <ChangePasswordIcon width={hp(3)} height={hp(3)} />
                <Text style={[globalStyles.h7, styles.profileButtonText]}>
                  Change Password
                </Text>
              </View>
              <Right width={hp(2)} height={hp(2)} />
            </TouchableOpacity>

            <View style={styles.profileButtonSeparator} />

            <TouchableOpacity style={styles.profileButton}>
              <View style={styles.profileButtonContent}>
                <DriverIcon width={hp(3)} height={hp(3)} />
                <Text style={[globalStyles.h7, styles.profileButtonText]}>
                  Driver Request
                </Text>
              </View>
              <Right width={hp(2)} height={hp(2)} />
            </TouchableOpacity>

            <View style={styles.profileButtonSeparator} />

            <TouchableOpacity style={styles.profileButton}>
              <View style={styles.profileButtonContent}>
                <SupportIcon width={hp(3)} height={hp(3)} />
                <Text style={[globalStyles.h7, styles.profileButtonText]}>
                  Support Center
                </Text>
              </View>
              <Right width={hp(2)} height={hp(2)} />
            </TouchableOpacity>

            <View style={styles.profileButtonSeparator} />

            <TouchableOpacity style={styles.profileButton}>
              <View style={styles.profileButtonContent}>
                <PrivacyIcon width={hp(3)} height={hp(3)} />
                <Text style={[globalStyles.h7, styles.profileButtonText]}>
                  Privacy Policy
                </Text>
              </View>
              <Right width={hp(2)} height={hp(2)} />
            </TouchableOpacity>
          </View>
        </View>

        <PrimaryButton
          style={styles.logoutButton}
          title="Log Out"
          onPress={() => {}}
        />
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
const categoryData = [
  {
    id: 1,
    name: 'Pizza',
    image:
      'https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg',
  },
  {
    id: 2,
    name: 'Burger',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5k7T60odhyrtndKnNo0Ef-GmdAQTIdl22jg&s',
  },
  {
    id: 3,
    name: 'Salad',
    image:
      'https://img.freepik.com/free-photo/top-view-fast-food-mix-mozzarella-sticks-club-sandwich-hamburger-mushroom-pizza-caesar-shrimp-salad-french-fries-ketchup-mayo-cheese-sauces-table_141793-3998.jpg?semt=ais_hybrid&w=740',
  },
  {
    id: 4,
    name: 'Dessert',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8_kCgEQn9yIXh1QSwPJcN6QYJVceekyMXxQ&s',
  },
  {
    id: 5,
    name: 'Drink',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRoJ0RCxNrOLvYxHj8NSYEOBKgNLef73dF9A&s',
  },
  {
    id: 6,
    name: 'Soup',
    image:
      'https://bakewithshivesh.com/wp-content/uploads/2018/05/RASPBERRY-APPLE-CRISP.jpg',
  },
  {
    id: 7,
    name: 'Pasta',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjrvUCM4F6qU2P-gskxXTMQjn9jPhRPT5BZQ&s',
  },
  {
    id: 8,
    name: 'Fish',
    image:
      'https://i0.wp.com/digital-photography-school.com/wp-content/uploads/2019/10/MG_3869.jpg?fit=1500%2C1011&ssl=1',
  },
  {
    id: 9,
    name: 'Chicken',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3WF7SFm5a1kterAAcz-4ZxNDw6oglgIJHKA&s',
  },
  {
    id: 10,
    name: 'Beef',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjRHIfneW-xeaNFH91s9iLCN0w5fww9NPfEQ&s',
  },
  {
    id: 11,
    name: 'Vegetarian',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7Ovgxx5xzyfkobvR99fY1YWgoqso0zr_hdg&s',
  },
  {
    id: 12,
    name: 'Vegan',
    image:
      'https://clicklovegrow.com/wp-content/uploads/2020/03/Naomi-Sherman-Advanced-Graduate4.jpg',
  },
];

const itemData = [
  {
    id: 1,
    title: 'Chicken Rice & Curry',
    image:
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg',
    available: true,
  },
  {
    id: 2,
    title: 'Chicken Rice & Curry',
    image:
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg',
    available: true,
  },
  {
    id: 3,
    title: 'Chicken Rice & Curry',
    image:
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg',
    available: false,
  },
  {
    id: 4,
    title: 'Chicken Rice & Curry',
    image:
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg',
    available: true,
  },
  {
    id: 5,
    title: 'Chicken Rice & Curry',
    image:
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg',
    available: false,
  },
  {
    id: 6,
    title: 'Chicken Rice & Curry',
    image:
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg',
    available: false,
  },
  {
    id: 7,
    title: 'Chicken Rice & Curry',
    image:
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg',
    available: false,
  },
  {
    id: 8,
    title: 'Chicken Rice & Curry',
    image:
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg',
    available: true,
  },
  {
    id: 9,
    title: 'Chicken Rice & Curry',
    image:
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg',
    available: false,
  },
  {
    id: 10,
    title: 'Chicken Rice & Curry',
    image:
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg',
    available: true,
  },
  {
    id: 11,
    title: 'Chicken Rice & Curry',
    image:
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg',
    available: true,
  },
  {
    id: 12,
    title: 'Chicken Rice & Curry',
    image:
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg',
    available: false,
  },
  {
    id: 13,
    title: 'Chicken Rice & Curry',
    image:
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg',
    available: false,
  },
];
