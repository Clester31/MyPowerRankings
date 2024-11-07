// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential
} from "firebase/auth";
import { getFirestore, collection, doc, setDoc, getDoc, getDocs, deleteDoc } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-SiUpbjyoQtA5crdtd2OyfS7uFEMg1aM",
  authDomain: "my-power-rankings.firebaseapp.com",
  projectId: "my-power-rankings",
  storageBucket: "my-power-rankings.appspot.com",
  messagingSenderId: "671767526078",
  appId: "1:671767526078:web:b7723a06bf6126e609bcef",
  measurementId: "G-WKSF81KJ60"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

type Team = {
  id: string;
  full_name: string;
  abrv: string;
  img: string;
  bg: string;
  selected: boolean;
};

// Function to create a new user account with email and password
export const createAccountWithEmail = async (email: string, password: string): Promise<UserCredential> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      createdAt: new Date()
    });

    return userCredential;
  } catch (error) {
    console.error("Error creating account:", error);
    throw error;
  }
};

// Function to sign in a user with email and password
export const signInWithEmail = async (email: string, password: string): Promise<UserCredential> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};

// Function to sign up or sign in with Google
export const signInWithGoogle = async (): Promise<UserCredential> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      await setDoc(userRef, {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        createdAt: new Date(),
      });
    }

    return result;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

// Function to sign out a user
export const logOut = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};
// methods for adding users lists to their account
export const addUserList = async (listData: Team[], listName: string) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not signed in");

  try {
    const listRef = doc(collection(db, "users", user.uid, "lists"));
    const listObject = {
      listId: uuidv4(),
      listName: listName,
      teams: listData,
      createdAt: new Date(),
    };

    await setDoc(listRef, listObject)
  } catch (error) {
    console.error("error adding list", error);
    throw error;
  }
}

export const deleteUserList = async (listId: string) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not signed in");

  try {
    const listRef = doc(db, "users", user.uid, "lists", listId);
    if (!listRef) throw new Error("List not found");
    await deleteDoc(listRef);
  } catch (error) {
    console.error("error deleting list", error);
    throw error;
  }
}

export const fetchUserLists = async (userId: string) => {
  try {
    const listRef = collection(db, "users", userId, "lists");
    const listSnapshot = await getDocs(listRef);
    const listData = listSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    console.log("getting list data...", listData);
    return listData;
  } catch (error) {
    console.error("error fetching list", error);
    throw error;
  }
}

export { auth, db };
