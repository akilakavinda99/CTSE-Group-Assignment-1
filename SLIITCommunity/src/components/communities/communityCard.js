import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from "react-native";

const CommunityCard = ({ communities }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.mainView}
        onPress={() => {
            navigation.navigate("ViewCommunity", {
                communities: communities,
            });
        }}>
            <Text style={styles.title}>{communities.title}</Text>
            <Text style={styles.faculty}>{communities.faculty}</Text>
            <Text style={styles.created_at}>{communities.created_at}</Text>
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
    title: {
        width: "100%",
        fontSize: 16,
        fontWeight: "bold",
    },
    created_at: {
        width: "100%",
        fontSize: 11,
    },
    facult: {
        width: "100%",
        fontSize: 12,
    }
});

export default CommunityCard;