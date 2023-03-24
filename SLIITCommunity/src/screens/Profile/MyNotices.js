import React, { useEffect, useState } from 'react';
import SearchBar from "react-native-dynamic-search-bar";
import { View, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import Loading from '../../components/commonComponents/AppLoader';
import NoticeCard from '../../components/notices/noticeCard';
import { getDocumentsByFieldWithId } from '../../services/firebaseServices';
import { primaryColors } from '../../styles/colors';
import NetCheck from '../../components/commonComponents/netCheck';

const MyNotices = () => {
    const [notices, setNotices] = useState([]);
    const [showingNotices, setShowingNotices] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [searchText, setSearchText] = useState("");

    const getNotices = async () => {
        setRefreshing(true);
        getDocumentsByFieldWithId('notices', 'owner', 'IT20206284')
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
                                    <NoticeCard key={index} notice={notice} />
                                )
                            })
                        }
                        <View style={{ height: 90 }} />
                    </ScrollView>
                </>
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: primaryColors.background,
        height: "100%",
        paddingTop: 10,
    },
    scrollView: {
        width: "100%",
        paddingHorizontal: 16,
        marginTop: 10,
    },
});

export default MyNotices;