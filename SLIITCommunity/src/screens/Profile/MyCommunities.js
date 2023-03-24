import React, { useEffect, useState } from 'react';
import { View, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, Dimensions } from "react-native";
import Loading from '../../components/commonComponents/loading';
import CommunityCard from '../../components/communities/communityCard';
import {  getDocumentsByFieldWithId } from '../../services/firebaseServices';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { primaryColors } from '../../styles/colors';
import AppLoader from '../../components/commonComponents/AppLoader';

const MyCommunities = () => {
  const [communities, setCommunities] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const getCommunities = () => {
    getDocumentsByFieldWithId('communities', 'itNumber', 'IT20206284')
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

  const windowWidth = Dimensions.get('window').width;

  return (
    <SafeAreaView style={styles.mainView}>
      {loading ? (
        <AppLoader />
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
            <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
              {communities.map((community, index) => {
                return (
                  <CommunityCard
                    key={index}
                    communities={community}
                    style={{ width: windowWidth / 2 }}
                  />
                );
              })}
            </View>
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
    marginTop: 5,
  },
});

export default MyCommunities;
