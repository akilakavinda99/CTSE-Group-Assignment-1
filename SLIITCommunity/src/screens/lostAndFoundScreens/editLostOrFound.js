import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import {launchImageLibrary} from 'react-native-image-picker';
import {createTwoButtonAlert} from '../../components/commonComponents/alertComponent';
import ButtonComponent from '../../components/commonComponents/buttonComponent';
import TextInputComponent from '../../components/commonComponents/textInputComponent';
import {toastComponent} from '../../components/commonComponents/toastComponent';
import collectionNames from '../../constants/collectionNames';
import {requiredValidation} from '../../constants/validations';
import {updateDocument} from '../../services/firebaseServices';
import {AppLayout, SCREEN_HEIGHT} from '../../styles/appStyles';
import {primaryColors} from '../../styles/colors';

const EditLostOrFound = ({route}) => {
  const post = route.params.post;
  const [image, setImage] = useState(post.ItemImage);
  const [imageUrl, setImageUrl] = useState(undefined);

  const [name, setName] = useState(post.ItemName);
  const [description, setDescription] = useState(post.ItemDescription);
  const [location, setLocation] = useState(post.ItemLocation);

  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState('');

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
      maxWidth: 500,
      maxHeight: 300,
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
  const data = [
    {key: 'Lost', value: 'Lost'},
    {key: 'Found', value: 'Found'},
  ];
  const handleSubmit = async () => {
    // setIsLoading(true);
    const res = await updateDocument(
      collectionNames.LOST_FOUND_COLLECTION,
      post.id,
      {
        ItemName: name,
        ItemDescription: description,
        ItemImage: image,
        ItemLocation: location,

        dateTime: new Date().toDateString(),
      },
    );
    // console.log(res);

    // setIsLoading(false);
    if (res) {
      toastComponent('Post successfully updated!', false);
      //   navigation.navigate('Home', {screen: 'Notices'});
    } else {
      toastComponent('Error updating !', true);
    }
  };
  return (
    <ScrollView
      style={lostAndFoundStyles.mainView}
      contentContainerStyle={AppLayout.flexColumnCentered}>
      <ScrollView>
        <Text style={lostAndFoundStyles.headingStyle}>Edit Lost or Found</Text>
        <SelectList
          boxStyles={lostAndFoundStyles.boxStyles}
          dropdownItemStyles={{marginHorizontal: 10}}
          dropdownTextStyles={{color: 'black'}}
          setSelected={setSelected}
          placeholder={post.Type}
          maxHeight={100}
          data={data}
          save="value"
        />
        <TextInputComponent
          placeholder="Name of the item"
          onChange={setName}
          validator={requiredValidation}
          marginBottom={16}
          value={name}
        />
        <TextInputComponent
          placeholder="Description of the item"
          onChange={setDescription}
          validator={requiredValidation}
          marginBottom={16}
          value={description}
        />
        <TextInputComponent
          placeholder="Where you found or lost it?"
          onChange={setLocation}
          validator={requiredValidation}
          marginBottom={16}
          value={location}
        />
        <TouchableOpacity
          style={[
            lostAndFoundStyles.imagePicker,
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
              style={lostAndFoundStyles.image}
              resizeMode="cover"
            />
          )}
        </TouchableOpacity>

        <ButtonComponent
          buttonText="Edit"
          onPress={handleSubmit}
          backgroundColor={primaryColors.primaryBlue}
        />
      </ScrollView>
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
    textAlign: 'center',
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

  boxStyles: {
    borderRadius: 8,
    borderColor: '#E8E8E8',
    backgroundColor: '#E8E8E8',
    width: 343,
    height: 45,
    paddingLeft: 15,
    marginBottom: 16,
  },
});

export default EditLostOrFound;
