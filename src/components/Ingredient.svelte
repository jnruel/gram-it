<script>
  import { recipe, ingredientsStore } from '../stores.js';
  export let ingredient;

  let editing = false;
  let inRecipe = false;

  function addToRecipe() {
    recipe.update(recipe => {
      return [...recipe, ingredient];
    });

    // Deep copy of ingredient
    let updatedIngredient = Object.assign({}, ingredient);
    updatedIngredient.inRecipe = true;

    // Get index of this ingredient in ingredients store
    const index = $ingredientsStore.map(ing => ing.id).indexOf(ingredient.id);

    // Deep copy of ingredients store
    let updatedIngredientsStore = [...$ingredientsStore];

    // Set updated ingredient in store
    updatedIngredientsStore[index] = updatedIngredient;
    ingredientsStore.set(updatedIngredientsStore);
  }
</script>

<tr>
  <td>{ingredient.name}</td>
  <td>{ingredient.volume.amount} {ingredient.volume.type}</td>
  <td>{ingredient.grams}</td>
  {#if !ingredient.inRecipe}
    <td><button on:click={ addToRecipe }>Add</button></td>
  {/if}
</tr>
