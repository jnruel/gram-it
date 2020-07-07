import { writable, derived, readable } from 'svelte/store';
import ingredients from './ingredients.js';

/**
 * Initialize empty ingredients store, to be set
 * when App.svelte is mounted with data from ingredients.js
 */

let updatedIngredients = ingredients.map((ing, i) => {
  ing.id = i;
  ing.inRecipe = false;

  return ing;
});

export const ingredientsStore = writable(updatedIngredients);

export const recipe = writable([]);

/**
 * Initialize empty search term store, to be bound
 * to the value of the text input field
 */
export const searchTermStore = writable('');

/**
 * Derived from ingredients store, filtered when search term
 * store is updated
 */
export const filteredIngredientsStore = derived(
  [ingredientsStore, searchTermStore], ([$ingredientsStore, $searchTermStore]) => {
  return filterBySearchTerm($ingredientsStore, $searchTermStore);
});

function filterBySearchTerm(ingredients, searchTermStore) {
  return ingredients.filter(ing => {
    return ing.name.toLowerCase().includes(searchTermStore.toLowerCase());
  });
}


