<script>
  import { recipe, ingredientsStore } from '../stores.js';
  import volumeConversion from '../volumeConversion.js';
  import SelectVolume from './SelectVolume.svelte';

  export let ingredient;

  let volumeType = ingredient.volume.type;
  let volumeAmount = ingredient.volume.amount;

  let editing = false;

  /**
   * Remove ingredient from recipe store.
   */
  function removeFromRecipe() {
    recipe.update(recipe => {
      return recipe.filter(ing => ing.id !== ingredient.id);
    });

    // Deep copy of ingredient
    let updatedIngredient = Object.assign({}, ingredient);
    updatedIngredient.inRecipe = false;

    // Get index of this ingredient in ingredients store
    const index = $ingredientsStore.map(ing => ing.id).indexOf(ingredient.id);

    // Deep copy of ingredients store
    let updatedIngredientsStore = [...$ingredientsStore];

    // Set updated ingredient in store
    updatedIngredientsStore[index] = updatedIngredient;
    ingredientsStore.set(updatedIngredientsStore);
  }

  /**
   * Start editing ingredient.
   */
  function edit() {
    editing = true;
  }

  /**
   * Update recipe store's ingredient with new values.
   */
  function save() {
    editing = false;

    let updatedIngredient = Object.assign({}, ingredient);
    updatedIngredient.volume.amount = volumeAmount;
    updatedIngredient.volume.type = volumeType;

    // Get index of this ingredient in recipe store
    const index = $recipe.map(ing => ing.id).indexOf(ingredient.id);

    // Deep copy of recipe store
    let updatedRecipe = [...$recipe];

    updatedRecipe[index] = updatedIngredient;

    recipe.set(updatedRecipe);
  }

  /**
   * Cancel editing of ingredient, revert values.
   */
  function cancel() {
    volumeAmount = ingredient.volume.amount;
    volumeType = ingredient.volume.type;
    editing = false;
  }

  /**
   * Handle dispatched event from SelectVolume component
   * - Sets new component state for new selected volume type
   * - calculate conversion factor based on old and new types
   * - set new component state for volume amount
   */
  function handleVolTypeChange(event) {
    volumeType = event.detail;

    const conversionFactor = volumeConversion[volumeType] / volumeConversion[ingredient.volume.type];

    volumeAmount = ingredient.volume.amount * conversionFactor;
  }
</script>

<style>
  .input-volume-amount {
    width: 65px;
  }
</style>

<tr>
  <td>{ingredient.name}</td>
  {#if editing}
    <td>
      <input class="input-volume-amount" type="number" bind:value={volumeAmount}/>
      <SelectVolume selectedType={volumeType} on:notify={handleVolTypeChange}/>
    </td>
    <!-- Is there a use-case for allowing gram value to be edited directly? -->
    <!-- <td><input type="number" value={ingredient.grams}/></td> -->
  {:else}
    <td>{volumeAmount} {volumeType}</td>
  {/if}

  <td>{ingredient.grams}</td>

  {#if !editing}
    <td><button on:click={edit}>Edit</button></td>
    <td><button on:click={removeFromRecipe}>Remove</button></td>
  {:else}
    <td><button on:click={save}>Save</button></td>
    <td><button on:click={cancel}>Cancel</button></td>
  {/if}
</tr>
