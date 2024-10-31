import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDjTqfVQSxCm6ZnsZp-VFGjCEG-IxGXyM8",
    authDomain: "exemplos-1ffa4.firebaseapp.com",
    projectId: "exemplos-1ffa4",
    storageBucket: "exemplos-1ffa4.appspot.com",
    messagingSenderId: "1054147196496",
    appId: "1:1054147196496:web:7e21a8efb0378ee72fc355"
};

const auth = getAuth();
const db = getFirestore();

export default { firebaseConfig, auth, db };
