import {StyleSheet, Dimensions} from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

export const AppLayout = {
  flexColumnCentered: {
    flex: 1,
    alignItems: 'center',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  flexRowBetween: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
};
