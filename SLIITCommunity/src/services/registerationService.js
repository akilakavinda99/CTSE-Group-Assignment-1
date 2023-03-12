import auth from '@react-native-firebase/auth';

export const registerationService = async (email, password) => {
  try {
    const userRegister = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    return {
      error: false,
      user: userRegister,
    };
  } catch (error) {
    if (error.code === 'auth/invalid-email') {
      return {
        error: true,
        message: 'Invalid email address',
      };
    } else if (error.code === 'auth/weak-password') {
      return {
        error: true,
        message: 'Password too weak',
      };
    } else if (error.code === 'auth/email-already-in-use') {
      return {
        error: true,
        message: 'Email already in use',
      };
    } else {
      return {
        error: true,
        message: 'Error occured',
      };
    }
  }
};
