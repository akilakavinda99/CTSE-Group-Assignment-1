import auth from '@react-native-firebase/auth';

export const loginService = async (email, password) => {
  try {
    const login = await auth().signInWithEmailAndPassword(email, password);
    return {
      error: false,
      login,
    };
  } catch (error) {
    if (error.code === 'auth/invalid-email') {
      return {
        error: true,
        message: 'Invalid Email',
      };
    } else if (error.code === 'auth/user-not-found') {
      return {
        error: true,
        message: 'No user found',
      };
    } else if (error.code === 'auth/wrong-password') {
      return {
        error: true,
        message: 'Wrong password',
      };
    } else {
      return {
        error: true,
        message: 'Error occcured',
      };
    }
  }
};
