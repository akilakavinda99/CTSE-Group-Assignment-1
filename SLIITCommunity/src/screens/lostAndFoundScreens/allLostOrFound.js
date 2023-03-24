import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import LostOrFoundPost from '../../components/lostOrFoundComponents/lostOrFoundPost';
import {getDataFromAsync} from '../../constants/asyncStore';
import asyncStoreKeys from '../../constants/asyncStoreKeys';
import collectionNames from '../../constants/collectionNames';
import {getDocuments} from '../../services/firebaseServices';

const AllLostOrFound = () => {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [id, setid] = useState('');

  const getMyLostOrFound = async () => {
    const itNumber = await getDataFromAsync(asyncStoreKeys.IT_NUMBER);
    setid(itNumber);
    const posts = await getDocuments(collectionNames.LOST_FOUND_COLLECTION);
    console.log(posts);
    setPosts(posts);
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
    <View>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={posts}
        renderItem={({item}) => (
          <LostOrFoundPost post={item} id={id} key={item.id} />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default AllLostOrFound;
