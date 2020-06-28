<script>
  import { recipe, ingredientsStore } from '../stores.js';
  import volumeConversion from '../volumeConversion.js';
  import SelectVolume from './SelectVolume.svelte';

  export let ingredient;

  let volumeType = ingredient.volume.type;
  let volumeAmount = ingredient.volume.amount;
  let baseVolumeAmount = volumeAmount;
  let grams = ingredient.grams;
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

    // update grams
    // TODO: only do if volume amount is changed?
    let gramConversionFactor = volumeAmount / baseVolumeAmount;
    grams = (ingredient.grams * gramConversionFactor).toFixed(2);

    // Deep copy of edited ingredient:
    let updatedIngredient = Object.assign({}, ingredient);

    // Update values:
    updatedIngredient.volume.amount = volumeAmount;
    updatedIngredient.volume.type = volumeType;
    updatedIngredient.grams = grams;

    // Get index of this ingredient in recipe store
    const index = $recipe.map(ing => ing.id).indexOf(ingredient.id);

    // Deep copy of recipe store:
    let updatedRecipe = [...$recipe];

    // Set updated ingredient in new recipe:
    updatedRecipe[index] = updatedIngredient;

    // Update recipe state in store:
    recipe.set(updatedRecipe);

    // Set new base volume amount after making other updates
    baseVolumeAmount = volumeAmount;
  }

  /**
   * Cancel editing of ingredient, revert values.
   */
  function cancel() {
    volumeAmount = ingredient.volume.amount;
    baseVolumeAmount = volumeAmount;
    volumeType = ingredient.volume.type;
    grams = ingredient.grams;
    editing = false;
  }

  // Not sure if this will be needed
  function handleVolAmountChange() {
    // baseVolumeAmount = volumeAmount;
  }

  /**
   * Handle dispatched event from SelectVolume component
   * - Sets new component state for new selected volume type
   * - calculate conversion factor based on old and new types
   * - set new component state for volume amount
   */
  function handleVolTypeChange(event) {
    volumeType = event.detail;

    let currentType = ingredient.volume.type;
    let newType = volumeType;

    // Convert volume amount by type
    const conversionFactor = volumeConversion[volumeType] / volumeConversion[ingredient.volume.type];
    volumeAmount = volumeAmount * conversionFactor;
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
      <input
        class="input-volume-amount"
        min="0"
        type="number"
        bind:value={volumeAmount}
        on:change={handleVolAmountChange}
      />
      <SelectVolume selectedType={volumeType} on:notify={handleVolTypeChange}/>
    </td>
    <!-- Is there a use-case for allowing gram value to be edited directly? -->
    <!-- <td><input type="number" value={ingredient.grams}/></td> -->
  {:else}
    <td>{volumeAmount} {volumeType}</td>
  {/if}

  <td>{grams}</td>

  {#if !editing}
    <td><button on:click={edit}>Edit</button></td>
    <td><button on:click={removeFromRecipe}>Remove</button></td>
  {:else}
    <td><button on:click={save}>Save</button></td>
    <td><button on:click={cancel}>Cancel</button></td>
  {/if}
</tr>
