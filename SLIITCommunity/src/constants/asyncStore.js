import AsyncStorage from '@react-native-async-storage/async-storage';
import { toastComponent } from '../components/commonComponents/toastComponent';

export const storeDataInAsync = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
    toastComponent('Error saving data');
    return false;
    // saving error
  }
};

export const getDataFromAsync = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // console.log('vlll', value);
      return value;
    }
  } catch (e) {
    console.log(e);
    toastComponent('Error getting data');
    return false;
  }
};

export const removeDataFromAsync = async key => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (e) {
    console.log(e);
    toastComponent('Error removing data');
    return false;
  }
}