import React, { useRef, useState } from "react";
import { View, Text, TextInput, Platform, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import ButtonComponent from "../../components/commonComponents/buttonComponent";
import Loading from "../../components/commonComponents/loading";
import { toastComponent } from "../../components/commonComponents/toastComponent";
import Toast from 'react-native-toast-message';
import { getDateAndTime } from "../../services/commonFunctions";
import {SelectList} from 'react-native-dropdown-select-list';
import { updateDocument } from "../../services/firebaseServices";
import { primaryColors } from '../../styles/colors';

const UpdateCommunity = ({route, navigation, navigation: {goBack}}) => {
  const communities = route.params.communities;
  const richText = useRef();
  const [title, setTitle] = useState(communities.title);
  const [newDescription, setNewDescription] = useState(communities.description);
  const [faculty, setFaculty] = React.useState(communities.faculty);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      if (faculty.trim() === '') {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Faculty can not be empty❗',
        });
        return;
      }
      if (newDescription.trim() === '') {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Description can not be empty❗',
        });
        return;
      }
    setIsLoading(true);
    const res = await updateDocument('communities', communities.id, {
      title,
      faculty: faculty,
      description: newDescription,
      created_at: getDateAndTime(),
    });
    setIsLoading(false);
    if (res) {
      toastComponent('Community updated successfully!', false);
      navigation.navigate('Home', {screen: 'Communities'});
    } else {
      toastComponent('Error updating Community!', true);
    }

  };

  return (
    <SafeAreaView style={{width: '100%', height: '100%'}}>
      {isLoading ? (
        <Loading />
      ) : (
        <View style={styles.mainView}>
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
              width: 330,
              height: 45,
              paddingLeft: 15,
            }}
            dropdownItemStyles={{marginHorizontal: 10}}
            dropdownTextStyles={{color: 'black'}}
            setSelected={setFaculty}
            
            maxHeight={150}
            data={data}
            save="value"
            value={faculty}
          />

          <View style={{marginBottom: 20}}></View>
          <ScrollView contentContainerStyle={styles.scrollView}>
            {/* <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{width: '100%'}}> */}
              <View style={styles.textEditorView}>
                <RichEditor
                  ref={richText}
                  onChange={text => {
                    setNewDescription(text);
                  }}
                  initialHeight={250}
                  placeholder={'Enter Community Description'}
                  initialContentHTML={newDescription}
                  editorStyle={styles.textEditor}
                  containerStyle={styles.textEditorContainer}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
              </View>

              <View style={{marginBottom: 10}}>
              <ButtonComponent
                backgroundColor="#ffad00"
                buttonText="Update Community"
                onPress={handleSubmit}
              />
            </View>
            <View style={{marginBottom: 15}}>
              <ButtonComponent
                backgroundColor="#58595a"
                buttonText="Cancel"
                onPress={() => goBack()}
              />
            </View>
            
            {/* </KeyboardAvoidingView> */}

            
          </ScrollView>

          {isFocused && <RichToolbar editor={richText} />}
          {!isFocused && <View style={{height: 40}} />}
        </View>
      )}
      <Toast />
    </SafeAreaView>
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
    paddingHorizontal: 16,
    height: "100%",

  },
  headingStyle: {
    fontSize: 30,
    color: primaryColors.primaryBlue,
    fontWeight: 900,
    marginTop:36,
    marginBottom: 50,
    textAlign: 'center',
  },
  textEditorView: {
    width: '100%',
    borderRadius: 8,
    marginBottom: 30,
    
  },
  textEditorContainer: {
    borderRadius: 8,
    height:20
    
  },
  textEditor: {
    backgroundColor: '#E8E8E8',
    
  },
  title: {
    width: 330,
    height: 45,
    paddingLeft: 15,
    marginBottom: 16,
    backgroundColor: '#E8E8E8',
    borderRadius: 8,
    borderColor: 'red',
    color: 'black',
  },
  scrollView: {
    width: '100%',
    marginBottom: 0,
  },
});

export default UpdateCommunity;
