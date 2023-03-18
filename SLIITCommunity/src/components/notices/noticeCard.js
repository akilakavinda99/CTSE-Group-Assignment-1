import React from 'react';
import { View, Text, TextInput, Platform, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { SCREEN_WIDTH } from '../../styles/appStyles';

const NoticeCard = ({notice}) => {

    return (
        <View style={styles.mainView}>
            <Text style={styles.subject}>{notice.subject}</Text>
            <Text style={styles.addedDate}>{notice.dateTime}</Text>
            {/* <Text style={styles.notice}>{notice.notice}</Text> */}
        </View>
    );
}

const styles = StyleSheet.create({
    mainView: {
        // flex: 1,
        // width: SCREEN_WIDTH,
        width: "100%",
        // marginBottom: 10,
        padding: 10,
    },
    subject: {
        width: "100%",
        fontSize: 16,
        fontWeight: "bold",
    },
    addedDate: {
        width: "100%",
        fontSize: 11,
    },
    notice: {
        width: "100%",
        fontSize: 12,
    }
});

export default NoticeCard;