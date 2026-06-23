// Firebase Authentication service.
// This stores credentials securely through Firebase Auth, not in frontend state.

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export async function signupStudent({ name, age, email, password, confirmPassword }) {
  if (password !== confirmPassword) throw new Error("Passwords Do Not Match");
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  const profile = {
    uid: credential.user.uid,
    name,
    age: Number(age),
    email,
    points: 0,
    badges: [],
    completedChapters: [],
    createdAt: new Date().toISOString()
  };
  await setDoc(doc(db, "users", credential.user.uid), profile);
  return profile;
}

export async function loginStudent({ email, password }) {
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const snapshot = await getDoc(doc(db, "users", credential.user.uid));
    return snapshot.data();
  } catch (error) {
    if (error.code === "auth/user-not-found" || error.code === "auth/invalid-credential") {
      throw new Error("User Not Found");
    }
    if (error.code === "auth/wrong-password") {
      throw new Error("Incorrect Password");
    }
    throw error;
  }
}
