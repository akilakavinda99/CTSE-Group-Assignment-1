import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { primaryColors } from '../../styles/colors';

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
        width: "100%",
        padding: 10,
        backgroundColor: "#fff",
        marginTop: 10,
        borderRadius: 10,
        ...Platform.select({
          ios: {
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.2,
            shadowRadius: 2,
          },
          android: {
            elevation: 3,
          },
        }),
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
    faculty: {
        width: "100%",
        fontSize: 12,
        fontWeight: 800,
        color: primaryColors.primaryYellow
    }
});

export default CommunityCard;