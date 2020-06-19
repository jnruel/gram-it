<script>
  export let selectedType;

  const volumeTypes = [
    'cup',
    'tablespoon',
    'teaspoon'
  ];
</script>

<select bind:value={selectedType}>
  {#each volumeTypes as type}
    <option value={type}>{type}</option>
  {/each}
</select>
