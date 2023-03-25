import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import AppLoader from '../../components/commonComponents/AppLoader';
import Header from '../../components/commonComponents/header';
import Loading from '../../components/commonComponents/loading';
import LostOrFoundPost from '../../components/lostOrFoundComponents/lostOrFoundPost';
import {getDataFromAsync} from '../../constants/asyncStore';
import asyncStoreKeys from '../../constants/asyncStoreKeys';
import collectionNames from '../../constants/collectionNames';
import {
  getDocumentOrderBy,
  getDocuments,
} from '../../services/firebaseServices';
import {primaryColors} from '../../styles/colors';

const AllLostOrFound = () => {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [id, setid] = useState('');

  const getMyLostOrFound = async () => {
    setLoading(true);
    const itNumber = await getDataFromAsync(asyncStoreKeys.IT_NUMBER);
    setid(itNumber);
    const posts = await getDocumentOrderBy(
      collectionNames.LOST_FOUND_COLLECTION,
      'PostedDate',
      'asc',
    );
    // console.log('THeeeeeeeee', posts);
    setPosts(posts);
    setLoading(false);
  };

  const onRefresh = () => {
    setRefreshing(true);
    getMyLostOrFound();
    setRefreshing(false);
  };

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <View style={allLostOrFoundStyles.container}>
      <Header title="Lost or found" />

      {/* <Text style={allLostOrFoundStyles.headingStyle}>All Lost Or Found</Text> */}
      {loading ? (
        <AppLoader />
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={posts}
          renderItem={({item}) => (
            <LostOrFoundPost
              post={item}
              id={id}
              key={item.id}
              itNumber={item.itNumber}
            />
          )}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

const allLostOrFoundStyles = StyleSheet.create({
  container: {
    height: '100%',
    paddingBottom: 50, // add padding to the bottom of the container
  },
  headingStyle: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 20,
    color: primaryColors.primaryBlue,
    fontWeight: 600,
    marginBottom: 30,
  },
});

export default AllLostOrFound;
