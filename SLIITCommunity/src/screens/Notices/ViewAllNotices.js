import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Platform, KeyboardAvoidingView, RefreshControl, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import NoticeSection from '../../components/notices/noticeSection';
import { groupDocumets } from '../../services/commonFunctions';
import { getDocuments } from '../../services/firebaseServices';
import { AppLayout } from '../../styles/appStyles';
import { primaryColors } from '../../styles/colors';

const ViewAllNotices = () => {
    const [notices, setNotices] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const getNotices = () => {
        getDocuments('notices', 'community')
            .then((res) => {
                let groupedRes = groupDocumets(res, 'community');
                setNotices(groupedRes);
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
                style={{ width: "100%" }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                {
                    Object.entries(notices).map((notice, index) => {
                        return (
                            <NoticeSection key={index} community={notice[0]} notices={notice[1]} />
                        )
                    })
                }
                <View style={{ height: 80 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainView: {
        paddingHorizontal: 16,
        backgroundColor: primaryColors.background,
        height: "100%",
    },
});

export default ViewAllNotices;