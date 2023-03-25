import React, { useEffect, useRef, useState } from "react";
import { View, TextInput, Platform, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import { RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import { SelectList } from 'react-native-dropdown-select-list'
import ButtonComponent from "../../components/commonComponents/buttonComponent";
import Loading from "../../components/commonComponents/AppLoader";
import { toastComponent } from "../../components/commonComponents/toastComponent";
import { getDataFromAsync } from "../../constants/asyncStore";
import asyncStoreKeys from "../../constants/asyncStoreKeys";
import { getDateAndTime } from "../../services/commonFunctions";
import { addDocument, getDocumentsByField } from "../../services/firebaseServices";
import { getSubscribedUsers, sendNotification } from "../../services/notificationServices";
import { primaryColors } from '../../styles/colors';
import { validateNewNotice } from "./formValidation";

const NewNotice = ({ navigation }) => {
    const richText = useRef();
    const [isFocused, setIsFocused] = useState(false);
    const [signedInUser, setSignedInUser] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [communities, setCommunities] = useState([]);
    const [errors, setErrors] = useState({});

    const [subject, setSubject] = useState("");
    const [newNotice, setNewNotice] = useState("");
    const [community, setCommunity] = useState("");
    const [communityId, setCommunityId] = useState("");

    getDataFromAsync(asyncStoreKeys.IT_NUMBER)
        .then((data) => {
            setSignedInUser(data);
        });

    const handleSubmit = async () => {
        setIsLoading(true);
        const errors = validateNewNotice({ subject, community });
        setErrors(errors);
        if (Object.keys(errors).length > 0) {
            setIsLoading(false);
            return;
        }
        const res = await addDocument("notices", {
            owner: signedInUser,
            community: community,
            communityId: communityId,
            subject,
            notice: newNotice,
            dateTime: getDateAndTime(),
        });

        if (res.status) {
            const head = "New Notice from " + community;
            const body = subject;
            const tokens = await getSubscribedUsers(communityId);
            sendNotification(head, body, tokens);
            toastComponent("Notice added successfully!", false);
            navigation.navigate('Home', { screen: 'Notices' });
        } else {
            setIsLoading(false);
            toastComponent("Error while adding notice!", true);
        }
    }

    const selectCommunity = (val) => {
        const com = communities.filter((item) => item.key === val);
        setCommunity(com[0]?.value);
        setCommunityId(com[0]?.id);
    }

    useEffect(() => {
        setIsLoading(true);
        getDocumentsByField("communities", "itNumber", signedInUser)
            .then((res) => {
                let filtered = [];
                res.forEach((item, key) => {
                    filtered.push({
                        key: key,
                        id: item.id,
                        value: item.title,
                    });
                });
                setCommunities(filtered);
                setIsLoading(false);
            });
    }, [signedInUser]);

    return (
        <SafeAreaView style={{ width: "100%", height: "100%", backgroundColor: primaryColors.background }}>
            {isLoading ? <Loading /> :
                <ScrollView contentContainerStyle={styles.mainView}>
                    <TextInput
                        value={subject}
                        onChangeText={setSubject}
                        placeholder={"Subject"}
                        style={styles.subject}
                    />
                    {errors.subject && <Text style={styles.error}>{errors.subject}</Text>}
                    <SelectList
                        setSelected={selectCommunity}
                        data={communities}
                        placeholder={community == "" ? "Select Community" : community}
                        boxStyles={styles.selectListBox}
                        inputStyles={{ fontSize: 16, color: community == "" ? '#999' : '#000' }}
                        dropdownStyles={styles.selectListDropdown}
                    />
                    {errors.community && <Text style={styles.error}>{errors.community}</Text>}
                    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ width: "100%" }}>
                        <View style={styles.textEditorView}>
                            <RichEditor
                                ref={richText}
                                onChange={text => {
                                    setNewNotice(text);
                                }}
                                initialHeight={150}
                                // height={100}
                                placeholder={"Notice..."}
                                initialContentHTML={newNotice}
                                editorStyle={styles.textEditor}
                                containerStyle={styles.textEditorContainer}
                            // onFocus={() => setIsFocused(true)}
                            // onBlur={() => setIsFocused(false)}
                            />
                        </View>
                    </KeyboardAvoidingView>

                    {isFocused &&
                        <RichToolbar
                            editor={richText}
                        // actions={[actions.setBold, actions.setItalic, actions.setUnderline, actions.heading1,]}
                        // iconMap={{ [actions.heading1]: ({ tintColor }) => (<Text style={[{ color: tintColor }]}>H1</Text>), }}
                        />
                    }
                    <View style={{ height: 40 }} />
                    <ButtonComponent buttonText="Post" onPress={handleSubmit} backgroundColor={primaryColors.primaryBlue} />
                </ScrollView>
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainView: {
        paddingHorizontal: 16,
        paddingVertical: 40,
        backgroundColor: primaryColors.background,
    },
    headingStyle: {
        fontSize: 30,
        color: primaryColors.primaryBlue,
        fontWeight: 600,
        marginBottom: 30,
    },
    textEditorView: {
        width: "100%",
        borderRadius: 8,
        backgroundColor: '#fff',
        marginTop: 16,
        padding: 4,
    },
    textEditorContainer: {
        borderRadius: 8,
    },
    textEditor: {
        backgroundColor: '#fff',
    },
    subject: {
        width: "100%",
        height: 40,
        paddingLeft: 10,
        // marginBottom: 16,
        borderRadius: 8,
        fontSize: 16,
        backgroundColor: "#fff",
    },
    selectListBox: {
        width: "100%",
        height: 40,
        backgroundColor: '#fff',
        borderColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 0,
        alignItems: 'center',
        // marginBottom: 16,
        marginTop: 16,
        borderRadius: 8,
        fontSize: 16,
    },
    selectListDropdown: {
        // height: 200,
        backgroundColor: '#fff',
        borderColor: '#fff',
        marginBottom: 16,
        borderRadius: 8,
        fontSize: 16,
    },
    error: {
        color: 'red',
        fontSize: 12,
        marginLeft: 5,
    },
});

export default NewNotice;
