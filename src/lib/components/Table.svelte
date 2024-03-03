<script>
  import { onDestroy, onMount } from "svelte";
  import { withDbOperation } from "../../db/db";
  import { db } from "../../store/store";
  import { dataStoreInstance } from "../../store/dataStore";
  import { writable } from "svelte/store";
  import SortIcon from "../../icon/sortIcon.svelte";
  import { compareDates } from "../../date-util";
  import DeleteIcon from "../../icon/deleteIcon.svelte";
  import Delete from "../dialogs/deleteDialog.svelte";

  let itemsPerPage = writable("10");

  let id = 0;

  onMount(() => {
    fetchActivity();
  });

  let unique = {}; // every {} is unique, {} === {} evaluates to false

  let result;
  let currentPage = 1;
  let totalPages = 0;

  let sortOrderForDate = "desc";
  let sortOrderForCount = "desc";

  const fetchActivity = async () => {
    try {
      result = await withDbOperation($db, "getAll", {});
      dataStoreInstance.dispatch({ type: "bulkInsert", obj: result });

      totalPages = Math.ceil(result.length / parseInt($itemsPerPage));
    } catch (err) {
      console.log("Something went wrong - ", err);
    }
  };

  function getCurrentPageData(currentPage) {
    if (parseInt($itemsPerPage) == 0) {
      return result;
    }

    const startIndex = (currentPage - 1) * parseInt($itemsPerPage);
    const endIndex = startIndex + parseInt($itemsPerPage);
    return result.slice(startIndex, endIndex);
  }

  const onNextPage = () => {
    if (currentPage < totalPages) {
      currentPage = currentPage + 1;
    }
  };

  const onPrevPage = () => {
    if (currentPage > 1) {
      currentPage = currentPage - 1;
    }
  };

  const applySortByCount = () => {
    sortOrderForCount = sortOrderForCount == "asc" ? "desc" : "asc";
    result.sort((a, b) =>
      sortOrderForCount == "asc" ? a.count - b.count : b.count - a.count
    );
    currentPage = 1;
    restart();
  };

  const applySortByDate = () => {
    sortOrderForDate = sortOrderForDate == "asc" ? "desc" : "asc";
    result.sort((a, b) => compareDates(a, b, sortOrderForDate));
    currentPage = 1;
    restart();
  };

  const restart = () => {
    unique = {};
  };

  itemsPerPage.subscribe(() => {
    currentPage = 1;
    totalPages = Math.ceil(result?.length / parseInt($itemsPerPage));

    restart();
  });

  const subscription = dataStoreInstance.subscribe((res) => {
    if (res?.activity) {
      result = [...res.activity];
      restart();
    }
    //totalPages = Math.ceil(result.length / parseInt($itemsPerPage));
  });

  const handleDeleteRow = async (rowId) => {
    // confirm delete dialog
    const isDontshowEnabled = localStorage.getItem("donotShow") || "false";

    if (isDontshowEnabled == "true") {
      await withDbOperation($db, "delete", rowId).then(() => {
        dataStoreInstance.dispatch({ type: "delete", obj: rowId });
      });
    } else {
      id = rowId;
      const tableRow = document.getElementById("log-" + rowId);
      tableRow.classList.toggle("blink");

      let dialog = document.getElementById("confirmation-dialog");
      dialog["showModal"]();
    }
  };

  onDestroy(subscription);
</script>

<div class="right-align">
  <label for="activity">Activity per page</label>
  <select name="" id="activity" bind:value={$itemsPerPage}>
    <option value="10">10</option>
    <option value="20">20</option>
    <option value="30">30</option>
    <option value="0">all</option>
  </select>
</div>

<table>
  <thead>
    <th
      ><span class="sort"
        >Date<button on:click={applySortByDate} class="btn-primary"
          ><SortIcon /></button
        ></span
      ></th
    >
    <th>Minutes</th>
    <th
      ><span class="sort"
        >Count <button on:click={applySortByCount} class="btn-primary"
          ><SortIcon /></button
        ></span
      ></th
    >
    <th></th>
  </thead>
  <tbody>
    {#if result}
      {#key unique}
        {#each getCurrentPageData(currentPage) as row (row.id)}
          <tr id={`log-${row.id}`}>
            <td>{row.date}</td>
            <td>{row.time}</td>
            <td>{row.count}</td>
            <td class="menu">
              <button
                class="btn-danger"
                on:click={() => handleDeleteRow(row.id)}
              >
                <DeleteIcon />
              </button>
            </td>
          </tr>
        {/each}
      {/key}
    {/if}
  </tbody>
</table>

{#if parseInt($itemsPerPage) > 0}
  <div class="btn-pagination-parent">
    <span class="btn-pagination">
      <button on:click={onPrevPage} disabled={currentPage == 1}>prev</button>
      {currentPage} of {totalPages}
      <button on:click={onNextPage} disabled={currentPage == totalPages}
        >next</button
      >
    </span>
  </div>
{/if}

<Delete {id} />

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

  :global(.blink) {
    animation: blinks 2s linear infinite;
    background-color: yellow; /* Set the background color for the blinking element */
  }

  @keyframes blinks {
    0% {
      opacity: 0;
      background-color: yellow;
    }
    50% {
      opacity: 0.5;
      background-color: red;
    }
    100% {
      opacity: 1;
      background-color: blue;
    }
  }

  .right-align {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 0.3em;
    padding: 0.4em;
    font-weight: 500;
  }

  .btn-pagination-parent {
    margin: 0.5em;
  }

  .btn-pagination {
    display: flex;
    flex-direction: row;
    gap: 1em;
    border: 1px solid white;
    padding: 0.4em;
    width: fit-content;
  }
</style>
