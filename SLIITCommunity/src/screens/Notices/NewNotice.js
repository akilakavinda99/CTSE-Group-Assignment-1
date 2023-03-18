import React, { useRef, useState } from "react";
import { View, Text, TextInput, Platform, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import ButtonComponent from "../../components/commonComponents/buttonComponent";
import { getDateAndTime } from "../../services/commonFunctions";
import { addDocument } from "../../services/firebaseServices";
import { AppLayout, SCREEN_HEIGHT } from '../../styles/appStyles';
import { primaryColors } from '../../styles/colors';

const NewNotice = () => {
    const richText = useRef();
    const [subject, setSubject] = useState("");
    const [newNotice, setNewNotice] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const handleSubmit = async () => {
        const res = await addDocument("notices", {
            owner: "admin",
            community: "SLIIT",
            subject,
            notice: newNotice,
            dateTime: getDateAndTime(),
        });

        console.log(res);
    }

    return (
        <SafeAreaView style={styles.mainView}>
            {/* <Text style={styles.headingStyle}>New Notice</Text> */}
            <TextInput
                value={subject}
                onChangeText={setSubject}
                placeholder={"Subject"}
                style={styles.subject}
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
            { !isFocused && <View style={{ height: 40 }} />}
            <ButtonComponent buttonText="Post" onPress={handleSubmit} />

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainView: {
        paddingHorizontal: 16,
        paddingTop: SCREEN_HEIGHT / 25,
        paddingBottom: 40,
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
    }
});

export default NewNotice;
