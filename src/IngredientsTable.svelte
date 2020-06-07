<script>
  import { filteredIngredientsStore } from './stores.js';
  import Ingredient from './Ingredient.svelte';
</script>

<div>
	<h2>Ingredients</h2>
  <table>
    <tr>
      <th>Name</th>
      <th>Volume</th>
      <th>Weight (Grams)</th>
    </tr>
    {#each $filteredIngredientsStore as ingredient}
      <Ingredient ingredient={ingredient} />
    {/each}
  </table>
</div>
