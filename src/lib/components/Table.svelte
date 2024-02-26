<script>
  import { onMount } from "svelte";
  import { withDbOperation } from "../../db/db";
  import { db } from "../../store/store";
  import { dataStoreInstance } from "../../store/dataStore";
  import Menu from "./Menu.svelte";
  import { writable } from "svelte/store";

  export let itemsPerPage = 10;

  onMount(() => {
    fetchActivity();
  });

  let result;
  let currentPage = writable(1);
  let totalPages = 0;

  const fetchActivity = async () => {
    try {
      result = await withDbOperation($db, "getAll", {});
      dataStoreInstance.dispatch({ type: "bulkInsert", obj: result });

      totalPages = Math.ceil(result.length / itemsPerPage);
      console.log(totalPages);
      console.log(result);
      console.log(itemsPerPage);
    } catch (err) {
      console.log("Something went wrong - ", err);
    }
  };

  function getCurrentPageData(currentPage) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return result.slice(startIndex, endIndex);
  }

  const onNextPage = () => {
    if ($currentPage < totalPages) {
      currentPage.update((aCurrentPage) => aCurrentPage + 1);
    }
  };

  const onPrevPage = () => {
    if ($currentPage > 1) {
      currentPage.update((aCurrentPage) => aCurrentPage - 1);
    }
  };
</script>

<table>
  <thead>
    <th>Date</th>
    <th>Minutes</th>
    <th>Count</th>
    <th></th>
  </thead>
  <tbody>
    {#if result}
      <!-- {#each result as { count, time, date }, i} -->
      {#each getCurrentPageData($currentPage) as row (row.id)}
        <tr>
          <td>{row.date}</td>
          <td>{row.time}</td>
          <td>{row.count}</td>
          <td class="menu"><Menu /></td>
        </tr>
      {/each}
    {/if}
  </tbody>
</table>

<div>
  <button on:click={onPrevPage}>prev</button>
  {$currentPage} of {totalPages}
  <button on:click={onNextPage}>next</button>
</div>

<!-- introduce pagination -->

<style>
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;

    border-radius: 10px;
    outline: 1px solid gray;

    background-color: #1c1c1d;
  }

  td,
  th {
    border: 1px solid transparent;
    text-align: left;
    padding: 8px;
  }

  tr:nth-child(odd) {
    background-color: #1c1c1d;
  }

  tr:nth-child(even) {
    background-color: #1c1c1d;
  }

  table,
  th,
  td {
    border: 1px solid black;
    border-radius: 10px;
  }

  .menu {
    width: 4em;
  }
</style>
