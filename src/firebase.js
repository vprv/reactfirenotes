import firebase from "firebase";
import "firebase/auth";
import "firebase/app";
import "firebase/storage"

/*
  You have to create file firebaseConfig.js
  with code below

  const firebaseConfig = {... };
  export default firebaseConfig;
* */
import firebaseConfig from "./firebaseConfig";

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const functions = firebase.app().functions('us-central1');
export const storage = firebase.app().storage();
