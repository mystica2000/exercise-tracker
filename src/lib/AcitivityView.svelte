<script>
  import Table from "./components/Table.svelte";
</script>

<main class="main-container">
  <div class="view">
    <select name="" id="">
      <option value="">10</option>
      <option value="">20</option>
      <option value="">30</option>
      <option value="">all</option>
    </select>
    <Table itemsPerPage={10} />
  </div>
</main>
