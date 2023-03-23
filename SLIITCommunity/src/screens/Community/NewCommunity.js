import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
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
import asyncStoreKeys from '../../constants/asyncStoreKeys';
import {getDataFromAsync} from '../../constants/asyncStore';
import {primaryColors} from '../../styles/colors';
import ButtonComponent from '../../components/commonComponents/buttonComponent';
import {SelectList} from 'react-native-dropdown-select-list';
import {addDocument} from '../../services/firebaseServices';
import {toastComponent} from '../../components/commonComponents/toastComponent';

const NewCommunity = ({navigation}) => {
  const richText = useRef();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [itNumber, setItNumber] = useState();
  const [selected, setSelected] = React.useState('');

  const gohome = () => {
    navigation.navigate('Home');
  };

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

  useEffect(() => {
    async function getItnumber() {
      const itNumber = await getDataFromAsync(asyncStoreKeys.IT_NUMBER);
      setItNumber(itNumber);
    }
    getItnumber();
  }, []);

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
    const res = await addDocument('communities', {
      title,
      faculty: selected,
      description: description,
      itNumber,
      created_at: new Date().toDateString(),
    });
    toastComponent('Community added successfully!');
    navigation.navigate('Home', {screen: 'Communities'});
  };

  return (
    <>
      <View style={styles.container}>
        <SafeAreaView style={[AppLayout.flexColumnCentered, styles.mainView]}>
          <Text style={styles.headingStyle}>Create a Community</Text>
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
            setSelected={setSelected}
            placeholder={'Select a Faculty'}
            maxHeight={150}
            data={data}
            save="value"
          />
          <View style={{marginBottom: 20}}></View>
          <ScrollView contentContainerStyle={styles.scrollView}>
            {/* <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{width: '100%'}}> */}
              <View style={styles.textEditorView }>
                <RichEditor
                  ref={richText}
                  onChange={text => {
                    setDescription(text);
                  }}
                  initialHeight={250}
                  placeholder={'Enter Community Description'}
                  initialContentHTML={''}
                  editorStyle={styles.textEditor}
                  containerStyle={styles.textEditorContainer}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
              </View>
            {/* </KeyboardAvoidingView> */}

            <View style={{marginBottom: 10}}>
              <ButtonComponent backgroundColor="#242D66" buttonText="Create Community" onPress={handleSubmit} />
            </View>
            <View style={{marginBottom: 10}}> 
              <ButtonComponent backgroundColor="#58595a" buttonText="Cancel" onPress={gohome} />
            </View>
            
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
    fontWeight: 900,
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
    marginBottom: 0,
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
  image: {
    flex: 1,
    width: '100%',
    position: 'relative',
  },
});

export default NewCommunity;
