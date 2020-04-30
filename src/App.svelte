<script>
  import { onMount } from 'svelte';
  import ingredients from './ingredients.js';
  import { ingredientsStore, filteredIngredientsStore } from './stores.js';
  import IngredientsFilter from './IngredientsFilter.svelte';
  import IngredientsTable from './IngredientsTable.svelte';

  onMount(async () => {
    ingredientsStore.set(ingredients);
  });
</script>

<main>
	<h1>Stuff</h1>
  <IngredientsFilter />
	<IngredientsTable />
</main>
