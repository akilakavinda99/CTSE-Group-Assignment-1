import React, { useRef, useState } from "react";
import { View, Text, TextInput, Platform, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import ButtonComponent from "../../components/commonComponents/buttonComponent";
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
            date: new Date().toDateString(),
        });
        console.log(res);
    }

    return (
        <SafeAreaView style={[AppLayout.flexColumnCentered, styles.mainView]}>
            <Text style={styles.headingStyle}>New Notice</Text>
            <TextInput
                value={subject}
                onChangeText={setSubject}
                placeholder={"Subject"}
                style={styles.subject}
            />
            <ScrollView contentContainerStyle={styles.scrollView}>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1, width: "100%" }}>
                    <View style={styles.textEditorView}>
                        <RichEditor
                            ref={richText}
                            onChange={text => {
                                setNewNotice(text);
                            }}
                            initialHeight={200}
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
            <ButtonComponent buttonText="Post" onPress={handleSubmit} />

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainView: {
        height: SCREEN_HEIGHT,
        marginLeft: 16,
        marginRight: 16,
        marginTop: SCREEN_HEIGHT / 15,
        marginBottom: SCREEN_HEIGHT / 15,
    },
    headingStyle: {
        fontSize: 30,
        color: primaryColors.primaryBlue,
        fontWeight: 600,
        marginBottom: 30,
    },
    textEditorView: {
        width: 343,
        borderRadius: 8,
    },
    textEditorContainer: {
        width: "100%",
        borderRadius: 8,
        fontSize: 10,
    },
    textEditor: {
        backgroundColor: '#E8E8E8',

    },
    scrollView: {
        width: "100%",
    },
    subject: {
        width: 343,
        height: 45,
        paddingLeft: 15,
        marginBottom: 16,
        backgroundColor: '#E8E8E8',
        borderRadius: 8,
    }
});

export default NewNotice;
