import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyB4b5NVJF3LdJuKDApP6BTNYUBCkCjMsHQ",
  authDomain: "twit-world.firebaseapp.com",
  projectId: "twit-world",
  storageBucket: "twit-world.appspot.com",
  messagingSenderId: "719087174754",
  appId: "1:719087174754:web:630c9c4a800b2fcefa3d3b",
  measurementId: "G-JHHBKNKFN0",
};

export const createPostDocument = async (postDoc) => {
  const postRef = firestore.doc(`post/${postDoc.uid}`);
  const snapShot = await postRef.get();
  if (!snapShot.exists) {
    const { user, content } = postDoc;
    const createAt = new Date();

    try {
      await postRef.set({
        user,
        content,
        createAt,
      });
    } catch (error) {
      console.log("error creating post", error.message);
    }
  }
  return postRef;
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`user/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createAt,
        ...additionalData,
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
