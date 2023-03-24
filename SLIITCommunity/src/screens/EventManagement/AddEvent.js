import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  TextInput,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import { AppLayout, SCREEN_HEIGHT } from '../../styles/appStyles';
import Toast from 'react-native-toast-message';
import asyncStoreKeys from '../../constants/asyncStoreKeys';
import { getDataFromAsync } from '../../constants/asyncStore';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { createTwoButtonAlert } from '../../components/commonComponents/alertComponent';
import { imageUploadService } from '../../services/imageUploadService';
import { primaryColors } from '../../styles/colors';
import MyDateTimePicker from '../../components/commonComponents/datepicker';
import TimePicker from '../../components/commonComponents/timepicker';
import Loading from '../../components/commonComponents/loading';
import { addDocument } from '../../services/firebaseServices';
import { toastComponent } from '../../components/commonComponents/toastComponent';
import ButtonComponent from '../../components/commonComponents/buttonComponent';
import AppLoader from '../../components/commonComponents/AppLoader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AddEvent = () => {

  const richText = useRef();
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [venue, setVenue] = useState('');
  const [itNumber, setItNumber] = useState();
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const launchAlert = () => {
    createTwoButtonAlert(
      'Select Camera or Gallery',
      'Where do you want to select a image?',
      'From Gallery',
      'From Camera',
      fromGallery,
      fromCamera,
    );
  };

  const fromCamera = async () => {
    const options = {
      mediaType: 'photo',
      cameraType: 'back',
      includeBase64: true,
      maxWidth: 1080,
      maxHeight: 960,
      quality: 0.5,
    };
    const result = await launchCamera(options);
    setImage(result.assets[0].uri);
  };

  const fromGallery = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      maxWidth: 1080,
      maxHeight: 960,
      quality: 0.5,
    };
    const result = await launchImageLibrary(options);
    setImage(result.assets[0].uri);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    async function getItnumber() {
      const itNumber = await getDataFromAsync(asyncStoreKeys.IT_NUMBER);
      setItNumber(itNumber);
    }
    getItnumber();
  }, []);

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
    if (image.trim() === '') {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Image can not be empty❗',
      });
      return;
    }
    if (selectedDate === null) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please select a date',
      });
      return;
    }
    // if (selectedTime === null) {
    //   Toast.show({
    //     type: 'error',
    //     text1: 'Error',
    //     text2: 'Please select a time',
    //   });
    //   return;
    // }
      console.log("selectedDate", selectedDate);

    setIsLoading(true);
    const url = await imageUploadService(title, image);
    const res = addDocument('events', {
      title,
      venue,
      description: description,
      date: selectedDate,
      time: selectedTime,
      itNumber,
      image: url,
      created_at: new Date().toDateString(),
    });
    setIsLoading(false);
    if (res) {
      toastComponent('Event added successfully!');
    } else {
      toastComponent('Error creating Community!', true);
    }
  };

  const DateChange = (selectedDate) => {
    console.log("Date", selectedDate);
    setSelectedDate(selectedDate);
  }

  const TimeChange = (selectedTime) => {
    console.log("Time", selectedTime);
    setSelectedTime(selectedTime);
  }

  return (
    <SafeAreaView style={{ width: "100%", height: "100%" }}>
      {isLoading ? <Loading /> :
        <View style={styles.container}>
          <SafeAreaView style={[AppLayout.flexColumnCentered, styles.mainView]}>
            <ScrollView contentContainerStyle={styles.scrollView}>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder={'Enter Event Title'}
              style={styles.title}
            />

            <MyDateTimePicker
              value={selectedDate}
              onchange={DateChange}
            />

            {/* <TimePicker
              value={selectedTime}
              onchange={TimeChange}
            /> */}

            <TextInput
              value={venue}
              onChangeText={setVenue}
              placeholder={'Enter Event Venue'}
              style={styles.title}
            />
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

              <TouchableOpacity
                style={[
                  styles.imagePicker,
                  image == ''
                    ? {
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }
                    : {},
                ]}
                onPress={launchAlert}>
                {image == '' ? <Icon name="image-area" size={50} /> : <></>}
                {image && (
                  <Image
                    key={new Date().getTime()}
                    source={{ uri: image }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                )}
              </TouchableOpacity>

              <View style={{ marginBottom: 10 }}>
                <ButtonComponent backgroundColor="#242D66" buttonText="Create Event" onPress={handleSubmit} />
              </View>

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
    marginTop: SCREEN_HEIGHT / 35,
  },
  header: {
    width: "100%",
    color: primaryColors.primaryBlue,
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
    marginBottom: 10,
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
  imagePicker: {
    height: 175,
    margin: 16,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 30,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
});

export default AddEvent;