<script>
  import { onMount } from 'svelte';
  import ingredients from './ingredients.js';
  import { ingredientsStore, filteredIngredientsStore } from './stores.js';
  import IngredientsTable from './IngredientsTable.svelte';
  import Recipe from './Recipe.svelte';

  onMount(async () => {
    // Add unique ID to each ingredient object
    let updatedIngredients = ingredients.map((ing, i) => {
      ing.id = i;
      return ing;
    });

    ingredientsStore.set(updatedIngredients);
  });
</script>

<style>
  :global(th) {
    text-align: left;
  }
  .content {
    display: flex;
  }
</style>

<main>
	<h1>Stuff</h1>
  <div class="content">
    <IngredientsTable />
    <Recipe />
  </div>
</main>
