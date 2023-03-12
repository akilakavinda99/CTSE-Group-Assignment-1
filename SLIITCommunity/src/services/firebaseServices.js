import firestore from '@react-native-firebase/firestore';

export const checkForDocument = async (collectionName, docId) => {
  try {
    const documentReference = firestore().collection(collectionName).doc(docId);
    const document = await documentReference.get();
    return document.exists;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const addDocumentWithCustomID = async (
  collectionName,
  customId,
  data,
) => {
  try {
    const addDoc = await firestore()
      .collection(collectionName)
      .doc(customId)
      .set(data);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
