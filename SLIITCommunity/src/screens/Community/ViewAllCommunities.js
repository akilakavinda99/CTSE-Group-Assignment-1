import React, { useEffect, useState } from 'react';
import { View, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, Dimensions, Animated } from "react-native";
import CommunityCard from '../../components/communities/communityCard';
import { getDocumentOrderBy } from '../../services/firebaseServices';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { primaryColors } from '../../styles/colors';
import AppLoader from '../../components/commonComponents/AppLoader';
import NetCheck from '../../components/commonComponents/netCheck';
import SearchBar from "react-native-dynamic-search-bar";
import * as Animatable from 'react-native-animatable';

const ViewAllCommunities = () => {
  const [communities, setCommunities] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showingCommunities, setShowingCommunities] = useState([]);

  const getCommunities = () => {
    getDocumentOrderBy('communities', 'created_at', 'desc')
      .then((res) => {
        setCommunities(res);
        setShowingCommunities(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onSearch = (text) => {
    const filteredCommunities = communities.filter((communities) => {
        return communities.title.toLowerCase().includes(text.toLowerCase()) ||
            communities.faculty.toLowerCase().includes(text.toLowerCase()) ||
            communities.description.toLowerCase().includes(text.toLowerCase());
    });

    setShowingCommunities(filteredCommunities);
}

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
      <NetCheck />
      <Animatable.View animation="pulse" iterationCount={"infinite"} direction="alternate">
            <SearchBar
                placeholder="Search Communities"
                style={{marginTop:10, marginBottom:10}}
                onChangeText={onSearch}
            />
            </Animatable.View>
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
            <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginBottom:80 }}>
              {loading ? <AppLoader /> :
                    showingCommunities.map((community, index) => {
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
            <View style={[styles.emptyView]}>
              <Animatable.Text animation="slideInDown" iterationCount={"infinite"} direction="alternate" style={styles.emptyText}>Oops!</Animatable.Text>
              <Animatable.Text animation="slideInDown" iterationCount={"infinite"} direction="alternate" style={styles.emptyText}>No communities available</Animatable.Text>
              <Animatable.Text animation="slideInDown" iterationCount={"infinite"} direction="alternate">
              <Ionicons
                name="ios-sad-outline"
                size={39}
                color="#58595a"
                style={{ marginTop: 10 }}
              />
              </Animatable.Text>
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    // backgroundColor: "#cae3eb",
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

export default ViewAllCommunities;
