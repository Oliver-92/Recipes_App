/**
 * Service to manage Firebase authentication
 * Errors are handled by the calling hooks using centralized error formatting
 */

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import { auth } from '../config/firebase';

/**
 * Register user with email and password
 */
export const registerUser = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

/**
 * Sign in with email and password
 */
export const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

/**
 * Sign out
 */
export const logoutUser = async () => {
  await signOut(auth);
};

/**
 * Sign in with Google
 */
export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result.user;
};

/**
 * Listen for authentication changes
 */
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};
