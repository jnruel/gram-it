<script>
  import { recipe, ingredientsStore } from './stores.js';
  import SelectVolume from './SelectVolume.svelte';
  export let ingredient;
  let editing = false;

  function removeFromRecipe() {
    recipe.update(recipe => {
      return recipe.filter(ing => ing.id !== ingredient.id);
    });

    // Deep copy of ingredient
    let updatedIngredient = Object.assign({}, ingredient);
    updatedIngredient.inRecipe = false;

    // Get index of this ingredient in ingredients store
    let index = $ingredientsStore.map(ing => ing.id).indexOf(ingredient.id);

    // Deep copy of ingredients store
    let updatedIngredientsStore = [...$ingredientsStore];

    // Set updated ingredient in store
    updatedIngredientsStore[index] = updatedIngredient;
    ingredientsStore.set(updatedIngredientsStore);
  }

  function editIngredient() {
    editing = true;
  }

  function updateIngredient() {
    editing = false;
  }
</script>

<tr>
  <td>{ingredient.name}</td>
  {#if editing}
    <td>
      <input type="number" value={parseFloat(ingredient.volume.amount)}/>
      <SelectVolume selectedType={ingredient.volume.type} />
    </td>
    <td><input type="number" value={ingredient.grams}/></td>
  {:else}
    <td>{ingredient.volume.amount} {ingredient.volume.type}</td>
    <td>{ingredient.grams}</td>
  {/if}

  {#if !editing}
    <td><button on:click={editIngredient}>Edit</button></td>
    <td><button on:click={removeFromRecipe}>Remove</button></td>
  {:else}
    <td><button on:click={updateIngredient}>Save</button></td>
  {/if}
</tr>
