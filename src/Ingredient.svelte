<script>
  export let ingredient;
  export let inRecipe = false;
  import { recipe } from './stores.js';

  function saveToRecipe() {
    recipe.update(recipe => {
      return [...recipe, ingredient];
    });
  }

  function removeFromRecipe() {
    recipe.update(recipe => {
      return recipe.filter(ing => ing.id !== ingredient.id);
    });
  }
</script>

<tr>
  <td>{ingredient.name}</td>
  <td>{ingredient.volume}</td>
  <td>{ingredient.grams}</td>
  {#if inRecipe === true}
    <td><button on:click={saveToRecipe}>Scale</button></td>
    <td><button on:click={removeFromRecipe}>Remove</button></td>
  {:else}
    <td><button on:click={saveToRecipe}>Save</button></td>
  {/if}
</tr>
