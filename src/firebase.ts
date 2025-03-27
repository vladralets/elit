import { initializeApp } from 'firebase/app';
import { initializeFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyCXXbcH_i5RG-IfkDDYD87F1HMhUNE6Ewk',
    authDomain: 'visiodom-c08f6.firebaseapp.com',
    projectId: 'visiodom-c08f6',
    storageBucket: 'visiodom-c08f6.appspot.com', // обязательно .appspot.com
    messagingSenderId: '239324037643',
    appId: '1:239324037643:web:371b25437b38bfe1adbd0e',
};

const app = initializeApp(firebaseConfig);

// ❗️ НЕ указывай experimentalAutoDetectLongPolling: true
export const db = initializeFirestore(app, {
    experimentalForceLongPolling: true, // включаем Long Polling вместо WebChannel
    ignoreUndefinedProperties: true,
});

export const getInfoFromCollection = async () => {
    try {
        const collectionRef = collection(db, 'product');
        const snapshot = await getDocs(collectionRef);
        const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        console.log('Loaded products:', data);
        return data;
    } catch (err) {
        console.error('Firestore error:', err);
        return [];
    }
};
