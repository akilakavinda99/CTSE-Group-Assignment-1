import React, { useEffect, useState } from 'react';
import { View, RefreshControl, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import Loading from '../../components/commonComponents/loading';
import CommunityCard from '../../components/communities/communityCard';
import { getDocumentOrderBy } from '../../services/firebaseServices';
import { primaryColors } from '../../styles/colors';

const ViewAllCommunities = () => {
    const [communities, setCommunities] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const getCommunities = () => {
        getDocumentOrderBy('communities', 'created_at', 'desc')
            .then((res) => {
                setCommunities(res);
                // console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const onRefresh = () => {
        setRefreshing(true);
        getCommunities();
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
                    communities.map((communities, index) => {
                        return (
                            <CommunityCard key={index} communities={communities} />
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
        backgroundColor: primaryColors.background,
        height: "100%",
    },
    scrollView: {
        width: "100%",
        paddingHorizontal: 16,
    },
});

export default ViewAllCommunities;