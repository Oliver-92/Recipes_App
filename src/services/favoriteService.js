import {
  collection,
  addDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  doc,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { COLLECTIONS } from '../constants';

/**
 * Service to manage favorites in Firestore
 */

/**
 * Add recipe to favorites
 * Checks if the favorite already exists before adding
 */
export const addFavorite = async (userId, recipe) => {
  try {
    // Check if favorite already exists
    const q = query(
      collection(db, COLLECTIONS.FAVORITES),
      where('userId', '==', userId),
      where('idMeal', '==', recipe.idMeal)
    );
    const querySnapshot = await getDocs(q);

    // If favorite already exists, return existing document ID
    if (!querySnapshot.empty) {
      console.log('Favorite already exists for this user');
      return querySnapshot.docs[0].id;
    }

    // Add new favorite if it doesn't exist
    const docRef = await addDoc(collection(db, COLLECTIONS.FAVORITES), {
      userId,
      idMeal: recipe.idMeal,
      strMeal: recipe.strMeal,
      strMealThumb: recipe.strMealThumb,
      createdAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding favorite:', error);
    throw error;
  }
};

/**
 * Get user's favorites
 */
export const getUserFavorites = async (userId) => {
  try {
    const q = query(
      collection(db, COLLECTIONS.FAVORITES),
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    const favorites = [];
    querySnapshot.forEach((doc) => {
      favorites.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return favorites;
  } catch (error) {
    console.error('Error getting favorites:', error);
    throw error;
  }
};

/**
 * Remove favorite
 */
export const removeFavorite = async (docId) => {
  try {
    await deleteDoc(doc(db, COLLECTIONS.FAVORITES, docId));
  } catch (error) {
    console.error('Error removing favorite:', error);
    throw error;
  }
};

/**
 * Check if a recipe is favorite
 */
export const isFavoriteMeal = async (userId, mealId) => {
  try {
    const q = query(
      collection(db, COLLECTIONS.FAVORITES),
      where('userId', '==', userId),
      where('idMeal', '==', mealId)
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error('Error checking favorite:', error);
    throw error;
  }
};
