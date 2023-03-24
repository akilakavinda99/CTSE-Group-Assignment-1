import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { primaryColors } from "../styles/colors";
import sliitLogo from '../assets/images/sliit-logo.png';
import { getDataFromAsync, removeDataFromAsync } from "../constants/asyncStore";
import asyncStoreKeys from "../constants/asyncStoreKeys";
import { getDocument } from "../services/firebaseServices";
import AppLoader from "../components/commonComponents/AppLoader";
import { useNavigation } from "@react-navigation/native";
import { toastComponent } from "../components/commonComponents/toastComponent";
import Header from "../components/commonComponents/header";

const ProfileButton = ({ name, logout }) => {
    const navigate = useNavigation();

    const goToScreen = () => {
        navigate.navigate(name);
    }

    const pressLogout = async () => {
        await removeDataFromAsync(asyncStoreKeys.IT_NUMBER);
        toastComponent('Loggin out...')

        navigate.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    }

    return (
        <TouchableOpacity style={styles.profileButton} onPress={logout ? pressLogout : goToScreen}>
            <Text style={styles.profileButtonText}>{name}</Text>
            <Ionicons name="chevron-forward-outline" size={30} color={primaryColors.primaryBlue} />
        </TouchableOpacity>
    );
}

const Profile = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getDataFromAsync(asyncStoreKeys.IT_NUMBER)
            .then(async (data) => {
                let res = await getDocument('Users', data)
                setUser(res);
                setLoading(false);
            });
    }, []);

    return (
        <View style={styles.mainView}>
            {loading ?
                <AppLoader /> :
                <>
                    <Header title={'User Profile'} enableBack={true} />
                    <View style={styles.profileView}>
                        <Image
                            style={styles.profileImage}
                            source={sliitLogo}
                        />
                        <View>
                            <Text style={styles.profileName}>{user.name}</Text>
                            <Text style={styles.profileName}>({user.id})</Text>
                            <Text style={styles.profileEmail}>{user.email}</Text>
                        </View>
                    </View>
                    <View style={styles.profileButtonsView}>
                        <ProfileButton name="My Notices" />
                        <ProfileButton name="My Communities" />
                        <ProfileButton name="Logout" logout={true} />
                    </View>
                </>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: primaryColors.primaryBlue,
    },
    profileView: {
        flex: 1,
        flexDirection: "row",
        // alignItems: "center",
        // justifyContent: "center",
        backgroundColor: primaryColors.primary,
        padding: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        resizeMode: "contain",
        backgroundColor: primaryColors.background,
        borderWidth: 3,
        borderColor: primaryColors.primaryBlue,
        marginRight: 20,
    },
    profileName: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
        marginTop: 10,
    },
    profileEmail: {
        fontSize: 14,
        color: "#fff",
        marginTop: 5,
    },
    profileDetailsView: {
        flex: 1,
        padding: 20,
    },
    profileDetailsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 5,
    },
    profileDetailsLabel: {
        fontSize: 16,
        fontWeight: "bold",
        color: primaryColors.primary,
    },
    profileDetailsValue: {
        fontSize: 16,
        color: primaryColors.primary,
    },
    profileButtonsView: {
        flex: 3,
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: "#fff",
        paddingTop: 50,
    },
    profileButton: {
        backgroundColor: primaryColors.background,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        alignItems: "center",
        paddingLeft: 30,
        paddingRight: 20,
        borderRadius: 20,
        marginBottom: 10,
    },
    profileButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: primaryColors.white,
        textAlign: "center",
    },
});

export default Profile;