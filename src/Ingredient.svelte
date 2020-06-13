<script>
  import { recipe } from './stores.js';
  export let ingredient;
  export let inRecipe = false;

  let editing = false;

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

  function editIngredient() {
    editing = true;
    // console.log(parse(ingredient.volume));
  }
</script>

<tr>
  <td>{ingredient.name}</td>
  {#if editing}
    <td><input type="number" value={parseFloat(ingredient.volume.amount)}/></td>
    <td><input type="number" value={ingredient.grams}/></td>
  {:else}
    <td>{ingredient.volume.amount}</td>
    <td>{ingredient.grams}</td>
  {/if}

  {#if inRecipe}
    <td><button on:click={editIngredient}>Edit</button></td>
    <td><button on:click={removeFromRecipe}>Remove</button></td>
  {:else}
    <td><button on:click={saveToRecipe}>Save</button></td>
  {/if}
</tr>
