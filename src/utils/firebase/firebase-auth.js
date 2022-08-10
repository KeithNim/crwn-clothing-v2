import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyABe5TjJvulKMKsPMlvvIBhLOJU1WJS3gs",
  authDomain: "ecomapp-f0895.firebaseapp.com",
  databaseURL: "https://ecomapp-f0895-default-rtdb.firebaseio.com",
  projectId: "ecomapp-f0895",
  storageBucket: "ecomapp-f0895.appspot.com",
  messagingSenderId: "158715591183",
  appId: "1:158715591183:web:4439fe00301ea3736fc17a",
  measurementId: "G-PX63QE5J0S",
};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};
