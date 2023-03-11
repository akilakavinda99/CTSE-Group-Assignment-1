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
      .add({
        name: 'Ada Lovelace',
        age: 30,
      })
      .then(() => {
        console.log('User added!');
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
