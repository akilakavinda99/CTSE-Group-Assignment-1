import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Alert, View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import { RichEditor } from 'react-native-pell-rich-editor';
import ButtonComponent from '../../components/commonComponents/buttonComponent';
import { toastComponent } from '../../components/commonComponents/toastComponent';
import { getDataFromAsync } from '../../constants/asyncStore';
import asyncStoreKeys from '../../constants/asyncStoreKeys';
import { deleteDocument } from '../../services/firebaseServices';
import { primaryColors } from '../../styles/colors';

const ViewNotice = ({ route }) => {
    const navigation = useNavigation();
    const [signedInUser, setSignedInUser] = React.useState("");
    const notice = route.params.notice;
    const owner = notice.owner;

    getDataFromAsync(asyncStoreKeys.IT_NUMBER)
        .then((data) => {
            setSignedInUser(data);
        });

    const handleDelete = () => {
        deleteDocument('notices', notice.id)
            .then(() => {
                toastComponent("Notice deleted successfully!", false);
                navigation.navigate('Home');
            })
            .catch((err) => {
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
        <SafeAreaView style={styles.mainView}>
            <View style={styles.bodyCard}>
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
                </ScrollView>
                {
                    signedInUser === owner &&
                    <View style={styles.modifyButtons}>
                        <ButtonComponent onPress={() => { }} buttonText="Edit" />
                        <ButtonComponent onPress={removeNotice} buttonText="Remove" />
                    </View>

                }
            </View>
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

export default ViewNotice