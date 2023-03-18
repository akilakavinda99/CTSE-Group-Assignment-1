import React from 'react'
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import { RichEditor } from 'react-native-pell-rich-editor';
import { primaryColors } from '../../styles/colors';

const ViewNotice = ({ route }) => {
    const notice = route.params.notice;
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
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainView: {
        paddingHorizontal: 16,
        paddingVertical: 40,
        backgroundColor: primaryColors.background,
        height: "100%",
        // alignItems: "center",
    },
    bodyCard: {
        backgroundColor: "#fff",
        borderRadius: 8,
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
});

export default ViewNotice