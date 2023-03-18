import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Platform, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import NoticeSection from '../../components/notices/noticeSection';
import { groupDocumets } from '../../services/commonFunctions';
import { getDocuments } from '../../services/firebaseServices';
import { AppLayout } from '../../styles/appStyles';

const ViewAllNotices = () => {
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        getDocuments('notices', 'community')
            .then((res) => {
                let groupedRes = groupDocumets(res, 'community');
                setNotices(groupedRes);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <SafeAreaView style={styles.mainView}>
            <ScrollView style={{ width: "100%" }}>
                {
                    Object.entries(notices).map((notice, index) => {
                        return (
                            <NoticeSection key={index} community={notice[0]} notices={notice[1]} />
                        )
                    })
                }
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainView: {
        paddingHorizontal: 16,
        padding: 10,
        backgroundColor: "#E4EAFF",
        height: "100%",
    },
});

export default ViewAllNotices;