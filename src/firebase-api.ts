import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';

export const getInfoFromCollection = async () => {
    const collectionRef = collection(db, 'products');
    const snapshot = await getDocs(collectionRef);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
