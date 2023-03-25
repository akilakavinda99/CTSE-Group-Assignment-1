import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {primaryColors} from '../../styles/colors';

const Header = ({title, enableBack}) => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  const goProfile = () => {
    navigation.navigate('Profile');
  };

  return (
    <View
      style={[
        {
          backgroundColor: primaryColors.primaryBlue,
        },
        styles.container,
        enableBack
          ? {justifyContent: 'space-between'}
          : {justifyContent: 'space-between'},
      ]}>
      {enableBack ? (
        <TouchableOpacity onPress={goBack}>
          <Ionicons name="chevron-back-outline" size={30} color="#fff" />
        </TouchableOpacity>
      ) : (
        <View style={{width: 25}} />
      )}
      <Text style={styles.headding}>{title}</Text>
      {/* <View style={{ width: 50 }} /> */}
      <TouchableOpacity onPress={goProfile}>
        <Ionicons name="person-outline" size={25} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    top: 0,
    left: 0,
    right: 0,
    height: 55,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  headding: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '500',
    marginLeft: 15,
    alignSelf: 'center',
  },
});

export default Header;
