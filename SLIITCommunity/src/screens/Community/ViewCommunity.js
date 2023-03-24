import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { RichEditor } from 'react-native-pell-rich-editor';
import AppLoader from '../../components/commonComponents/AppLoader';
import ButtonComponent from '../../components/commonComponents/buttonComponent';
import { toastComponent } from '../../components/commonComponents/toastComponent';
import { getDataFromAsync } from '../../constants/asyncStore';
import asyncStoreKeys from '../../constants/asyncStoreKeys';
import { deleteDocument, getDocument } from '../../services/firebaseServices';
import { primaryColors } from '../../styles/colors';
import * as Animatable from 'react-native-animatable';
import { subscribeCommunity, unsubscribeCommunity } from '../../services/notificationServices';

const ViewCommunity = ({ route }) => {
  const [signedInUser, setSignedInUser] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const communities = route.params.communities;
  const itNumber = communities.itNumber;
  const [subscribers, setSubscribers] = useState([]);

  getDataFromAsync(asyncStoreKeys.IT_NUMBER).then(data => {
    setSignedInUser(data);
  });

  useEffect(() => {
    getDocument('communities', communities.id)
      .then(doc => {
        setSubscribers(doc.subscribers ? doc.subscribers : []);
      })
      .catch(err => {
        console.log(err);
      });
  }, [isLoading, signedInUser]);

  const editCommunity = () => {
    navigation.navigate('Update Community', { communities });
  };

  const handleDelete = () => {
    setIsLoading(true);
    deleteDocument('communities', communities.id)
      .then(() => {
        setIsLoading(false);
        toastComponent('Community deleted successfully!', false);
        navigation.navigate('Home', { screen: 'Communities' });
      })
      .catch(err => {
        setIsLoading(false);
        toastComponent('Error deleting community!', true);
      });
  };

  const removeCommunity = () => {
    Alert.alert(
      'Are you sure?',
      'You will not be able to recover this community!',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'Yes', onPress: () => handleDelete() },
      ],
    );
  };

  const subscribe = async () => {
    setIsLoading(true);
    await subscribeCommunity(communities.id, signedInUser);
    setIsLoading(false);
  };

  const unsubscribe = async () => {
    setIsLoading(true);
    await unsubscribeCommunity(communities.id, signedInUser);
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={styles.mainView}>
      {isLoading ? (
        <AppLoader />
      ) : (
        <View style={styles.bodyCard}>
          <Text style={styles.title}>{communities.title.substring(0, 40)}</Text>
          <Text style={styles.faculty}>Faculty of {communities.faculty}</Text>
          <Text style={styles.dateTime}>{communities.created_at}</Text>
          <View
            style={{
              borderBottomWidth: 1,
              borderStyle: 'dashed',
              marginBottom: 10
            }}
          />

          <ScrollView contentContainerStyle={styles.scrollView}
            showsVerticalScrollIndicator={false}>
            <Animatable.View animation="fadeInUp" iterationCount={1} direction="alternate" style={styles.textEditorView}>
              <RichEditor
                initialHeight={150}
                disabled={true}
                initialContentHTML={communities.description}
                editorStyle={styles.textEditor}
                containerStyle={styles.textEditorContainer}
              />
            </Animatable.View>
          </ScrollView>
          <View>
            {signedInUser === itNumber ? (
              <View style={styles.modifyButtons}>
                <ButtonComponent
                  backgroundColor="#242D66"
                  onPress={editCommunity}
                  buttonText="Edit Community"
                />
                <ButtonComponent
                  backgroundColor="#e3463d"
                  onPress={removeCommunity}
                  buttonText="Remove"
                />
              </View>
            ) : (
              <View style={styles.modifyButtons}>
                {subscribers?.includes(signedInUser) ?
                  <ButtonComponent
                    backgroundColor="#e3463d"
                    onPress={unsubscribe}
                    buttonText="Unsubscribe"
                  /> :
                  <ButtonComponent
                    backgroundColor="#242D66"
                    onPress={subscribe}
                    buttonText="Subscribe"
                  />
                }
              </View>
            )}

          </View>
        </View>

      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: primaryColors.background,
    height: '100%',
  },
  bodyCard: {
    backgroundColor: '#fff',
    // borderRadius: 8,
    paddingBottom: 16,
    paddingRight: 16,
    paddingLeft: 16,
    paddingTop: 5,
    width: '100%',
    height: '100%',
  },
  textEditorView: {
    width: '100%',
    borderRadius: 8,
  },
  textEditorContainer: {
    borderRadius: 8,
    justifyContent: 'center',
  },
  textEditor: {
    backgroundColor: '#fff',
  },
  title: {
    width: '100%',
    fontSize: 25,
    fontWeight: 900,
    marginBottom: 0,
    marginTop: 20,
    textAlign: 'center',
    color: primaryColors.primaryBlue,
  },
  faculty: {
    width: '100%',
    fontSize: 16,
    fontWeight: 900,
    textAlign: 'center',
    color: primaryColors.primaryYellow,
  },
  dateTime: {
    width: '100%',
    fontSize: 12,
    marginBottom: 16,
    textAlign: 'center',
    color: '#888',
  },
  modifyButtons: {
    gap: 10,
    marginTop: 16,
  },
});

export default ViewCommunity;
