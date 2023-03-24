import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { Alert, Image, View, Text, StyleSheet, ScrollView } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RichEditor } from 'react-native-pell-rich-editor';
import ButtonComponent from '../../components/commonComponents/buttonComponent';
import Header from '../../components/commonComponents/header';
import Loading from '../../components/commonComponents/loading';
import sliitLogo from '../../assets/images/sliit-logo.png';
import { toastComponent } from '../../components/commonComponents/toastComponent';
import { getDataFromAsync } from '../../constants/asyncStore';
import asyncStoreKeys from '../../constants/asyncStoreKeys';
import { deleteDocument } from '../../services/firebaseServices';
import { primaryColors } from '../../styles/colors';

const ViewNotice = ({ route }) => {
    const [signedInUser, setSignedInUser] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();
    const notice = route.params.notice;
    const owner = notice.owner;

    getDataFromAsync(asyncStoreKeys.IT_NUMBER)
        .then((data) => {
            setSignedInUser(data);
        });

    const editNotice = () => {
        navigation.navigate('Edit Notice', { notice });
    }

    const handleDelete = () => {
        setIsLoading(true);
        deleteDocument('notices', notice.id)
            .then(() => {
                setIsLoading(false);
                toastComponent("Notice deleted successfully!", false);
                navigation.navigate('Home', { screen: 'Notices' });
            })
            .catch((err) => {
                setIsLoading(false);
                toastComponent("Error deleting notice!", true);
                console.log(err);
            });
    }

    const removeNotice = () => {
        Alert.alert('Are you sure?', 'You will not be able to recover this notice!', [
            {
                text: 'Cancel',
                //   onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'Yes', onPress: () => handleDelete() },
        ]);
    }

    return (
        <SafeAreaProvider style={styles.mainView}>
            <Header title={"View Notice"} />
            {isLoading ? <Loading /> :
                <View style={styles.bodyCard}>
                    <View style={styles.imageContainer}>
                        <Image source={sliitLogo} style={styles.image} />
                    </View>
                    <Text style={styles.subject}>{notice.subject}</Text>
                    <Text style={styles.community}>{notice.community}</Text>
                    <Text style={styles.dateTime}>{notice.dateTime}</Text>
                    <ScrollView contentContainerStyle={styles.scrollView}>
                        <View style={styles.textEditorView}>
                            <RichEditor
                                onChange={text => {
                                    setNewNotice(text);
                                }}
                                initialHeight={250}
                                disabled={true}
                                initialContentHTML={notice.notice}
                                editorStyle={styles.textEditor}
                                containerStyle={styles.textEditorContainer}
                            />
                        </View>
                    {
                        signedInUser === owner &&
                        <View style={styles.modifyButtons}>
                            <ButtonComponent
                                onPress={editNotice}
                                buttonText="Edit"
                                backgroundColor={primaryColors.primaryBlue}
                                width={"48%"} />
                            <ButtonComponent
                                onPress={removeNotice}
                                buttonText="Remove"
                                backgroundColor={primaryColors.primaryBlue}
                                width={"48%"} />
                        </View>

                    }
                    </ScrollView>
                </View>
            }
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: primaryColors.primaryBlue,
        marginBottom: 100,
        height: "100%",
        justifyContent: "space-between",
    },
    bodyCard: {
        backgroundColor: "#fff",
        padding: 20,
        paddingTop: 75,
        width: "100%",
        height: "95%",
        flexWrap: 'wrap',
        justifyContent: "space-between",
        marginTop: 100,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        // marginBottom: 10,
    },
    scrollView: {
        paddingBottom: 30,
    },
    imageContainer: {
        position: "absolute",
        top: -50,
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: primaryColors.background,
        alignSelf: "center",
        flex: 1,
        marginBottom: 16,
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderWidth: 2,
        borderColor: "#fff",
        elevation: 10,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        resizeMode: 'contain',
    },
    textEditorView: {
        width: "100%",
        borderRadius: 8,
    },
    textEditorContainer: {
        borderRadius: 8,
    },
    textEditor: {
        backgroundColor: '#fff',
    },
    subject: {
        width: "100%",
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
        color: primaryColors.primaryBlue
    },
    community: {
        width: "100%",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        color: primaryColors.primaryYellow
    },
    dateTime: {
        width: "100%",
        fontSize: 12,
        marginBottom: 16,
        textAlign: "center",
        color: "#888"
    },
    modifyButtons: {
        backgroundColor: "#fff",
        justifyContent: "space-between",
        gap: 10,
        marginTop: 16,
        flexDirection: 'row',
    },
});

export default ViewNotice