import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const EventCard = ({ events }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.mainView}
        onPress={() => {
            navigation.navigate("ViewEvent", {
                events: events,
            });
        }}>
            <Text style={styles.title}>{events.title}</Text>
            <Text style={styles.venue}>{events.venue}</Text>
            <Text style={styles.created_at}>{events.created_at}</Text>
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
    venue: {
        width: "100%",
        fontSize: 12,
    }
});

export default EventCard;