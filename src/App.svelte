<script>
  import { onMount } from 'svelte';
  import ingredients from './ingredients.js';
  import { ingredientsStore, filteredIngredientsStore } from './stores.js';
  import IngredientsTable from './components/IngredientsTable.svelte';
  import Recipe from './components/Recipe.svelte';

  onMount(async () => {
    // Add unique ID to each ingredient object
    let updatedIngredients = ingredients.map((ing, i) => {
      ing.id = i;
      ing.inRecipe = false;

      return ing;
    });

    ingredientsStore.set(updatedIngredients);
  });
</script>

<style>
  .content {
    display: flex;
  }
</style>

<main>
	<h1>Gram-It</h1>
  <h2>Ingredient volume to weight conversion</h2>
  <div class="content">
    <IngredientsTable />
    <Recipe />
  </div>
</main>
