<script>
  import { onMount } from "svelte";
  import { withDbOperation } from "../db/db";
  import { db } from "../store/store";
  import { dataStoreInstance } from "../store/dataStore";

  onMount(()=> {
    fetchActivity();
  })

  let result;

  const fetchActivity = async () => {
    try {
      result = await withDbOperation($db, "getAll", {});
      dataStoreInstance.dispatch({type: 'bulkInsert', obj: result});
    } catch(err) {
      console.log("Something went wrong - ",err);
    }
  }

</script>

<table>
  <thead>
    <th>Date</th>
    <th>Minutes</th>
    <th>Count</th>
    <th>Edit</th>
    <th>Delete</th>
  </thead>
  <tbody>
      {#if result}
        {#each result as {count, time, date}, i}
          <tr>
            <td>{date}</td>
            <td>{time}</td>
            <td>{count}</td>
            <td>Edit</td>
            <td>Delete</td>
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
}

td, th {
  border: 1px solid #48e536;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #ff8080;
}
</style>