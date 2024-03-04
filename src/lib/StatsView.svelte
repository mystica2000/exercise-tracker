<script>
  import { onDestroy } from "svelte";
  import { dataStoreInstance } from "../store/dataStore";
  import Chart from "./components/Chart.svelte";
  import Streak from "./components/Streak.svelte";
  import { getStreakData } from "../core/stats";
  import { writable } from "svelte/store";
  import { prepareBarGraph, prepareLineGraphData } from "../core/chartutils";
  import EmptyData from "./components/EmptyData.svelte";

  const isloading = writable(true);

  let streakResult;
  let barGraphData;
  let lineGraphData;
  let result = [];

  const subscription = dataStoreInstance.subscribe((val) => {
    isloading.set(true);
    result = val.activity;

    streakResult = getStreakData(result);
    lineGraphData = prepareLineGraphData(result);
    barGraphData = prepareBarGraph(result);
    isloading.set(false);
  });

  onDestroy(subscription);
</script>

<main class="main-container">
  {#if result.length > 0}
    {#if $isloading}
      <div>loading...</div>
    {:else}
      <div class="view flex">
        <Streak {streakResult} />
        <section class="chart-section">
          <Chart {lineGraphData} {barGraphData} />
        </section>
      </div>
    {/if}
  {:else}
    <EmptyData info="No Stats to show yet" />
  {/if}
</main>

<style>
  .flex {
    display: flex;
    flex-direction: column;
  }

  .chart-section {
    display: flex;
    flex-direction: column;
    gap: 5em;
    margin-top: 1em;
  }
</style>
