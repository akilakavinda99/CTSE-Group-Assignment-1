import React, {useEffect, useState} from 'react';
import {Text, View, Button, StyleSheet, ActivityIndicator} from 'react-native';
import {toastComponent} from '../components/commonComponents/toastComponent';
import TextInputComponent from '../components/commonComponents/textInputComponent';
import {validateEmail, validatePassword} from '../constants/validations';
import {loginService} from '../services/loginService';
import ButtonComponent from '../components/commonComponents/buttonComponent';
import TwoText from '../components/loginRegisterComponents/twoText';
import {AppLayout, SCREEN_HEIGHT} from '../styles/appStyles';
import {primaryColors} from '../styles/colors';
import {getDocumentsByField} from '../services/firebaseServices';
import collectionNames from '../constants/collectionNames';
import {getDataFromAsync, storeDataInAsync} from '../constants/asyncStore';
import asyncStoreKeys from '../constants/asyncStoreKeys';
import {
  getMessagingToken,
  updateMessagingToken,
} from '../services/notificationServices';
import * as Animatable from 'react-native-animatable';
import AppLoader from '../components/commonComponents/AppLoader';

const Login = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      const login = await loginService(email, password);
      // setLoading(false);
      if (login.error) {
        toastComponent(login.message, true);
      } else {
        console.log(login.login);
        const userDocument = await getDocumentsByField(
          collectionNames.USER_COLLECTION,
          'email',
          email,
        );
        console.log('THis is user', userDocument);
        await storeDataInAsync(
          asyncStoreKeys.IT_NUMBER,
          userDocument[0].itNumber,
        );

        const token = await getMessagingToken();
        await updateMessagingToken(token, userDocument[0].itNumber);
        setLoading(false);

        navigation.navigate('Home');
      }
    } else {
      toastComponent('Fill all the inputs');
    }
  };
  const goreg = () => {
    navigation.navigate('Register');
  };

  useEffect(() => {
    getDataFromAsync(asyncStoreKeys.IT_NUMBER).then(async itNumber => {
      if (itNumber) {
        const token = await getMessagingToken();
        await updateMessagingToken(token, itNumber);
        toastComponent('Logged successfully');
        navigation.navigate('Home');
      }
    });
  }, []);

  return (
    <View style={[AppLayout.flexColumnCentered, loginStyles.mainView]}>
      {loading ? (
        <AppLoader />
      ) : (
        <>
          <Text style={loginStyles.headingStyle}>Login</Text>

          <TextInputComponent
            placeholder="Email"
            marginBottom={20}
            validator={validateEmail}
            onChange={handleEmailChange}
          />
          <TextInputComponent
            placeholder="Password"
            validator={validatePassword}
            marginBottom={20}
            onChange={handlePasswordChange}
          />
          <ButtonComponent
            buttonText="Sign In"
            onPress={handleSubmit}
            backgroundColor={primaryColors.primaryBlue}
          />
          <TwoText
            firstText="Do not have an account?"
            secondText="Create one"
            onPress={goreg}
          />
        </>
      )}
    </View>
  );
};
const loginStyles = StyleSheet.create({
  mainView: {
    height: SCREEN_HEIGHT,
    marginLeft: 16,
    marginRight: 16,
    marginTop: SCREEN_HEIGHT / 15,
  },
  headingStyle: {
    fontSize: 30,
    color: primaryColors.primaryBlue,
    fontWeight: 600,
    marginBottom: 30,
  },
});
export default Login;
