import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import Toast from 'react-native-toast-message';
import {AppLayout, SCREEN_HEIGHT} from '../../styles/appStyles';
import asyncStoreKeys from '../../constants/asyncStoreKeys';
import {getDataFromAsync} from '../../constants/asyncStore';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {createTwoButtonAlert} from '../../components/commonComponents/alertComponent';
import {imageUploadService} from '../../services/imageUploadService';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {primaryColors} from '../../styles/colors';
import ButtonComponent from '../../components/commonComponents/buttonComponent';
import {SelectList} from 'react-native-dropdown-select-list';
import {addDocument} from '../../services/firebaseServices';
import {toastComponent} from '../../components/commonComponents/toastComponent';
import AppLoader from '../../components/commonComponents/AppLoader';

const NewCommunity = ({navigation}) => {

  const [image, setImage] = useState('');
  const richText = useRef();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [itNumber, setItNumber] = useState();
  const [selected, setSelected] = React.useState('');
  const [isLoading, setIsLoading] = useState(false);

  const gohome = () => {
    navigation.navigate('Home');
  };

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
        text2: 'Community Title can not be empty❗',
      });
      return;
    }
    if (selected.trim() === '') {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Faculty can not be empty❗',
      });
      return;
    }
    if (description.trim() === '') {
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
    const res = await addDocument('communities', {
      title,
      faculty: selected,
      description: description,
      itNumber,
      image: url,
      created_at: new Date().toDateString(),
    });
    setIsLoading(false);
    if (res) {
    toastComponent('Community added successfully!');
    navigation.navigate('Home', {screen: 'Communities'});
  } else {
    toastComponent('Error creating Community!', true);
  }
};

  return (
    <>
      <View style={styles.container}>
        <SafeAreaView style={[AppLayout.flexColumnCentered, styles.mainView]}>
          <Text style={styles.headingStyle}>Create a Community</Text>
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
            setSelected={setSelected}
            placeholder={'Select a Faculty'}
            maxHeight={150}
            data={data}
            save="value"
          />
          <View style={{marginBottom: 20}}></View>
          <ScrollView contentContainerStyle={styles.scrollView}>
            {/* <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{width: '100%'}}> */}
              <View style={styles.textEditorView }>
                <RichEditor
                  ref={richText}
                  onChange={text => {
                    setDescription(text);
                  }}
                  initialHeight={150}
                  placeholder={'Enter Community Description'}
                  initialContentHTML={''}
                  editorStyle={styles.textEditor}
                  containerStyle={styles.textEditorContainer}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
              </View>
            {/* </KeyboardAvoidingView> */}

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


            <View style={{marginBottom: 10}}>
              <ButtonComponent backgroundColor="#242D66" buttonText="Create Community" onPress={handleSubmit} />
            </View>
            <View style={{marginBottom: 10}}> 
              <ButtonComponent backgroundColor="#58595a" buttonText="Cancel" onPress={gohome} />
            </View>
            
          </ScrollView>
        </SafeAreaView>
        <Toast />
      </View>
      {isLoading ? <AppLoader/> : null}
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
    // height: SCREEN_HEIGHT,
    marginLeft: 16,
    marginRight: 16,
    marginTop: SCREEN_HEIGHT / 15,
  },
  headingStyle: {
    fontSize: 30,
    color: primaryColors.primaryBlue,
    fontWeight: 900,
    marginBottom: 50,
  },
  textEditorView: {
    width: 330,
    borderRadius: 8,
  },
  textEditorContainer: {
    width: '100%',
    
    borderRadius: 8,
  },
  textEditor: {
    backgroundColor: '#E8E8E8',
  },
  scrollView: {
    width: '100%',
    marginBottom: 0,
  },
  title: {
    width: 330,
    height: 45,
    paddingLeft: 15,
    marginBottom: 16,
    backgroundColor: '#E8E8E8',
    borderRadius: 8,
    color: 'black',
  },
  imagePicker: {
    height: 175,
    margin:16,
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

export default NewCommunity;
