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

export const addDocument = async (collectionName, data) => {
  try {
    const addDoc = await firestore()
      .collection(collectionName)
      .add(data);
    return addDoc;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getDocuments = async (collectionName) => {
  try {
    const getDocs = await firestore()
      .collection(collectionName)
      .get();
    return getDocs.docs.map((doc) => doc.data());
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getDocument = async (collectionName, docId) => {
  try {
    const getDoc = firestore()
      .collection(collectionName)
      .doc(docId)
      .get();
    return getDoc.data();
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const getDocumentOrderBy = async (collectionName, orderBy, arrange) => {
  try {
    const getDocs = await firestore()
      .collection(collectionName)
      .orderBy(orderBy, arrange)
      .get();
    return getDocs.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getDocumentGroupBy = async (collectionName, groupBy) => {
  try {
    const getDocs = await firestore()
      .collection(collectionName)
      .groupBy(groupBy)
      .get();
    return getDocs.docs.map((doc) => doc.data());
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const updateDocument = async (collectionName, docId, data) => {
  try {
    const updateDoc = await firestore()
      .collection(collectionName)
      .doc(docId)
      .update(data);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const deleteDocument = async (collectionName, docId) => {
  try {
    const deleteDoc = await firestore()
      .collection(collectionName)
      .doc(docId)
      .delete();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getDocumentsByField = async (collectionName, fieldName, value) => {
  try {
    const getDocs = await firestore()
      .collection(collectionName)
      .where(fieldName, '==', value)
      .get();
    return getDocs.docs.map((doc) => doc.data());
  } catch (error) {
    console.log(error);
    return [];
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
