import React from 'react';
import {Text, View, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();
  const goToReg = () => {
    navigation.navigate('Register');
  };
  return (
    <View>
      <Text>Login</Text>
      <Button title="reg" onPress={goToReg}></Button>
    </View>
  );
};

export default Login;
