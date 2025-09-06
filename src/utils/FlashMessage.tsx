import { showMessage } from 'react-native-flash-message';
import { StyleSheet, Vibration } from 'react-native';

const duration = 3500;

export const ErrorFlash = (description: string) => {
  showMessage({
    textStyle: styles.textStyle,
    titleStyle: styles.titleStyle,
    message: description,
    type: 'default',
    backgroundColor: '#FF4D4F', // suitable error color (red)
    color: '#FFFFFF', // white text
    duration: duration,
  });
};

export const SuccessFlash = (description: string) => {
  showMessage({
    textStyle: styles.textStyle,
    titleStyle: styles.titleStyle,
    message: description,
    type: 'default',
    backgroundColor: '#52C41A', // suitable success color (green)
    color: '#FFFFFF', // white text
    duration: duration,
  });
};

export const WarningFlash = (description: string) => {
  showMessage({
    textStyle: styles.textStyle,
    titleStyle: styles.titleStyle,
    message: description,
    type: 'default',
    backgroundColor: '#FAAD14', // suitable warning color (amber/yellow)
    color: '#FFFFFF', // white text
    duration: duration,
  });
};

const styles = StyleSheet.create({
  textStyle: { paddingLeft: 10 },
  titleStyle: { paddingLeft: 10 },
});
