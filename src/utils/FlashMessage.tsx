import { showMessage } from "react-native-flash-message";
import { StyleSheet, Vibration } from "react-native";
import C, { Colors } from "./Colors";

const duration = 3500;

export const ErrorFlash = (description: string) => {
  showMessage({
    textStyle: styles.textStyle,
    titleStyle: styles.titleStyle,
    message: description,
    type: "default",
    backgroundColor: Colors.brand["error"], // background color
    color: Colors.brand["white"],
    duration: duration,
  });
  Vibration.vibrate();
};

export const SuccessFlash = (description: string) => {
  showMessage({
    textStyle: styles.textStyle,
    titleStyle: styles.titleStyle,
    message: description,
    type: "default",
    backgroundColor: Colors.brand["success"], // background color
    color: Colors.brand["white"],
    duration: duration,
  });
};

export const WarningFlash = (description: string) => {
  showMessage({
    textStyle: styles.textStyle,
    titleStyle: styles.titleStyle,
    message: description,
    type: "default",
    backgroundColor: Colors.brand["warning"], // background color
    color: Colors.brand["white"],
    duration: duration,
  });
};

const styles = StyleSheet.create({
  textStyle: { paddingLeft: 10 },
  titleStyle: { paddingLeft: 10 },
});
