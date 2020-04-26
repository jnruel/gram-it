<script>
  export let ingredients;
</script>

<div>
	<h2>Ingredients</h2>
  <table>
    <tr>
      <th>Name</th>
      <th>Volume</th>
      <th>Weight (Grams)</th>
    </tr>
    {#each ingredients as item}
      <tr>
        <td>{item.Ingredient}</td>
        <td>{item.Volume}</td>
        <td>{item.Grams}</td>
      </tr>
    {/each}
  </table>
</div>
