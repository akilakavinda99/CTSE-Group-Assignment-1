import React, { useEffect, useState } from 'react';
import { View, RefreshControl, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import Loading from '../../components/commonComponents/AppLoader';
import EventCard from '../../components/EventManagement/EventCard';
import { getDocumentOrderBy } from '../../services/firebaseServices';
import { primaryColors } from '../../styles/colors';
import SearchBar from "react-native-dynamic-search-bar";
import Header from '../../components/commonComponents/header';

const ViewAllEvents = () => {
    const [events, setEvents] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [searchText, setSearchText] = useState("");

    const getEvents = () => {
        setRefreshing(true);
        getDocumentOrderBy('events', 'created_at', 'desc')
            .then((res) => {
                setEvents(res);
                setRefreshing(false);
            })
            .catch((err) => {
                console.log(err);
                setRefreshing(false);
            });
    }

    const onSearch = (text) => {
        setSearchText(text);
        const filteredEvents = events.filter((event) => {
            return event.title.toLowerCase().includes(text.toLowerCase()) ||
                event.venue.toLowerCase().includes(text.toLowerCase());
        });

        setEvents(filteredEvents);
    }

    const onRefresh = () => {
        getEvents();
    }

    useEffect(() => {
        onRefresh();
    }, []);

    return (
        <SafeAreaView style={styles.mainView}>
            {refreshing ? <Loading /> : 
            <>
            <Header title={'Events'} enableBack={false} />
            <SearchBar
                placeholder="Search here"
                clearIconComponent={searchText == "" ? <View /> : <Text>Clear</Text>}
                onClearPress={() => onSearch("")}
                placeholderTextColor={"#8e8e8e"}
            />
            <ScrollView
                style={styles.scrollView}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        // onRefresh={onRefresh}
                        getEvents={getEvents}
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
            </>
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainView: {
        height: "100%",
        backgroundColor: primaryColors.primaryBlue,
    },
    scrollView: {
        width: '100%',
        paddingHorizontal: 16,
        backgroundColor: "#fff",
        marginTop: 10,
    },
});

export default ViewAllEvents;