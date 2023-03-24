import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

const Header = ({ title}) => {
    const navigation = useNavigation();

    const goBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={goBack}>
                <Ionicons name="chevron-back-outline" size={30} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headding}>{title}</Text>
            <View style={{ width: 50 }} />
            {/* <TouchableOpacity onPress={goBack}>
                <Ionicons name="ellipsis-horizontal-outline" size={30} color="#fff" />
            </TouchableOpacity> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        top: 0,
        left: 0,
        right: 0,
        height: 55,
        alignItems: "center",
        paddingHorizontal: 15,
        justifyContent: "space-between",
    },
    headding: {
        fontSize: 20,
        color: "#fff",
        fontWeight: "500",
        marginLeft: 15,
        alignSelf: "center",
    },
});

export default Header;