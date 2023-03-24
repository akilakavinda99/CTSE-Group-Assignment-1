import React from 'react';
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
import {getDocuments} from '../../services/firebaseServices';

const AllLostOrFound = () => {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getMyLostOrFound = async () => {
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
          <LostOrFoundPost post={item.data} id={item.id} key={item.id} />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default AllLostOrFound;
