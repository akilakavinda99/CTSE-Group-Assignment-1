import React, { useEffect, useState } from 'react';
import { View, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';
import Loading from '../../components/commonComponents/AppLoader';
import EventCard from '../../components/EventManagement/EventCard';
import { getDocumentOrderBy } from '../../services/firebaseServices';
import { primaryColors } from '../../styles/colors';
import SearchBar from "react-native-dynamic-search-bar";
import Header from '../../components/commonComponents/header';

const ViewAllEvents = () => {
    const [events, setEvents] = useState([]);
    const [showingNotices, setShowingNotices] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [searchText, setSearchText] = useState("");

    const getEvents = () => {
        setRefreshing(true);
        getDocumentOrderBy('events', 'created_at', 'desc')
            .then((res) => {
                setEvents(res);
                setShowingNotices(res);
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

        setShowingNotices(filteredEvents);
    }

    const onRefresh = () => {
        getEvents();
    }

    useEffect(() => {
        onRefresh();
        // console.log(events);
    }, []);

    return (
        <SafeAreaView style={styles.mainView}>
            {refreshing ? <Loading /> : 
            <>
            <Header title={'Events'} enableBack={false} />
            <SearchBar
                placeholder="Search here"
                onChangeText={onSearch}
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
                    showingNotices.map((event, index) => {
                        console.log(events);
                        return (
                            <EventCard key={index} events={event} />
                           
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