<script>
  import { onMount } from 'svelte';
  import ingredients from './ingredients.js';
  import { ingredientsStore, filteredIngredientsStore } from './stores.js';
  import IngredientsFilter from './IngredientsFilter.svelte';
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

<main>
	<h1>Stuff</h1>
  <Recipe />
  <IngredientsFilter />
	<IngredientsTable />
</main>
