/**
 * Service to manage Firebase authentication
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
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

/**
 * Sign in with email and password
 */
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

/**
 * Sign out
 */
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

/**
 * Sign in with Google
 */

export const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    // Re-throw error so the caller can handle it
    throw error;
  }
};

/**
 * Listen for authentication changes
 */
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};
