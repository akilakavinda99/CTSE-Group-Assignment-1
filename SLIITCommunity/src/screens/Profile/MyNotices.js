import React, { useEffect, useState } from 'react';
import SearchBar from "react-native-dynamic-search-bar";
import { View, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import Loading from '../../components/commonComponents/AppLoader';
import NoticeCard from '../../components/notices/noticeCard';
import { getDocumentsByFieldWithId } from '../../services/firebaseServices';
import { primaryColors } from '../../styles/colors';
import NetCheck from '../../components/commonComponents/netCheck';
import HorizontalLine from '../../components/commonComponents/horizontalLine';
import * as Animatable from 'react-native-animatable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getDataFromAsync } from '../../constants/asyncStore';
import asyncStoreKeys from '../../constants/asyncStoreKeys';

const MyNotices = () => {
    const [notices, setNotices] = useState([]);
    const [showingNotices, setShowingNotices] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [searchText, setSearchText] = useState("");

    const getNotices = async () => {
        setRefreshing(true);
        getDataFromAsync(asyncStoreKeys.IT_NUMBER)
            .then((res) => {
                getDocumentsByFieldWithId('notices', 'owner', res)
                    .then((res) => {
                        setNotices(res);
                        setShowingNotices(res);
                        // console.log(res);
                        setRefreshing(false);
                    })
                    .catch((err) => {
                        console.log(err);
                        setRefreshing(false);
                    });
            })

    }

    const onSearch = (text) => {
        setSearchText(text);
        const filteredNotices = notices.filter((notice) => {
            // fileter by subject and community
            return notice.subject.toLowerCase().includes(text.toLowerCase()) ||
                notice.community.toLowerCase().includes(text.toLowerCase());
        });

        setShowingNotices(filteredNotices);
    }


    useEffect(() => {
        getNotices();
    }, []);

    return (
        <SafeAreaView style={styles.mainView}>
            <NetCheck />
            {refreshing ? <Loading /> :
                <>
                    <SearchBar
                        placeholder="Search here"
                        // onPress={() => alert("onPress")}
                        onChangeText={onSearch}
                        clearIconComponent={searchText == "" ? <View /> : <Text>Clear</Text>}
                        onClearPress={() => onSearch("")}
                        placeholderTextColor={"#8e8e8e"}
                    />
                    {showingNotices.length == 0 ?
                        <View style={[styles.scrollView, {
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                        }]}>
                            <Animatable.Text animation="slideInDown" iterationCount={1} direction="alternate" style={styles.emptyText}>Oops!</Animatable.Text>
                            <Animatable.Text animation="slideInDown" iterationCount={1} direction="alternate" style={styles.emptyText}>No notice available</Animatable.Text>
                            <Animatable.Text animation="slideInDown" iterationCount={1} direction="alternate">
                                <Ionicons
                                    name="ios-sad-outline"
                                    size={39}
                                    color="#58595a"
                                    style={{ marginTop: 10 }}
                                />
                            </Animatable.Text>
                        </View> :
                        <ScrollView
                            style={styles.scrollView}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    getNotices={getNotices}
                                />
                            }
                        >
                            {
                                // refreshing ? <Loading /> :
                                showingNotices.map((notice, index) => {
                                    return (
                                        <View key={index}>
                                            <NoticeCard notice={notice} />
                                            <HorizontalLine />
                                        </View>
                                    )
                                })
                            }
                            <View style={{ height: 90 }} />
                        </ScrollView>
                    }
                </>
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: primaryColors.primaryBlue,
        height: "100%",
        paddingTop: 10,
    },
    scrollView: {
        width: "100%",
        paddingHorizontal: 16,
        marginTop: 10,
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    emptyText: {
        fontSize: 20,
        fontWeight: 900,
        color: primaryColors.darkGrey,
        marginTop: 5,
    },
});

export default MyNotices;