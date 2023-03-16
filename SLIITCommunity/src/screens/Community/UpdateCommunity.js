import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Alert,
  Button,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import Toast from 'react-native-toast-message';
import {AppLayout, SCREEN_HEIGHT} from '../../styles/appStyles';
import {primaryColors} from '../../styles/colors';
import {SelectList} from 'react-native-dropdown-select-list';
import { addDocument } from "../../services/firebaseServices";

const UpdateCommunity = () => {
  const richText = useRef();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [selected, setSelected] = React.useState('');

  const data = [
    {key: '1', value: 'All'},
    {key: '2', value: 'Computing'},
    {key: '3', value: 'Engineering'},
    {key: '4', value: 'Business School'},
    {key: '5', value: 'Humanaties & Sciences'},
    {key: '6', value: 'School of Architecture'},
    {key: '7', value: 'School of Law'},
    {key: '8', value: 'School of Hospitality & Culinary'},
    {key: '9', value: 'Graduate Studies & Researches'},
  ];

  const handleSubmit = async () => {
    if (title.trim() === '') {
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Community Title can not be empty❗',
          });
        return;
      }
      if (selected.trim() === '') {
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Faculty can not be empty❗',
          });
        return;
      }
      if (description.trim() === '') {
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Description can not be empty❗',
          });
        return;
      }
    const res = await addDocument("communities", {
        title,
        faculty:selected,
        description: description,
        updated_at: new Date().toDateString(),
    });
    console.log(res);
}

  return (
    <>
      <View style={styles.container}>
        <SafeAreaView style={[AppLayout.flexColumnCentered, styles.mainView]}>
          <Text style={styles.headingStyle}>Update Community</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder={'Enter Community Title'}
            style={styles.title}
          />

          <SelectList
            boxStyles={{
              borderRadius: 8,
              borderColor: '#E8E8E8',
              backgroundColor: '#E8E8E8',
              width: 343,
              height: 45,
              paddingLeft: 15,
            }}
            dropdownItemStyles={{marginHorizontal: 10}}
            dropdownTextStyles={{color: 'black'}}
            setSelected={setSelected}
            placeholder={'Select a Faculty'}
            maxHeight={150}
            data={data}
            save="value"
          />

          <ScrollView contentContainerStyle={styles.scrollView}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{flex: 1, width: '100%'}}>
              <View style={styles.textEditorView}>
                <RichEditor
                  ref={richText}
                  onChange={text => {
                    setDescription(text);
                  }}
                  placeholderTextColor="black"
                  initialHeight={200}
                  placeholder={'Enter Community Description'}
                  initialContentHTML={''}
                  editorStyle={styles.textEditor}
                  containerStyle={styles.textEditorContainer}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
              </View>
            </KeyboardAvoidingView>

            <View style={{marginBottom: 20}}>
              <Button
                title="Update"
                color="#242d66"
                onPress={handleSubmit}
              />
            </View>

            <View style={{marginBottom: 20}}>
              <Button
                title="Delete"
                color="#c13a34"
              />
            </View>

            <Button
              title="Back"
              color="#ffad00"
              onPress={() => Alert.alert('Simple Button pressed')}
            />
          </ScrollView>

          {isFocused && (
            <RichToolbar
              editor={richText}
              // actions={[actions.setBold, actions.setItalic, actions.setUnderline, actions.heading1,]}
              // iconMap={{ [actions.heading1]: ({ tintColor }) => (<Text style={[{ color: tintColor }]}>H1</Text>), }}
            />
          )}
        </SafeAreaView>
        <Toast />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainView: {
    // height: SCREEN_HEIGHT,
    marginLeft: 16,
    marginRight: 16,
    marginTop: SCREEN_HEIGHT / 15,
  },
  headingStyle: {
    fontSize: 30,
    color: primaryColors.primaryBlue,
    fontWeight: 800,
    marginBottom: 50,
  },
  textEditorView: {
    width: 330,
    borderRadius: 8,
    marginBottom: 30,
  },
  textEditorContainer: {
    width: '100%',
    borderRadius: 8,
  },
  textEditor: {
    backgroundColor: '#E8E8E8',
  },
  scrollView: {
    width: '100%',
    marginTop: 16,
    marginBottom: 0,
  },
  title: {
    width: 343,
    height: 45,
    paddingLeft: 15,
    marginBottom: 16,
    backgroundColor: '#E8E8E8',
    borderRadius: 8,
    borderColor: 'red',
    color: 'black',
  }
});

export default UpdateCommunity;