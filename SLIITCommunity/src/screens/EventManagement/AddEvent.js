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
import { RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import { AppLayout, SCREEN_HEIGHT } from '../../styles/appStyles';
import Toast from 'react-native-toast-message';
import { primaryColors } from '../../styles/colors';
import MyDateTimePicker from '../../components/commonComponents/datepicker';
import TimePicker from '../../components/commonComponents/timepicker';
import Loading from '../../components/commonComponents/loading';
import { addDocument } from '../../services/firebaseServices';
import { toastComponent } from '../../components/commonComponents/toastComponent';

const AddEvent = () => {

  const richText = useRef();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [venue, setVenue] = useState('');
  const [selected, setSelected] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = async () => {
    if (title.trim() === '') {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter a title',
      });
      return;
    }
    if (venue.trim() === '') {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter a venue',
      });
      return;
    }
    if (description.trim() === '') {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter a description',
      });
      return;
    }
    // if (selectedDate === null) {
    //   Toast.show({
    //     type: 'error',
    //     text1: 'Error',
    //     text2: 'Please select a date',
    //   });
    //   return;
    // }
    // if (selectedTime === null) {
    //   Toast.show({
    //     type: 'error',
    //     text1: 'Error',
    //     text2: 'Please select a time',
    //   });
    //   return;
    // }
    const res = addDocument('events', {
      title,
      venue,
      description: description,
      date: selectedDate,
      time: selectedTime,
      created_at: new Date().toDateString(),
    });
    toastComponent('Event Created Successfully', 'success');
  };

  return (
    <SafeAreaView style={{ width: "100%", height: "100%" }}>
      {isLoading ? <Loading /> :
        <View style={styles.container}>
          <SafeAreaView style={[AppLayout.flexColumnCentered, styles.mainView]}>
            <Text style={styles.headingStyle}>Create an Event</Text>

            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder={'Enter Event Title'}
              style={styles.title}
            />

            {/* <MyDateTimePicker
              value={selectedDate}
              onchange={setSelectedDate}
            />

            <TimePicker
              value={selectedTime}
              onchange={setSelectedTime}
            /> */}

            <TextInput
              value={venue}
              onChangeText={setVenue}
              placeholder={'Enter Event Venue'}
              style={styles.title}
            />
            <ScrollView contentContainerStyle={styles.scrollView}>
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ width: '100%' }}>
                <View style={styles.textEditorView}>
                  <RichEditor
                    ref={richText}
                    onChange={setDescription}
                    initialHeight={250}
                    placeholder={'Enter Event Description'}
                    initialContentHTML={''}
                    editorStyle={styles.textEditor}
                    containerStyle={styles.textEditorContainer}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                  />

                </View>
              </KeyboardAvoidingView>

              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Create Event</Text>
              </TouchableOpacity>

            </ScrollView>
            {isFocused && (
              <RichToolbar
                editor={richText}
              // actions={[actions.setBold, actions.setItalic, actions.setUnderline, actions.heading1,]}
              // iconMap={{ [actions.heading1]: ({ tintColor }) => (<Text style={[{ color: tintColor }]}>H1</Text>), }}
              />
            )}

          </SafeAreaView>
          <Toast />
        </View>
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainView: {
    // height: SCREEN_HEIGHT,
    marginLeft: 16,
    marginRight: 16,
    marginTop: SCREEN_HEIGHT / 15,
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
    fontWeight: 900,
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
  textEditorView: {
    width: 343,
    borderRadius: 8,
    marginBottom: 30,
  },
  textEditorContainer: {
    width: '100%',
    borderRadius: 8,
  },
  textEditor: {
    backgroundColor: '#E8E8E8',
  },
  // description: {
  //   width: 343,
  //   height: 200,
  //   paddingLeft: 15,
  //   marginBottom: 16,
  //   backgroundColor: '#E8E8E8',
  //   borderRadius: 8,
  //   borderColor: 'red',
  //   color: 'black',
  // },
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