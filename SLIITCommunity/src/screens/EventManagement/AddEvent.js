import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Alert,
  StatusBar,
  Button,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { AppLayout, SCREEN_HEIGHT } from '../../styles/appStyles';
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import { primaryColors } from '../../styles/colors';
import MyDateTimePicker from '../../components/commonComponents/datepicker';
import TimePicker from '../../components/commonComponents/timepicker';

const AddEvent = () => {
  const richText = useRef();
  const [isFocused, setIsFocused] = useState(false);
  // const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  return (
    <>
      <View style={styles.container}>
        <SafeAreaView style={[AppLayout.flexColumnCentered, styles.mainView]}>
          <Text style={styles.headingStyle}>Create an Event</Text>

          <TextInput
            placeholder={'Enter Event Title'}
            style={styles.title}
          />

          <MyDateTimePicker />

          <TimePicker />

          <TextInput
            placeholder={'Enter Event Venue'}
            style={styles.title}
          />

          <TextInput
            placeholder={'Enter Event Description'}
            style={styles.description}
          />

          <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Simple Button pressed')}>
            <Text style={styles.buttonText}>Create Event</Text>
          </TouchableOpacity>

        </SafeAreaView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    color: primaryColors.primaryBlue,
    fontWeight: 800,
    marginBottom: 50,
  },
  headingStyle: {
    fontSize: 30,
    color: primaryColors.primaryBlue,
    fontWeight: 800,
    marginBottom: 50,
  },
  title: {
    width: 343,
    height: 45,
    paddingLeft: 15,
    marginBottom: 16,
    backgroundColor: '#E8E8E8',
    borderRadius: 8,
    borderColor: 'red',
    color: 'black',
  },
  description: {
    width: 343,
    height: 200,
    paddingLeft: 15,
    marginBottom: 16,
    backgroundColor: '#E8E8E8',
    borderRadius: 8,
    borderColor: 'red',
    color: 'black',
  },
  button: {
    width: 343,
    height: 45,
    paddingLeft: 15,
    marginBottom: 16,
    backgroundColor: '#242D66',
    borderRadius: 8,
    borderColor: 'red',
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
    letterSpacing: 0.6,
  },
});

export default AddEvent;