<script>
  import { searchTermStore } from '../stores.js';
</script>

<div class="form-group">
  <label for="ingredients-filter">Search ingredients</label>
  <input
    bind:value={$searchTermStore}
    id="ingredients-filter"
    type="text"
    placeholder="flour"
  >
</div>
