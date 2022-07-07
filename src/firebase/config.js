// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJ3njdlpvWj7X2N4xmEYI6X4u1h35-8Vw",
  authDomain: "photo-gallery-app-326e0.firebaseapp.com",
  projectId: "photo-gallery-app-326e0",
  storageBucket: "photo-gallery-app-326e0.appspot.com",
  messagingSenderId: "125163206002",
  appId: "1:125163206002:web:3488a64904e10e050c99eb",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const app = initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, timestamp };

export const fireBaseApp = firebase;

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const logOut = () => {
  auth
    .signOut()
    .then(() => {
      console.log("LogOUT SUCCESS");
    })
    .catch((error) => {
      console.log("LogOUT Fail " + error);
    });
};
