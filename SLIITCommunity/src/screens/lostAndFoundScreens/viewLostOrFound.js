import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import LostOrFoundPost from '../../components/lostOrFoundComponents/lostOrFoundPost';
import {getDataFromAsync} from '../../constants/asyncStore';
import asyncStoreKeys from '../../constants/asyncStoreKeys';
import collectionNames from '../../constants/collectionNames';
import {
  getDocumentsByField,
  getDocumentsByFieldWithId,
} from '../../services/firebaseServices';
import {primaryColors} from '../../styles/colors';

const ViewLostOrFound = ({navigation}) => {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getMyLostOrFound = async () => {
    const itNumber = await getDataFromAsync(asyncStoreKeys.IT_NUMBER);
    // const posts = await getDocumentsByField(
    //   collectionNames.LOST_FOUND_COLLECTION,
    //   'itNumber',
    //   itNumber,
    // );
    const posts = await getDocumentsByFieldWithId(
      collectionNames.LOST_FOUND_COLLECTION,
      'itNumber',
      itNumber,
    );
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
      <Text style={viewMyLostAndFoundStyles.headingStyle}>Your Items</Text>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={posts}
        renderItem={({item}) => (
          <LostOrFoundPost post={item.data} id={item.id} key={item.id} />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const viewMyLostAndFoundStyles = StyleSheet.create({
  headingStyle: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 20,
    color: primaryColors.primaryBlue,
    fontWeight: 600,
    marginBottom: 30,
  },
});

export default ViewLostOrFound;
