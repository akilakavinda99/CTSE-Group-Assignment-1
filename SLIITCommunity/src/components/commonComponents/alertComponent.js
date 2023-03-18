import {Alert} from 'react-native';

export const createTwoButtonAlert = (
  alertTitle,
  alertMsg,
  firstButtonText,
  secondButtonText,
  firstButtonOnPress,
  secondButtonOnPress,
) => {
  Alert.alert(
    alertTitle,
    alertMsg,
    [
      {
        text: firstButtonText,
        onPress: () => firstButtonOnPress(),
      },
      {text: secondButtonText, onPress: () => secondButtonOnPress()},
    ],
    {
      cancelable: true,
    },
  );
};
