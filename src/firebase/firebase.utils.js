import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyAPGcNymIRik31U24-634MVN7WL2Gc7Fns",
  authDomain: "crown-store-e6ea5.firebaseapp.com",
  databaseURL: "https://crown-store-e6ea5.firebaseio.com",
  projectId: "crown-store-e6ea5",
  storageBucket: "crown-store-e6ea5.appspot.com",
  messagingSenderId: "442680240137",
  appId: "1:442680240137:web:9f77f018ec00f6bacc30d8",
  measurementId: "G-WXKG71X01K"
};

export const createUserProfileDocument = async (userAuth, addtionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...addtionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
