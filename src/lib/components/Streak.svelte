<script>
  import { onDestroy, onMount } from "svelte";
  import { getStreakData } from "../../core/stats";
  import { dataStoreInstance } from "../../store/dataStore";

  let result;

  const subscription = dataStoreInstance.subscribe((val) => {
    const activity = val.activity;

    result = getStreakData(activity);
  });

  onDestroy(subscription);
</script>

<div class="streak-header">
  <div>
    <span class="streak">🔥 Max PR Count: {result?.maxPRCount}</span>
  </div>
  <div
    style="
    gap: 1em;
    display: flex;"
  >
    <span class="streak">🔥 Max Streaks: {result?.maxStreak}</span>
    <span class="streak">🔥 Current Streak: {result?.currentStreak}</span>
  </div>
</div>

<style>
  .streak {
    background-color: #4bb543;
    border: 2px solid #4bb543;
    padding: 1em;
    display: block;
  }

  .streak-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 1em;
    flex-wrap: wrap;
  }
</style>
