import React, { useEffect, useRef, useState } from "react";
import { View, TextInput, Platform, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import { SelectList } from 'react-native-dropdown-select-list'
import ButtonComponent from "../../components/commonComponents/buttonComponent";
import Loading from "../../components/commonComponents/loading";
import { toastComponent } from "../../components/commonComponents/toastComponent";
import { getDataFromAsync } from "../../constants/asyncStore";
import asyncStoreKeys from "../../constants/asyncStoreKeys";
import { getDateAndTime } from "../../services/commonFunctions";
import { addDocument, getDocumentsByField } from "../../services/firebaseServices";
import { sendNotification } from "../../services/notificationServices";
import { primaryColors } from '../../styles/colors';

const NewNotice = ({ navigation }) => {
    const richText = useRef();
    const [isFocused, setIsFocused] = useState(false);
    const [signedInUser, setSignedInUser] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [communities, setCommunities] = useState([]);

    const [subject, setSubject] = useState("");
    const [newNotice, setNewNotice] = useState("");
    const [community, setCommunity] = useState("");

    getDataFromAsync(asyncStoreKeys.IT_NUMBER)
        .then((data) => {
            setSignedInUser(data);
        });

    const handleSubmit = async () => {
        setIsLoading(true);
        const res = await addDocument("notices", {
            owner: signedInUser,
            community: community,
            subject,
            notice: newNotice,
            dateTime: getDateAndTime(),
        });
        // console.log(res);

        setIsLoading(false);
        if (res.status) {
            // sendNotification('New Notice from ' + community, subject, [
            //     "cSNI_a9bRl632Bjvi_2daC:APA91bHHaQa0WxyoJNp5zrXUwLhXz3AMTqVqbYBaK4w5hq8vOlXIMkWMFJEJ1OGWMj3RCKg9Yg-11_8kmuYHGygLHn4MD0hZUTE3iwU5MJRtFMYcL2jCRP21DWv4qSf2ZvVpYLxewYuW",
            //     "cXXikM7cSFe-gvbyNvAD8A:APA91bGe0u9MJVhzFX7ESIwXycx05a7ZD1hGFGal29KFtHb6h3auJQVbG9xYNK8gkH7Re4LrcaNSdYDz5v0RIP7C6B4-7k3mo_V6QMAeGKlguu6Rc0YZDGMHLZhreBZVr8mC8HlrnzgJ"
            // ])
            toastComponent("Notice added successfully!", false);
            navigation.navigate('Home', { screen: 'Notices' });
        } else {
            toastComponent("Error while adding notice!", true);
        }
    }

    const selectCommunity = (val) => {
        const com = communities.filter((item) => item.key === val);
        setCommunity(com[0]?.value);
    }

    useEffect(() => {
        getDocumentsByField("communities", "itNumber", signedInUser)
            .then((res) => {
                let filtered = [];
                res.forEach((item, key) => {
                    filtered.push({
                        key: key,
                        value: item.title,
                    });
                });
                setCommunities(filtered);
            });
    }, [signedInUser]);

    return (
        <SafeAreaView style={{ width: "100%", height: "100%" }}>
            {isLoading ? <Loading /> :
                <View style={styles.mainView}>
                    <TextInput
                        value={subject}
                        onChangeText={setSubject}
                        placeholder={"Subject"}
                        style={styles.subject}
                    />
                    <SelectList
                        setSelected={selectCommunity}
                        data={communities}
                        placeholder="Select Community"
                        boxStyles={styles.selectListBox}
                        inputStyles={{ fontSize: 16, color: community == "" ? '#999' : '#000' }}
                        dropdownStyles={styles.selectListDropdown}
                    />
                    <ScrollView contentContainerStyle={styles.scrollView}>
                        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ width: "100%" }}>
                            <View style={styles.textEditorView}>
                                <RichEditor
                                    ref={richText}
                                    onChange={text => {
                                        setNewNotice(text);
                                    }}
                                    initialHeight={250}
                                    // height={100}
                                    placeholder={"Notice..."}
                                    initialContentHTML={""}
                                    editorStyle={styles.textEditor}
                                    containerStyle={styles.textEditorContainer}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                />
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>

                    {isFocused &&
                        <RichToolbar
                            editor={richText}
                        // actions={[actions.setBold, actions.setItalic, actions.setUnderline, actions.heading1,]}
                        // iconMap={{ [actions.heading1]: ({ tintColor }) => (<Text style={[{ color: tintColor }]}>H1</Text>), }}
                        />
                    }
                    {!isFocused && <View style={{ height: 40 }} />}
                    <ButtonComponent buttonText="Post" onPress={handleSubmit} backgroundColor={primaryColors.primaryBlue} />
                </View>
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainView: {
        paddingHorizontal: 16,
        paddingVertical: 40,
        backgroundColor: primaryColors.background,
        height: "100%",
        // alignItems: "center",
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
        marginBottom: 16,
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
        marginBottom: 16,
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
});

export default NewNotice;
