import React from 'react';
import {Text, View, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const Login = () => {
  const navigation = useNavigation();
  const goToReg = () => {
    // navigation.navigate('Register');

    firestore()
      .collection('Users')
      .doc('ABC')
      .get()
      .then(doc => {
        if (doc.exists) {
          console.log('Document with ID ABC already exists');
        } else {
          firestore()
            .collection('Users')
            .doc('ABC')
            .set(
              {
                name: 'Ada Lovelace',
                age: 30,
              },
              {merge: false},
            )
            .then(() => {
              console.log('Data added successfully');
            })
            .catch(error => {
              console.log('Error adding data: ', error);
            });
        }
      });
  };
  return (
    <View>
      <Text>Login</Text>
      <Button title="reg" onPress={goToReg}></Button>
    </View>
  );
};

export default Login;
