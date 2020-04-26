<script>
  import autoComplete from '@tarekraafat/autocomplete.js';
  import { onMount } from 'svelte';

  export let ingredients;
  let inputElement;

  let ac;

  onMount(() => {
    ac = new autoComplete({
      data: {
        src: ingredients,
        key: ['Ingredient']
      },
      sort: (a, b) => {
        if (a.match < b.match) return -1;
        if (a.match > b.match) return 1;
        return 0;
      },
      placeHolder: "Ingredients",
      selector: "#autoComplete",
      resultsList: {
        render: true,
        container: source => {
          source.setAttribute("id", "autoComplete_list");
        },
        destination: document.querySelector("#autoComplete"),
        position: "afterend",
        element: "ul"
      },
      resultItem: {
        content: (data, source) => {
          source.innerHTML = data.match;
        },
        element: "li"
      }
    });
	});
</script>

<input id="autoComplete" bind:this={inputElement} type="text">
<div></div>
