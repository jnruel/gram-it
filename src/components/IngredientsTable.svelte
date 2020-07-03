<script>
  import { filteredIngredientsStore } from '../stores.js';
  import Ingredient from './Ingredient.svelte';
  import IngredientsFilter from './IngredientsFilter.svelte';
</script>

<style>
  :global(table) {
    border-collapse: collapse;
  }

  :global(th) {
    text-align: left;
  }

  .ingredients-table {
    width: 50%;
    margin-right: 25px;
  }
</style>

<div class="ingredients-table">
	<h2>Ingredients</h2>
  <IngredientsFilter />
  <table>
    <tr>
      <th>Ingredient</th>
      <th>Volume</th>
      <th>Weight (Grams)</th>
    </tr>
    {#each $filteredIngredientsStore as ingredient}
      <Ingredient ingredient={ingredient} />
    {/each}
  </table>
</div>
