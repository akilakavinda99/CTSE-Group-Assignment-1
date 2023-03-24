import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SCREEN_WIDTH } from '../../styles/appStyles';

const NoticeCard = ({ notice}) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.mainView}
            onPress={() => {
                navigation.navigate("View Notice", {
                    notice: notice,
                });
            }}>
            <Text style={styles.subject}>{notice.subject}</Text>
            <Text style={styles.notice}>{notice.community}</Text>
            <Text style={styles.addedDate}>{notice.dateTime}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    mainView: {
        // flex: 1,
        // width: SCREEN_WIDTH,
        width: "100%",
        // marginBottom: 10,
        padding: 10,
        backgroundColor: "#fff",
        marginTop: 10,
        borderRadius: 10,
    },
    subject: {
        width: "100%",
        fontSize: 18,
        fontWeight: "500",
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