<script>
  export let streakResult;
</script>

<div class="streak-header">
  <div>
    <span class="streak black"
      >🔥 Max Per Day Count: {streakResult.maxPRCount}</span
    >
  </div>
  <div
    style="
    gap: 1em;
    display: flex;"
  >
    <span class="streak voilet">🔥 Max Streaks: {streakResult.maxStreak}</span>
    <span class="streak">🔥 Current Streak: {streakResult.currentStreak}</span>
  </div>
</div>

<style>
  .streak {
    background-color: #4bb543;
    border: 2px solid #4bb543;
    padding: 1em;
    display: block;
  }

  .black {
    background-color: #000000;
  }

  .voilet {
    background-color: #434cb5;
  }

  .streak-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 1em;
    flex-wrap: wrap;
  }
</style>
