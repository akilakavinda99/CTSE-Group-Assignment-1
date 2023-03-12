import React from 'react';
import {TextInput, Text, View, TouchableOpacity} from 'react-native';
import {primaryColors} from '../../styles/colors';

const TwoText = ({firstText, secondText, onPress}) => {
  const handlePress = () => {
    onPress();
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        marginTop: 10,
      }}>
      <Text
        style={{
          color: primaryColors.primaryYellow,
          fontWeight: 700,
          fontSize: 16,
        }}>
        {firstText}
      </Text>
      <TouchableOpacity onPress={handlePress}>
        <Text
          style={{
            color: primaryColors.primaryBlue,
            fontWeight: 700,
            fontSize: 16,
          }}>
          {secondText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TwoText;
