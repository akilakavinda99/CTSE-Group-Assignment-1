import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  View,
} from 'react-native';
import {createTwoButtonAlert} from '../../components/commonComponents/alertComponent';
import ButtonComponent from '../../components/commonComponents/buttonComponent';
import {toastComponent} from '../../components/commonComponents/toastComponent';
import collectionNames from '../../constants/collectionNames';
import {deleteDocument} from '../../services/firebaseServices';
import {AppLayout, SCREEN_HEIGHT} from '../../styles/appStyles';

const ViewSingleLostorFOund = ({route, navigation}) => {
  const post = route.params.post;
  const id = route.params.id;

  console.log('THis is the post ', post);
  console.log('This si id ', id);
  const navigateToEdit = () => {
    navigation.navigate('EditLostOrFound', {
      post,
    });
  };

  const launchAlert = () => {
    createTwoButtonAlert(
      'Are you sure you want to delete?',
      '',
      'Yes',
      'No',
      deletePost,
      cancelDelete,
    );
  };

  const deletePost = async () => {
    const res = await deleteDocument(
      collectionNames.LOST_FOUND_COLLECTION,
      post.id,
    );
    if (res) {
      toastComponent('Post deleted Successfully');
    } else {
      toastComponent('Error deleting');
    }
  };

  const cancelDelete = () => {
    console.log('Deleted');
  };
  return (
    <ScrollView>
      <Image
        source={{
          uri: post.ItemImage,
        }}
        resizeMode="cover"
        style={viewSingleLostorFOundStyles.imageStyles}
      />
      <View style={[viewSingleLostorFOundStyles.mainView]}>
        <Text style={viewSingleLostorFOundStyles.title}>{post.ItemName}</Text>
        <View style={viewSingleLostorFOundStyles.secondaryView}>
          <Text style={viewSingleLostorFOundStyles.postedDate}>
            {post.PostedDate}
          </Text>
          <Text style={viewSingleLostorFOundStyles.type}>
            {post.Type.toUpperCase()}
          </Text>
          <ScrollView style={{width: '100%', height: 150, marginTop: 30}}>
            <Text style={viewSingleLostorFOundStyles.description}>
              {post.ItemDescription}
            </Text>
          </ScrollView>
        </View>
        {post.itNumber == id ? (
          <View style={viewSingleLostorFOundStyles.buttonWrapper}>
            <ButtonComponent
              backgroundColor="blue"
              buttonText="Edit"
              onPress={navigateToEdit}
            />

            <ButtonComponent
              backgroundColor="red"
              buttonText="Delete"
              onPress={launchAlert}
            />
          </View>
        ) : (
          <></>
        )}
      </View>
    </ScrollView>
  );
};

const viewSingleLostorFOundStyles = StyleSheet.create({
  imageStyles: {
    width: '100%',
    height: SCREEN_HEIGHT / 3,
    marginBottom: 10,
  },
  mainView: {
    // paddingRight: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    // paddingLeft: 18,
  },
  postedDate: {
    // paddingLeft: 20,
    // marginRight: 10,
  },
  secondaryView: {
    alignItems: 'center',
  },
  type: {
    // marginLeft: 25,
  },
  description: {
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,

    textAlign: 'center',
  },
  buttonWrapper: {
    marginTop: SCREEN_HEIGHT / 10,
    marginLeft: 20,
    marginRight: 20,
    // marginBottom: SCREEN_HEIGHT / 10,
  },
});

export default ViewSingleLostorFOund;
