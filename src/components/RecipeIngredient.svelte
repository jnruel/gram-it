<script>
  import { recipe, ingredientsStore } from '../stores.js';
  import volumeConversion from '../volumeConversion.js';
  import SelectVolume from './SelectVolume.svelte';

  export let ingredient;

  let tempVolumeAmount = ingredient.volume.amount;

  let editing = false;
  let thisIngredient = JSON.parse(JSON.stringify(ingredient));

  /**
   * Remove ingredient from recipe store.
   */
  function remove() {
    recipe.update(recipe => {
      return recipe.filter(ing => ing.id !== ingredient.id);
    });

    // Get index of this ingredient in ingredients store
    const index = $ingredientsStore.map(ing => ing.id).indexOf(ingredient.id);
    $ingredientsStore[index].inRecipe = false;
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
    // update grams
    // TODO: only do if volume amount is changed?
    const gramConversionFactor = tempVolumeAmount / thisIngredient.volume.amount;
    thisIngredient.grams = (thisIngredient.grams * gramConversionFactor).toFixed(2);

    // Get index of this ingredient in recipe store
    const index = $recipe.map(ing => ing.id).indexOf(ingredient.id);

    $recipe[index].volume.amount = thisIngredient.volume.amount;
    $recipe[index].volume.type = thisIngredient.volume.type;
    $recipe[index].grams = thisIngredient.grams;

    ingredient = JSON.parse(JSON.stringify(thisIngredient));
    tempVolumeAmount = ingredient.volume.amount;
    editing = false;
  }

  /**
   * Cancel editing of ingredient, revert values.
   */
  function cancel() {
    thisIngredient = JSON.parse(JSON.stringify(ingredient));
    tempVolumeAmount = thisIngredient.volume.amount;
    editing = false;
  }

  /**
   * Handle volume amount change
   */
  function handleVolAmountChange() {
    const gramConversionFactor = tempVolumeAmount / thisIngredient.volume.amount;

    if (tempVolumeAmount > 0 && !isNaN(tempVolumeAmount)) {
      thisIngredient.grams = (thisIngredient.grams * gramConversionFactor).toFixed(2);
      thisIngredient.volume.amount = tempVolumeAmount;
    }
  }

  /**
   * Handle dispatched event from SelectVolume component
   * - Sets new component state for new selected volume type
   * - calculate conversion factor based on old and new types
   * - set new component state for volume amount
   */
  function handleVolTypeChange(event) {
    let newType = event.detail;
    let prevType = thisIngredient.volume.type

    // Convert volume amount by type
    const conversionFactor = volumeConversion[newType] / volumeConversion[prevType];

    thisIngredient.volume.amount = tempVolumeAmount * conversionFactor;
    thisIngredient.volume.type = newType;
    tempVolumeAmount = thisIngredient.volume.amount;
  }
</script>

<style>
  .recipe-ingredient {
    margin-bottom: 10px;
  }

  .input-volume-amount {
    width: 65px;
  }

  .name {
    font-weight: bold;
  }

  .info {
    display: flex;
    align-items: center;
  }

  .amount {
    margin-right: 10px;
  }

  .actions button {
    margin: 0;

  }
</style>

<div class="recipe-ingredient">
  <div class="name">{ingredient.name}</div>
  <div class="info">
    {#if !editing}
      <div class="amount">
        <span>{thisIngredient.grams} grams</span>
        <span>({thisIngredient.volume.amount} {thisIngredient.volume.type})</span>
      </div>
      <div class="actions">
        <button type="button" on:click={edit}>Edit</button>
        <button on:click={remove}>Remove</button>
      </div>
    {:else}
      <input
        class="input-volume-amount"
        min="0"
        type="number"
        step="0.01"
        bind:value={tempVolumeAmount}
        on:change={handleVolAmountChange}
      />
      <SelectVolume selectedType={thisIngredient.volume.type} on:notify={handleVolTypeChange}/>
      <div class="actions">
        <button on:click={save}>Save</button>
        <button on:click={cancel}>Cancel</button>
      </div>
    {/if}
  </div>
</div>
