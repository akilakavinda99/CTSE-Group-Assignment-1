import React, { useEffect, useState } from 'react';
import { View, RefreshControl, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import Loading from '../../components/commonComponents/loading';
import EventCard from '../../components/EventManagement/EventCard';
import { getDocumentOrderBy } from '../../services/firebaseServices';
import { primaryColors } from '../../styles/colors';
import SearchBar from "react-native-dynamic-search-bar";

const ViewAllEvents = () => {
    const [events, setEvents] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const getEvents = () => {
        getDocumentOrderBy('events', 'created_at', 'desc')
            .then((res) => {
                setEvents(res);
                // console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const onSearch = (text) => {
        const filteredEvents = events.filter((event) => {
            return event.title.toLowerCase().includes(text.toLowerCase()) ||
                event.venue.toLowerCase().includes(text.toLowerCase());
        });

        setEvents(filteredEvents);
    }

    const onRefresh = () => {
        setRefreshing(true);
        getEvents();
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
                    events.map((events, index) => {
                        return (
                            <EventCard key={index} events={events} />
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
        height: "100%",
        paddingTop: 10,
        backgroundColor: primaryColors.background,
    },
    scrollView: {
        width: '100%',
        paddingHorizontal: 16,
        marginTop: 10,
    },
});

export default ViewAllEvents;