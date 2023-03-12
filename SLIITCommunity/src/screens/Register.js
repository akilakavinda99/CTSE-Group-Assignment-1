import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ButtonComponent from '../components/commonComponents/buttonComponent';
import TextInputComponent from '../components/commonComponents/textInputComponent';
import {toastComponent} from '../components/commonComponents/toastComponent';
import TwoText from '../components/loginRegisterComponents/twoText';
import collectionNames from '../constants/collectionNames';
import {
  requiredValidation,
  validateEmail,
  validateITNumber,
  validatePassword,
} from '../constants/validations';
import {
  addDocumentWithCustomID,
  checkForDocument,
} from '../services/firebaseServices';
import {registerationService} from '../services/registerationService';
import {AppLayout, SCREEN_HEIGHT} from '../styles/appStyles';
import {primaryColors} from '../styles/colors';

const Register = ({navigation}) => {
  const [itNumber, setItNumber] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleITNumber = itNumber => {
    setItNumber(itNumber);
  };
  const handleEmailChange = email => {
    setEmail(email);
  };
  const handlePasswordChange = password => {
    setPassword(password);
  };

  const handleNamechange = name => {
    setName(name);
  };

  const handleRegister = async () => {
    const itNumberNotAvailable = await checkForDocument(
      collectionNames.USER_COLLECTION,
      itNumber.toUpperCase(),
    );
    if (!itNumberNotAvailable) {
      const registerUser = await registerationService(email, password);
      if (!registerUser.error) {
        const data = {
          itNumber,
          name,
          email,
        };
        const customId = itNumber.toUpperCase();
        const saveToDB = await addDocumentWithCustomID(
          collectionNames.USER_COLLECTION,
          customId,
          data,
        );
        if (saveToDB) {
          toastComponent('User successfully registered');
          navigation.navigate('Login');
        } else {
          toastComponent('Error registering user');
        }
      } else {
        toastComponent(registerUser.message);
      }
    } else {
      toastComponent('IT number not available');
    }
  };

  return (
    <View style={[AppLayout.flexColumnCentered, registerStyles.mainView]}>
      <Text style={registerStyles.headingStyle}>Sign Up</Text>
      <TextInputComponent
        placeholder="IT Number"
        marginBottom={16}
        validator={validateITNumber}
        onChange={handleITNumber}
      />
      <TextInputComponent
        placeholder="Name"
        marginBottom={16}
        validator={requiredValidation}
        onChange={handleNamechange}
      />

      <TextInputComponent
        placeholder="Email"
        marginBottom={16}
        validator={validateEmail}
        onChange={handleEmailChange}
      />
      <TextInputComponent
        placeholder="Password"
        marginBottom={16}
        validator={validatePassword}
        onChange={handlePasswordChange}
      />

      <ButtonComponent buttonText="Sign Up" onPress={handleRegister} />
      <TwoText firstText="Already have an account? " secondText="Login" />
    </View>
  );
};

const registerStyles = StyleSheet.create({
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

export default Register;
