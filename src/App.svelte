<script>
  import RecordView from "./lib/RecordView.svelte";
  import { db } from "./store/store";
  import { initDB } from "./db/db";
  import { onMount } from "svelte";
  import MainView from "./lib/MainView.svelte";
  import Router from "svelte-spa-router";
  import AboutView from "./lib/AboutView.svelte";

  const routes = {
    // Exact path
    "/": MainView,
    "/timer": RecordView,
    "/about": AboutView,
  };

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

<h1 style="text-align: center;" class="font-size">Jump Rope Tracker 🌌</h1>

{#if loading}
  <p>Loading...</p>
{:else if error}
  <p>Error: {error}</p>
{:else}
  <div class="flex">
    <Router {routes} />
  </div>
{/if}

<style>
  .flex {
    display: flex;
    flex-direction: column;

    height: calc(100% - 100px);
  }

  .font-size {
    font-size: 3em;

    @media screen and (max-width: 500px) {
      font-size: 2em;
    }
  }
</style>
