<script>
  import { onMount } from "svelte";
  import { withDbOperation } from "../../db/db";
  import { db } from "../../store/store";
  import { dataStoreInstance } from "../../store/dataStore";
  import Menu from "./Menu.svelte";
  import { writable } from "svelte/store";
  import SortIcon from "../../icon/sortIcon.svelte";

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

  const applySortByCount = () => {
    result.sort((a, b) => a.id - b.id);
    currentPage.set(1);
  };

  const applySortByDate = () => {
    result.sort(compareDates);
    currentPage.set(1);
  };

  // Function to compare dates for sorting
  const compareDates = (dateString1, dateString2) => {
    const date1 = new Date(dateString1.date);
    const date2 = new Date(dateString2.date);

    // Compare the dates
    if (date1 < date2) {
      return -1;
    } else if (date1 > date2) {
      return 1;
    } else {
      return 0;
    }
  };
</script>

<table>
  <thead>
    <th
      ><span class="sort"
        >Date<button on:click={applySortByDate}><SortIcon /></button></span
      ></th
    >
    <th>Minutes</th>
    <th
      ><span class="sort"
        >Count <button on:click={applySortByCount}><SortIcon /></button></span
      ></th
    >
    <th></th>
  </thead>
  <tbody>
    {#if result}
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

  .sort {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .menu {
    width: 4em;
  }
</style>
