import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

export const Increament = firebase.firestore.FieldValue.increment(1);

const createUID = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const len = characters.length;
  let result = "";
  for (var i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * len));
  }
  return result;
};

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
  const postID = createUID();
  const postRef = firestore.doc(`post/${postID}`);
  const snapShot = await postRef.get();
  if (!snapShot.exists) {
    const { user, content } = postDoc;
    const createAt = new Date();
    const like = 0;
    const dislike = 0;

    try {
      await postRef.set({
        user,
        content,
        createAt,
        like,
        dislike,
      });
    } catch (error) {
      console.log("error creating post", error.message);
    }
  }
  return postRef;
};

export const createCommentDocument = async (comment, post, user) => {
  const commentID = createUID();
  const commentRef = firestore.doc(`post/${post.uid}/comments/${commentID}`);
  const snapShot = await commentRef.get();
  if (!snapShot.exists) {
    const createAt = new Date();
    try {
      await commentRef.set({
        user,
        comment,
        createAt,
      });
    } catch (error) {
      console.log(error);
    }
  }
  return commentRef;
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
