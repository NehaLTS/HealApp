import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';


const uploadImage = async (imagePath: string, folderName: string, fileName: string) => {
    const firebaseConfig = {
        apiKey: 'AIzaSyBDCuh_lOpBak7wYMg5FtoHWhUCaWUDNPY',
        authDomain: 'heal-app-ccd03.firebaseapp.com',
        projectId: 'heal-app-ccd03',
        storageBucket: 'heal-app-ccd03.appspot.com',
        messagingSenderId: '843919956986',
        appId: '1:843919956986:android:5e20e185d5b7459e8fe243',
    };

    const app = initializeApp(firebaseConfig);
    try {
        const blob = await fetch(imagePath).then((response) => response.blob());
        const storage = getStorage(app);
        console.log('storage', storage)
        const storageRef = ref(storage, `${folderName}/${fileName}`);
        console.log('storageRef', storageRef)

        const snapshot = await uploadBytes(storageRef, blob);
        console.log('snapshot', snapshot)

        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log('downloadURL', downloadURL)

        // blob.close();

        return downloadURL;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};
export default uploadImage;