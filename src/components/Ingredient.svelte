<script>
  import { recipe, ingredientsStore } from '../stores.js';
  export let ingredient;

  let editing = false;
  let inRecipe = false;

  function addToRecipe() {
    if (!ingredient.inRecipe) {
      recipe.update(recipe => {
        return [...recipe, JSON.parse(JSON.stringify(ingredient))];
      });

      const index = $ingredientsStore.map(ing => ing.id).indexOf(ingredient.id);
      $ingredientsStore[index].inRecipe = true;
    }
  }
</script>

<style>
  .ingredient:not(.added):hover {
    background-color: black;
    color: white;
    cursor: pointer;
  }

  .ingredient.added {
    background-color: gray;
  }

  td {
    border-bottom: 1px solid black;
    padding: 10px 5px;
  }
</style>

<tr on:click={addToRecipe} class="ingredient {ingredient.inRecipe ? 'added' : ''}">
  <td>{ingredient.name}</td>
  <td>{ingredient.volume.amount} {ingredient.volume.type}</td>
  <td>{ingredient.grams}</td>
</tr>
