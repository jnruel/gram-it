<script>
  import { filteredIngredientsStore } from './stores.js';
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
      <tr>
        <td>{ingredient.Ingredient}</td>
        <td>{ingredient.Volume}</td>
        <td>{ingredient.Grams}</td>
      </tr>
    {/each}
  </table>
</div>
