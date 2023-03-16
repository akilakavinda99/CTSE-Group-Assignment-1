import React, { useState } from 'react';
import { View, Text, Platform, Button, TextInput, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import TextInputComponent from './textInputComponent';
import Icon from 'react-native-vector-icons/FontAwesome';

const MyDateTimePicker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateChange = (event, date) => {
    if (Platform.OS === 'android') {
      hideDatePicker();
    }
    setSelectedDate(date || selectedDate);
  };

  return (
    <View>
      <View style={styles.container}>
      <TextInputComponent
        rightIcon="calendar"
        placeholder="Select Date"
        marginBottom={20}
        value={selectedDate.toLocaleDateString()}
        >
        </TextInputComponent>
        <Icon style={styles.icon} name="calendar" size={20} color="#000" onPress={showDatePicker} />
        </View>

      {isDatePickerVisible && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  icon: {
    position: 'absolute',
    right: 10,
    marginRight: 10,
    top: 15,
    alignItems: 'center',
    color: '#242D66',
  },
});

export default MyDateTimePicker;
