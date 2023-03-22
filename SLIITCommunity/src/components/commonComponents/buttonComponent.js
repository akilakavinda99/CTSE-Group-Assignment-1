import React from 'react';
import {TextInput, Text, View, TouchableOpacity} from 'react-native';
import {AppLayout} from '../../styles/appStyles';
import {primaryColors} from '../../styles/colors';

const ButtonComponent = ({onPress, buttonText, backgroundColor}) => {
  const handlePress = () => {
    onPress();
  };
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[
        AppLayout.centered,
        {
          width: '100%',
          height: 50,
          borderRadius: 100,
          backgroundColor: backgroundColor,
        },
      ]}>
      <Text
        style={{
          fontSize: 16,
          color: 'white',
          fontWeight: 800
        }}>
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;
