import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyBDCuh_lOpBak7wYMg5FtoHWhUCaWUDNPY',
  authDomain: 'heal-app-ccd03.firebaseapp.com',
  projectId: 'heal-app-ccd03',
  storageBucket: 'heal-app-ccd03.appspot.com',
  messagingSenderId: '843919956986',
  appId: '1:843919956986:android:5e20e185d5b7459e8fe243',
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const uploadImage = async (
  imagePath: RequestInfo,
  folderName: string,
  fileName: string,
) => {
  try {
    // Fetch the image as a blob
    const response = await fetch(imagePath);
    const blob = await response.blob();

    // Create a reference to the storage location
    const storageRef = ref(storage, `${folderName}/${fileName}`);

    // Upload the image
    const snapshot = await uploadBytes(storageRef, blob);

    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

export default uploadImage;
