import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { Alert, View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import { RichEditor } from 'react-native-pell-rich-editor';
import ButtonComponent from '../../components/commonComponents/buttonComponent';
import Loading from '../../components/commonComponents/loading';
import { toastComponent } from '../../components/commonComponents/toastComponent';
import { getDataFromAsync } from '../../constants/asyncStore';
import asyncStoreKeys from '../../constants/asyncStoreKeys';
import { deleteDocument } from '../../services/firebaseServices';
import { primaryColors } from '../../styles/colors';

const ViewCommunity = ({ route }) => {
    const [signedInUser, setSignedInUser] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();
    const communities = route.params.communities;
    const itNumber = communities.itNumber;

    getDataFromAsync(asyncStoreKeys.IT_NUMBER)
        .then((data) => {
            setSignedInUser(data);
        });

    const editCommunity = () => {
        navigation.navigate('Edit Community', { communities });
    }

    const handleDelete = () => {
        setIsLoading(true);
        deleteDocument('communities', communities.id)
            .then(() => {
                setIsLoading(false);
                toastComponent("Community deleted successfully!", false);
                navigation.navigate('Home', { screen: 'Communities' });
            })
            .catch((err) => {
                setIsLoading(false);
                toastComponent("Error deleting community!", true);
            });
    }

    const removeCommunity = () => {
        Alert.alert('Are you sure?', 'You will not be able to recover this community!', [
            {
                text: 'Cancel',
                //   onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'Yes', onPress: () => handleDelete() },
        ]);
    }

    return (
        <SafeAreaView style={styles.mainView}>
            {isLoading ? <Loading /> :
                <View style={styles.bodyCard}>
                    <Text style={styles.subject}>{communities.title}</Text>
                    <Text style={styles.community}>{communities.faculty}</Text>
                    <Text style={styles.dateTime}>{communities.created_at}</Text>
                    <ScrollView contentContainerStyle={styles.scrollView}>
                        <View style={styles.textEditorView}>
                            <RichEditor
                                onChange={text => {
                                    setNewCommunity(text);
                                }}
                                initialHeight={250}
                                disabled={true}
                                initialContentHTML={communities.description}
                                editorStyle={styles.textEditor}
                                containerStyle={styles.textEditorContainer}
                            />
                        </View>
                    </ScrollView>
                    {
                        signedInUser === itNumber &&
                        <View style={styles.modifyButtons}>
                            <ButtonComponent onPress={editCommunity} buttonText="Edit" />
                            <ButtonComponent style={{backgroundColor:'red'}} onPress={removeCommunity} buttonText="Remove" />
                        </View>

                    }
                </View>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: primaryColors.background,
        height: "100%",
    },
    bodyCard: {
        backgroundColor: "#fff",
        // borderRadius: 8,
        padding: 16,
        width: "100%",
        height: "100%",
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
        gap: 10,
        marginTop: 16,
    },
});

export default ViewCommunity