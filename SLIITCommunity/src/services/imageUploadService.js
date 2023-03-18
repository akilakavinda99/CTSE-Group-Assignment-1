import storage from '@react-native-firebase/storage';

export const imageUploadService = async (imageName, imageUri) => {
  try {
    await storage()
      .ref(imageName)
      .putFile(imageUri)
      .then(snapshot => {
        console.log(snapshot);
      })
      .catch(e => console.log('uploading image error => ', e));

    let imageRef = await storage().ref('/' + imageName);
    const url = await imageRef
      .getDownloadURL()
      .then(url => {
        //from url you can fetched the uploaded image easily
        return url;
      })
      .catch(e => console.log('getting downloadURL of image error => ', e));

    return url;
  } catch (error) {
    return false;
  }
};
