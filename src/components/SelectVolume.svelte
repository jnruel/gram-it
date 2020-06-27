<script>
  import { createEventDispatcher } from 'svelte';

  export let selectedType;
  const dispatch = createEventDispatcher();
  const volumeTypes = [
    'cup',
    'tablespoon',
    'teaspoon'
  ];

  // function getValue() {
  //   console.log(selectedType);
  // }

  function handleChange() {
    dispatch('notify', selectedType);
  }
</script>

<select bind:value={selectedType} on:change={handleChange}>
  {#each volumeTypes as type}
    <option value={type}>{type}</option>
  {/each}
</select>
