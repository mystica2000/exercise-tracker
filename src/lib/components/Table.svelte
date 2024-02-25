<script>
  import { onMount } from "svelte";
  import { withDbOperation } from "../../db/db";
  import { db } from "../../store/store";
  import { dataStoreInstance } from "../../store/dataStore";
  import Menu from "./Menu.svelte";

  onMount(() => {
    fetchActivity();
  });

  let result;

  const fetchActivity = async () => {
    try {
      result = await withDbOperation($db, "getAll", {});
      dataStoreInstance.dispatch({ type: "bulkInsert", obj: result });
    } catch (err) {
      console.log("Something went wrong - ", err);
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
      {#each result as { count, time, date }, i}
        <tr>
          <td>{date}</td>
          <td>{time}</td>
          <td>{count}</td>
          <td class="menu"><Menu /></td>
        </tr>
      {/each}
    {/if}
  </tbody>
</table>

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
