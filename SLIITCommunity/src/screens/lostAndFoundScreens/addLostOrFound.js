import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import ButtonComponent from '../../components/commonComponents/buttonComponent';
import TextInputComponent from '../../components/commonComponents/textInputComponent';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {createTwoButtonAlert} from '../../components/commonComponents/alertComponent';
import {requiredValidation} from '../../constants/validations';
import {AppLayout} from '../../styles/appStyles';
import {primaryColors} from '../../styles/colors';
import {SCREEN_HEIGHT} from '../../styles/appStyles';
import {addDocument} from '../../services/firebaseServices';
import {imageUploadService} from '../../services/imageUploadService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getDataFromAsync} from '../../constants/asyncStore';
import collectionNames from '../../constants/collectionNames';
import asyncStoreKeys from '../../constants/asyncStoreKeys';

const AddLostOrFound = () => {
  const [image, setImage] = useState(undefined);
  const [imageUrl, setImageUrl] = useState(undefined);

  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [location, setLocation] = useState();
  const [base64, setB64] = useState();
  const [base64Img, setB64Image] = useState();
  const [itNumber, setItNumber] = useState();

  useEffect(() => {
    async function getItnumber() {
      const itNumber = await getDataFromAsync(asyncStoreKeys.IT_NUMBER);
      setItNumber(itNumber);
    }
    getItnumber();
    // console.log('THis is it number', itNumber);
  }, []);

  const launchAlert = () => {
    createTwoButtonAlert(
      'Select Camera or Gallery',
      'Where do you want to select a image',
      'From Gallery',
      'From Camera',
      fromCamera,
      fromGallery,
    );
    // setModalVisible(true);
  };

  const fromCamera = async () => {
    const options = {
      mediaType: 'photo',
      cameraType: 'back',
      includeBase64: true,
    };
    const result = await launchCamera(options);
    // setImage(`data:image/png;base64,${result.assets[0].base64}`);
    setImage(result.assets[0].uri);
    console.log(result.assets[0].uri);

    // setB64(result.assets[0].base64);
    // console.log('Image:  ', result.assets[0].base64);
  };

  const fromGallery = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
    };
    const result = await launchImageLibrary(options);
    console.log(result);
  };

  const itemName = value => {
    setName(value);
    console.log(value);
  };

  const itemDescription = value => {
    setDescription(value);
  };

  const itemLocation = value => {
    setLocation(value);
  };

  const addLostOrFound = async () => {
    // let ImageNAme = name;

    const url = await imageUploadService(name, image);

    console.log(url);

    const data = {
      ItemName: name,
      ItemDescription: description,
      ItemLocation: location,
      ItemImage: url,
      itNumber,
      PostedDate: new Date().toDateString(),
      // userITNumber:
    };

    const result = addDocument(collectionNames.LOST_FOUND_COLLECTION, data);
  };

  return (
    <ScrollView
      style={lostAndFoundStyles.mainView}
      contentContainerStyle={AppLayout.flexColumnCentered}>
      <Text style={lostAndFoundStyles.headingStyle}>Add Lost Or Found</Text>
      <TextInputComponent
        placeholder="Name of the item"
        onChange={itemName}
        validator={requiredValidation}
        marginBottom={16}
      />
      <TextInputComponent
        placeholder="Description of the item"
        onChange={itemDescription}
        validator={requiredValidation}
        marginBottom={16}
      />
      <TextInputComponent
        placeholder="Where you found or lost it?"
        onChange={itemLocation}
        validator={requiredValidation}
        marginBottom={16}
      />
      {/* <TouchableOpacity
        style={lostAndFoundStyles.imagePicker}
        onPress={launchAlert}>
        {image && (
          <Image
            key={new Date().getTime()}
            source={{uri: image}}
            style={lostAndFoundStyles.image}
            resizeMode="cover"
          />
        )}
      </TouchableOpacity> */}

      <TouchableOpacity
        style={lostAndFoundStyles.imagePicker}
        onPress={launchAlert}>
        {image && (
          <Image
            key={new Date().getTime()}
            source={{uri: imageUrl}}
            style={lostAndFoundStyles.image}
            resizeMode="cover"
          />
        )}
      </TouchableOpacity>
      <ButtonComponent buttonText="Submit" onPress={addLostOrFound} />
    </ScrollView>
  );
};

const lostAndFoundStyles = StyleSheet.create({
  mainView: {
    marginTop: SCREEN_HEIGHT / 16,
    height: SCREEN_HEIGHT,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: SCREEN_HEIGHT / 16,
  },
  headingStyle: {
    fontSize: 30,
    color: primaryColors.primaryBlue,
    fontWeight: 600,
    marginBottom: 30,
  },

  imagePicker: {
    width: '100%',
    height: 200,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 30,
    marginBottom: 16,
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
export default AddLostOrFound;
