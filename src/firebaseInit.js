import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

import firebaseConfig from "./firebaseConfig";

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebaseApp.auth();

export { auth };
export default firebaseApp.firestore();
