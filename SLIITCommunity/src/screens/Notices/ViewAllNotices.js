import React, { useEffect, useState } from 'react';
import { View, RefreshControl, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import NoticeCard from '../../components/notices/noticeCard';
import { getDocumentOrderBy, getDocuments } from '../../services/firebaseServices';
import { primaryColors } from '../../styles/colors';

const ViewAllNotices = () => {
    const [notices, setNotices] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const getNotices = () => {
        getDocumentOrderBy('notices', 'dateTime', 'desc')
            .then((res) => {
                setNotices(res);
                // console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
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
            <ScrollView
                style={styles.scrollView}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                {
                    notices.map((notice, index) => {
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
    },
    scrollView: {
        width: "100%",
        paddingHorizontal: 16,
    },
});

export default ViewAllNotices;