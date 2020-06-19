<script>
  import { recipe } from './stores.js';
  export let ingredient;
  let editing = false;


  function removeFromRecipe() {
    recipe.update(recipe => {
      return recipe.filter(ing => ing.id !== ingredient.id);
    });
  }

  function editIngredient() {
    editing = true;
  }
</script>

<tr>
  <td>{ingredient.name}</td>
  {#if editing}
    <td><input type="number" value={parseFloat(ingredient.volume.amount)}/></td>
    <td><input type="number" value={ingredient.grams}/></td>
  {:else}
    <td>{ingredient.volume.amount} {ingredient.volume.type}</td>
    <td>{ingredient.grams}</td>
  {/if}

  {#if !editing}
    <td><button on:click={editIngredient}>Edit</button></td>
    <td><button on:click={removeFromRecipe}>Remove</button></td>
  {/if}
</tr>
