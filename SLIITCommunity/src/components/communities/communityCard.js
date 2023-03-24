import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View, Image } from "react-native";
import * as Animatable from 'react-native-animatable';
import { primaryColors } from '../../styles/colors';

const CommunityCard = ({ communities, index }) => {
    const navigation = useNavigation();

    return (
        <Animatable.View animation="fadeInUp"  iterationCount={1} delay={index *300} direction="alternate" style={styles.mainView}>
        <TouchableOpacity
        onPress={() => {
            navigation.navigate("View Community", {
                communities: communities,
            });
        }}>
            <Image source={{uri: communities.image}} style={styles.image} resizeMode="cover" />
            {/* <View
            style={{
              borderBottomWidth: 1,
              borderStyle: 'dashed',
              backgroundColor: '#E8E8E8',
            }}
          /> */}
            <View style={styles.textView}>
                <Text style={styles.title}>{communities.title.substring(0, 15)}</Text>
                <Text style={styles.faculty}>{communities.faculty.substring(0, 22)}</Text>
                {/* <Text style={styles.created_at}>{communities.created_at}</Text> */}
            </View>
        </TouchableOpacity>
        </Animatable.View>
    );
}

const styles = StyleSheet.create({
    mainView: {
        width: "47%",
        height:180,
        backgroundColor: "#f2f3ff",
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
            elevation: 8,
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
        marginTop:5
        
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
