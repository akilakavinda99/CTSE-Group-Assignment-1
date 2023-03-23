import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View, Image } from "react-native";
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
            <Image source={{uri: communities.image}} style={styles.image} resizeMode="cover" />
            <View style={styles.textView}>
                <Text style={styles.title}>{communities.title.substring(0, 15)}</Text>
                <Text style={styles.faculty}>{communities.faculty.substring(0, 22)}</Text>
                {/* <Text style={styles.created_at}>{communities.created_at}</Text> */}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    mainView: {
        width: "47%",
        height:180,
        backgroundColor: "#fff",
        marginTop: 15,
        marginRight: 5,
        marginLeft: 5,
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
            elevation: 5,
          },
        }),
      },
    image: {
        width: "100%",
        height: "70%",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    textView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
    },
    title: {
        width: "100%",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    created_at: {
        width: "100%",
        fontSize: 11,
        textAlign: "center",
    },
    faculty: {
        width: "100%",
        fontSize: 12,
        fontWeight: 800,
        color: primaryColors.primaryYellow,
        textAlign: "center",
    }
});

export default CommunityCard;
