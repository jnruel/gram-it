<script>
  import IngredientsTable from './components/IngredientsTable.svelte';
  import Recipe from './components/Recipe.svelte';
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
