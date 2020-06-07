<script>
  export let ingredient;
  import { recipe } from './stores.js';

  function saveToRecipe() {

  }
</script>

<tr>
  <td>{ingredient.name}</td>
  <td>{ingredient.volume}</td>
  <td>{ingredient.grams}</td>
  <td><button on:click={saveToRecipe}>Save</button></td>
</tr>
