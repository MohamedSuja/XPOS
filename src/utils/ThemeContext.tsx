import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'USER_THEME';

export type ColorsType = {
  primary: string;
  background: string;
  headerTxt: string;
  subTitle: string;
  stroke: string;
  btnBorder: string;
  inputField: string;
  errorText: string;
  darkGray: string;
  border: string;
  inputTxt: string;
  pwdIcon: string;
  disableHeader: string;
  disableLine: string;
  circleBorder: string;
  dropDownIcon: string;
  greenBG: string;
  uploaderBorder: string;
  placeHolder: string;
  errorBG: string;
  divider: string;
  tabBG: string;
  disableBtnBG: string;
  disableBtnTxt: string;
  toggleBG: string;
  currentStatus: string;
  gold: string;
  orange: string;
  foodDelivery: string;
  orangeBorder: string;
  foodDeliveryBG: string;
  lightGreen: string;
  withdrawBG: string;
  topUpBG: string;
  topUpTxt: string;
  profileBorder: string;
  notificationBG: string;
  notificationBorder: string;
  closeBG: string;
  checkBG: string;
  loadingBackground: string;
};
export type ThemeContextType = {
  isDark: boolean;
  colors: ColorsType;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  colors: {
    primary: '#EB2229',
    background: '#ffffff',
    headerTxt: '#000000',
    subTitle: '#4D4D4D',
    stroke: '#EBEBEB',
    btnBorder: '#EB2228',
    inputField: '#F9F9F9',
    errorText: '#B71C1C',
    darkGray: '#7E7A7A',
    border: '#D6D6D6',
    inputTxt: '#222222',
    pwdIcon: '#5D5D5D',
    disableHeader: '#A9A9A9',
    disableLine: '#E8E8E8',
    circleBorder: '#D4D4D4',
    dropDownIcon: '#7D7D7D',
    greenBG: '#006C20',
    uploaderBorder: '#C7C7C7',
    placeHolder: '#AEAEAE',
    errorBG: '#FFEEEE',
    divider: '#717171',
    tabBG: '#FEE7E7',
    disableBtnBG: '#E5E5E5',
    disableBtnTxt: '#ABABAB',
    toggleBG: '#E3E3E3',
    currentStatus: '#940000',
    gold: '#E9A601',
    orange: '#FFF0F0',
    foodDelivery: '#f56626',
    orangeBorder: '#FFE2E2',
    foodDeliveryBG: '#FFEFE4',
    lightGreen: '#EFFFF0',
    withdrawBG: '#E9FFEF',
    topUpBG: '#E2F2FF',
    topUpTxt: '#0064B4',
    profileBorder: '#EDEDED',
    notificationBG: '#FFF2F2',
    notificationBorder: '#FFCFD1',
    closeBG: '#FFE6E7',
    checkBG: '#E9FFF0',
    loadingBackground: 'rgba(0, 0, 0, 0.2)',
  },
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

const lightColors = {
  primary: '#EB2229',
  background: '#ffffff',
  headerTxt: '#000000',
  subTitle: '#4D4D4D',
  stroke: '#EBEBEB',
  btnBorder: '#EB2228',
  inputField: '#F9F9F9',
  errorText: '#B71C1C',
  darkGray: '#7E7A7A',
  border: '#D6D6D6',
  inputTxt: '#222222',
  pwdIcon: '#5D5D5D',
  disableHeader: '#A9A9A9',
  disableLine: '#E8E8E8',
  circleBorder: '#D4D4D4',
  dropDownIcon: '#7D7D7D',
  greenBG: '#006C20',
  uploaderBorder: '#C7C7C7',
  placeHolder: '#AEAEAE',
  errorBG: '#FFEEEE',
  divider: '#717171',
  tabBG: '#FEE7E7',
  disableBtnBG: '#E5E5E5',
  disableBtnTxt: '#ABABAB',
  toggleBG: '#E3E3E3',
  currentStatus: '#940000',
  gold: '#E9A601',
  orange: '#FFF0F0',
  foodDelivery: '#f56626',
  orangeBorder: '#FFE2E2',
  foodDeliveryBG: '#FFEFE4',
  lightGreen: '#EFFFF0',
  withdrawBG: '#E9FFEF',
  topUpBG: '#E2F2FF',
  topUpTxt: '#0064B4',
  profileBorder: '#EDEDED',
  notificationBG: '#FFF2F2',
  notificationBorder: '#FFCFD1',
  closeBG: '#FFE6E7',
  checkBG: '#E9FFF0',
  loadingBackground: 'rgba(0, 0, 0, 0.2)',
};

const darkColors = {
  primary: '#EB2229',
  background: '#ffffff',
  headerTxt: '#000000',
  subTitle: '#4D4D4D',
  stroke: '#EBEBEB',
  btnBorder: '#EB2228',
  inputField: '#F9F9F9',
  errorText: '#B71C1C',
  darkGray: '#7E7A7A',
  border: '#D6D6D6',
  inputTxt: '#222222',
  pwdIcon: '#5D5D5D',
  disableHeader: '#A9A9A9',
  disableLine: '#E8E8E8',
  circleBorder: '#D4D4D4',
  dropDownIcon: '#7D7D7D',
  greenBG: '#006C20',
  uploaderBorder: '#C7C7C7',
  placeHolder: '#AEAEAE',
  errorBG: '#FFEEEE',
  divider: '#717171',
  tabBG: '#FEE7E7',
  disableBtnBG: '#E5E5E5',
  disableBtnTxt: '#ABABAB',
  toggleBG: '#E3E3E3',
  currentStatus: '#940000',
  gold: '#E9A601',
  orange: '#FFF0F0',
  foodDelivery: '#f56626',
  orangeBorder: '#FFE2E2',
  foodDeliveryBG: '#FFEFE4',
  lightGreen: '#EFFFF0',
  withdrawBG: '#E9FFEF',
  topUpBG: '#E2F2FF',
  topUpTxt: '#0064B4',
  profileBorder: '#EDEDED',
  notificationBG: '#FFF2F2',
  notificationBorder: '#FFCFD1',
  closeBG: '#FFE6E7',
  checkBG: '#E9FFF0',
  loadingBackground: 'rgba(0, 0, 0, 0.2)',
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedTheme !== null) {
          setIsDark(savedTheme === 'dark');
        }
      } catch (e) {
        console.error('Failed to load theme from storage', e);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    try {
      const newTheme = !isDark ? 'dark' : 'light';
      setIsDark(!isDark);
      await AsyncStorage.setItem(STORAGE_KEY, newTheme);
    } catch (e) {
      console.error('Failed to save theme', e);
    }
  };

  const colors = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDark, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
