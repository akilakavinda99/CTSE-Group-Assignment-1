import React, { useEffect, useState } from 'react';
import { View, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import Loading from '../../components/commonComponents/loading';
import CommunityCard from '../../components/communities/communityCard';
import { getDocumentOrderBy } from '../../services/firebaseServices';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { primaryColors } from '../../styles/colors';

const ViewAllCommunities = () => {
  const [communities, setCommunities] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const getCommunities = () => {
    getDocumentOrderBy('communities', 'created_at', 'desc')
      .then((res) => {
        setCommunities(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onRefresh = () => {
    setRefreshing(true);
    getCommunities();
    setRefreshing(false);
  };

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <SafeAreaView style={styles.mainView}>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          style={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={[
            styles.scrollViewContent,
            !refreshing && communities.length === 0 && {
              justifyContent: 'center',
              alignItems: 'center'
            }
          ]}
        >
          {communities.length > 0 ? (
            communities.map((community, index) => {
              return <CommunityCard key={index} communities={community} />;
            })
          ) : (
            <View style={styles.emptyView}>
              <Text style={styles.emptyText}>Oops!</Text>
              <Text style={styles.emptyText}>No communities available</Text>
              <Ionicons
                name="ios-sad-outline"
                size={39}
                color="#58595a"
                style={{ marginTop: 10 }}
              />
            </View>
          )}
          <View style={{ height: 90 }} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: "#cae3eb",
    height: "100%",
  },
  scrollView: {
    width: "100%",
    paddingHorizontal: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  emptyView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 900,
    color: primaryColors.darkGrey,
    marginTop: 20,
  },
});

export default ViewAllCommunities;
