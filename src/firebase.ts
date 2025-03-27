import { collection, getDocs, getFirestore } from "firebase/firestore";
import { initializeApp as initFirebaseApp } from "firebase/app";

export type ProductMessage = {
    clientName: string;
    messageTitle: string;
    salesName: string;
    messageBody: string;
    prodPrice: number;
    video: string;
    prodDesc: string;
    salesId: string;
    prodName: string;
    prodId: string;
}

export type Product = ProductMessage & {
    id: string;
}




const firebaseConfig = {
    apiKey: 'AIzaSyCXXbcH_i5RG-IfkDDYD87F1HMhUNE6Ewk',
    authDomain: 'visiodom-c08f6.firebaseapp.com',
    projectId: 'visiodom-c08f6',
    storageBucket: 'visiodom-c08f6.appspot.com',
    messagingSenderId: '239324037643',
    appId: '1:239324037643:web:371b25437b38bfe1adbd0e',
};


const app = initFirebaseApp(firebaseConfig);
const db = getFirestore(app, 'visiodom-db');

export const getInfoFromCollection = async (id: string): Promise<Product[] | []> => {
    const collectionRef = collection(db, 'product');
    const snapshot = await getDocs(collectionRef);
    if (snapshot.empty) {
        console.log('No matching documents.');
        return [];
    }
    const resp: Product[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as ProductMessage),
    }));
    const filteredResp = resp.filter(
        (item) => item.id === id
    );
    return filteredResp;
};