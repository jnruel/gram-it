<script>
  import { recipe } from '../stores.js';
  import RecipeIngredient from './RecipeIngredient.svelte';
</script>

<style>
  .recipe {
    width: 50%;
  }
</style>

<div class="recipe">
	<h2>Saved Ingredients</h2>
  <div class="recipe-ingredients">
    {#each $recipe as ingredient}
      <RecipeIngredient ingredient={ingredient} />
    {/each}
  </div>
</div>
