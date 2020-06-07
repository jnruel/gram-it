<script>
  import Ingredient from './Ingredient.svelte';
  import { recipe } from './stores.js';
</script>

<style>
  .recipe {
    width: 50%;
  }
</style>

<div class="recipe">
	<h2>Recipe</h2>
  <table>
    <tr>
      <th>Name</th>
      <th>Volume</th>
      <th>Weight (Grams)</th>
    </tr>
    {#each $recipe as ingredient}
      <Ingredient ingredient={ingredient} inRecipe={true} />
    {/each}
  </table>
</div>
