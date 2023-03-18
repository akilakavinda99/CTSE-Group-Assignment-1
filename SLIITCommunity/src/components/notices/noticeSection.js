import React from 'react';
import { View, Text, TextInput, Platform, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { SCREEN_WIDTH } from '../../styles/appStyles';
import HorizontalLine from '../commonComponents/horizontalLine';
import NoticeCard from './noticeCard';

const NoticeSection = ({ community, notices }) => {

    return (
        <View style={styles.mainView}>
            <Text style={styles.communityName}>{community}</Text>
            <HorizontalLine />
            {
                notices.map((notice, index) => {
                    return (
                        <View key={index} style={{ width: "100%" }}>
                            <NoticeCard key={index} notice={notice} />
                            <HorizontalLine />
                        </View>
                    )
                })
            }
        </View>
    );
}

const styles = StyleSheet.create({
    mainView: {
        alignItems: "center",
        backgroundColor: "#fff",
        marginVertical: 10,
        borderRadius: 10,
    },
    communityName: {
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 10,
    },
});

export default NoticeSection;