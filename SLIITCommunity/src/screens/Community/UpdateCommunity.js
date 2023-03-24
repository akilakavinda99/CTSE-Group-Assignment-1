import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import ButtonComponent from '../../components/commonComponents/buttonComponent';
import {toastComponent} from '../../components/commonComponents/toastComponent';
import Toast from 'react-native-toast-message';
import {getDateAndTime} from '../../services/commonFunctions';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {createTwoButtonAlert} from '../../components/commonComponents/alertComponent';
import {imageUploadService} from '../../services/imageUploadService';
import {SelectList} from 'react-native-dropdown-select-list';
import {updateDocument} from '../../services/firebaseServices';
import {primaryColors} from '../../styles/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppLoader from '../../components/commonComponents/AppLoader';

const UpdateCommunity = ({route, navigation}) => {
  const communities = route.params.communities;
  const [image, setImage] = useState(communities.image);
  const richText = useRef();
  const [title, setTitle] = useState(communities.title);
  const [newDescription, setNewDescription] = useState(communities.description);
  const [faculty, setFaculty] = React.useState(communities.faculty);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const data = [
    {key: '1', value: 'All'},
    {key: '2', value: 'Computing'},
    {key: '3', value: 'Engineering'},
    {key: '4', value: 'Business School'},
    {key: '5', value: 'Humanaties & Sciences'},
    {key: '6', value: 'School of Architecture'},
    {key: '7', value: 'School of Law'},
    {key: '8', value: 'School of Hospitality & Culinary'},
    {key: '9', value: 'Graduate Studies & Researches'},
  ];

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

  const handleSubmit = async () => {
    if (title.trim() === '') {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Community Title can not be empty❗',
      });
      return;
    }
    if (faculty.trim() === '') {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Faculty can not be empty❗',
      });
      return;
    }
    if (newDescription.trim() === '') {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Description can not be empty❗',
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

    setIsLoading(true);
    const url = await imageUploadService(title, image);
    const res = await updateDocument('communities', communities.id, {
      title,
      faculty: faculty,
      // image: url,
      description: newDescription,
      created_at: getDateAndTime(),
    });
    setIsLoading(false);
    if (res) {
      toastComponent('Community updated successfully!', false);
      navigation.navigate('Home', {screen: 'Communities'});
    } else {
      toastComponent('Error updating Community!', true);
    }
  };

  return (
    <>
    <SafeAreaView style={{width: '100%', height: '100%'}}>
      <View style={styles.mainView}>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder={'Enter Community Title'}
            style={styles.title}
          />

          <SelectList
            boxStyles={{
              borderRadius: 8,
              borderColor: '#E8E8E8',
              backgroundColor: '#E8E8E8',
              width: 330,
              height: 45,
              paddingLeft: 15,
            }}
            dropdownItemStyles={{marginHorizontal: 10}}
            dropdownTextStyles={{color: 'black'}}
            setSelected={setFaculty}
            maxHeight={150}
            placeholder={faculty}
            data={data}
            save="value"
            value={faculty}
          />

          <View style={{marginBottom: 20}}></View>
          <ScrollView contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}>
            {/* <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{width: '100%'}}> */}
            <View style={styles.textEditorView}>
              <RichEditor
                ref={richText}
                onChange={text => {
                  setNewDescription(text);
                }}
                initialHeight={150}
                placeholder={'Enter Community Description'}
                initialContentHTML={newDescription}
                editorStyle={styles.textEditor}
                containerStyle={styles.textEditorContainer}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
            </View>

            {isFocused && (
              <RichToolbar style={{height: 30}} editor={richText} />
            )}
            {!isFocused && <View style={{height: 0}} />}

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
                  source={{uri: image}}
                  style={styles.image}
                  resizeMode="cover"

                />
              )}
            </TouchableOpacity>

            

            {/* </KeyboardAvoidingView> */}
          </ScrollView>
          <View style={{marginTop: 20}}>
              <ButtonComponent
                backgroundColor="#ffad00"
                buttonText="Update Community"
                onPress={handleSubmit}
              />
            </View>
        </View>
      <Toast />
      {isLoading ? <AppLoader/> : null}
    </SafeAreaView>
    
   </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainView: {
    paddingHorizontal: 10,
    paddingTop: 30,
    paddingBottom: 20,
    height: '100%',
  },
  headingStyle: {
    fontSize: 30,
    color: primaryColors.primaryBlue,
    fontWeight: 900,
    marginTop: 36,
    marginBottom: 50,
    textAlign: 'center',
  },
  textEditorView: {
    width: '100%',
    borderRadius: 8,
  },
  textEditorContainer: {
    borderRadius: 8,
    height: 20,
  },
  textEditor: {
    backgroundColor: '#E8E8E8',
  },
  title: {
    width: 330,
    height: 45,
    paddingLeft: 15,
    marginBottom: 16,
    backgroundColor: '#E8E8E8',
    borderRadius: 8,
    borderColor: 'red',
    color: 'black',
  },
  scrollView: {
    width: '100%',
    marginBottom: 0,
  },
  imagePicker: {
    height: 225,
    marginBottom: 20,
    marginTop: 20,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 30,
  },
  modelView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 500,
    backgroundColor: 'grey',
  },
  modelStyles: {
    width: 100,
    height: 500,
    alignItems: 'center',
    backgroundColor: 'grey',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
});

export default UpdateCommunity;
