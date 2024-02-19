<script>
  import { onMount } from "svelte";
  import { withDbOperation } from "../db/db";
  import { db } from "../store/store";
  import { dataStoreInstance } from "../store/dataStore";
  import MoreIcon from "../icon/moreIcon.svelte";
  import Menu from "./Menu.svelte";

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
    <th>Edit/Delete</th>
  </thead>
  <tbody>
      {#if result}
        {#each result as {count, time, date}, i}
          <tr>
            <td>{date}</td>
            <td>{time}</td>
            <td>{count}</td>
            <td><Menu /></td>
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