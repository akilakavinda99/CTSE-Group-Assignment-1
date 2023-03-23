import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Loading from '../../components/commonComponents/loading';
import { getDocumentOrderBy } from '../../components/firebase/firebase';

const ViewAllEvents = () => {
    const [events, setEvents] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const getEvents = () => {
        getDocumentOrderBy('events', 'dateTime', 'desc')
            .then((res) => {
                setEvents(res);
                // console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
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
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollView: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default ViewAllEvents;