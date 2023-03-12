import React, {useState} from 'react';
import {Text, View, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {toastComponent} from '../components/commonComponents/toastComponent';
import TextInputComponent from '../components/commonComponents/textInputComponent';
import {validateEmail, validatePassword} from '../constants/validations';
import {loginService} from '../services/loginService';

const Login = () => {
  // const [email, setEmail] = useState('akilakavinda9@gmail.com');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleEmailChange = newEmail => {
    setEmail(newEmail);
  };

  const handlePasswordChange = newPassword => {
    setPassword(newPassword);
  };

  const handleSubmit = async () => {
    if (
      email &&
      password &&
      !validateEmail(email) &&
      !validatePassword(password)
    ) {
      const login = await loginService(email, password);
      if (login.error) {
        toastComponent(login.message, true);
      } else {
        console.log(login.login);
      }
    } else {
      toastComponent('Fill all the inputs');
    }
  };
  return (
    <View>
      <Text>Login</Text>

      <TextInputComponent
        placeholder="Password"
        validator={validatePassword}
        onChange={handlePasswordChange}
      />
      <TextInputComponent
        placeholder="Email"
        marginBottom={20}
        validator={validateEmail}
        onChange={handleEmailChange}
      />
      <Button title="reg" onPress={handleSubmit}></Button>
    </View>
  );
};

export default Login;
