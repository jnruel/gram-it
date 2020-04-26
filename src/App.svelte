<script>
  import ingredients from './ingredients.js';
  import IngredientsFilter from './IngredientsFilter.svelte';
	import IngredientsTable from './IngredientsTable.svelte';
</script>

<main>
	<h1>Stuff</h1>
  <IngredientsFilter ingredients={ingredients} />
	<IngredientsTable ingredients={ingredients} />

</main>
