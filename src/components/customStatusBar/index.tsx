import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';
import {StatusBar} from 'react-native';

export const CustomStatusBar = ({
  backgroundColor,
  barStyle = 'light-content',
  translucent = true,
}: {
  backgroundColor: string;
  barStyle: 'light-content' | 'dark-content';
  translucent: boolean;
}) => {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle(barStyle);
      StatusBar.setBackgroundColor(backgroundColor);
      StatusBar.setTranslucent(translucent);
    }, [backgroundColor, barStyle]),
  );

  return null; // No UI, just effect
};
