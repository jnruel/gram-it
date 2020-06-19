<script>
  import { searchTermStore } from './stores.js';
</script>

<div class="form-group">
  <label for="ingredients-filter">Filter ingredients by name</label>
  <input bind:value={$searchTermStore} id="ingredients-filter" type="text">
</div>
