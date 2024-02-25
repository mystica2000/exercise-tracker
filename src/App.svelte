<script>
  import RecordView from "./lib/RecordView.svelte";
  import { View } from "./constant";
  import { db, view } from "./store/store";
  import { initDB } from "./db/db";
  import { onMount } from "svelte";
  import MainView from "./lib/MainView.svelte";

  let loading = true;
  let error = null;

  onMount(() => {
    initializeDB();
  });

  const initializeDB = async () => {
    try {
      const result = await initDB();
      loading = false;
      db.set(result);
    } catch (err) {
      loading = false;
      error = err;
    }
  };
</script>

<h1 style="text-align: center; font-size:3em">Jump Rope Tracker ✍🏼</h1>

{#if loading}
  <p>Loading...</p>
{:else if error}
  <p>Error: {error}</p>
{:else}
  <div class="flex">
    {#if $view == View.MAIN_VIEW}
      <MainView />
    {:else}
      <RecordView />
    {/if}
  </div>
{/if}

<style>
  .flex {
    display: flex;
    flex-direction: column;

    height: calc(100% - 100px);
  }
</style>
