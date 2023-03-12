import {ToastAndroid, Alert, Platform} from 'react-native';

export const toastComponent = (message, isError) => {
  if (Platform.OS === 'android') {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
    );
  } else {
    toast.show(message, {
      type: isError ? 'danger' : 'success',
      placement: 'top',
      duration: 2000,
      offset: 50,
      animationType: 'zoom-in',
    });
  }
};
