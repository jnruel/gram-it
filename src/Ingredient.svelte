<script>
  import { recipe } from './stores.js';
  export let ingredient;

  let editing = false;
  let inRecipe = false;

  function addToRecipe() {
    recipe.update(recipe => {
      return [...recipe, ingredient];
    });

    inRecipe = true;
  }
</script>

<tr>
  <td>{ingredient.name}</td>
  <td>{ingredient.volume.amount} {ingredient.volume.type}</td>
  <td>{ingredient.grams}</td>
  {#if !inRecipe}
    <td><button on:click={ addToRecipe }>Add</button></td>
  {/if}
</tr>
