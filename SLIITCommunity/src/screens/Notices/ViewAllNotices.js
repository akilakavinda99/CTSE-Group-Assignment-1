import React, { useEffect, useState } from 'react';
import SearchBar from "react-native-dynamic-search-bar";
import { View, RefreshControl, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import Loading from '../../components/commonComponents/loading';
import NoticeCard from '../../components/notices/noticeCard';
import { getDocumentOrderBy } from '../../services/firebaseServices';
import { primaryColors } from '../../styles/colors';

const ViewAllNotices = () => {
    const [notices, setNotices] = useState([]);
    const [showingNotices, setShowingNotices] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const getNotices = () => {
        getDocumentOrderBy('notices', 'dateTime', 'desc')
            .then((res) => {
                setNotices(res);
                setShowingNotices(res);
                // console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const onSearch = (text) => {
        const filteredNotices = notices.filter((notice) => {
            // fileter by subject and community
            return notice.subject.toLowerCase().includes(text.toLowerCase()) ||
                notice.community.toLowerCase().includes(text.toLowerCase());
        });

        setShowingNotices(filteredNotices);        
    }

    const onRefresh = () => {
        setRefreshing(true);
        getNotices();
        setRefreshing(false);
    }

    useEffect(() => {
        onRefresh();
    }, []);

    return (
        <SafeAreaView style={styles.mainView}>
            <SearchBar
                placeholder="Search here"
                // onPress={() => alert("onPress")}
                onChangeText={onSearch}
            />
            <ScrollView
                style={styles.scrollView}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                {refreshing ? <Loading /> :
                    showingNotices.map((notice, index) => {
                        return (
                            <NoticeCard key={index} notice={notice} />
                        )
                    })
                }
                <View style={{ height: 90 }} />
            </ScrollView>
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

export default ViewAllNotices;