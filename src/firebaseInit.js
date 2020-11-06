import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

import firebaseConfig from './firebaseConfig';

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebaseApp.auth();
const fstorage = firebaseApp.storage();

export { firebaseApp, auth, fstorage, firebase };
export default firebaseApp.firestore();
