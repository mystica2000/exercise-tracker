<script>
  import { dataStoreInstance } from "../../store/dataStore";

  dataStoreInstance.subscribe((val) => {
    const activity = val;
  });
</script>

<div class="streak-header">
  <div>
    <span class="streak">🔥 Max PR Count: 1</span>
  </div>
  <div>
    <span class="streak">🔥 Max Streaks: 1</span>
    <span class="streak">🔥 Current Streak: 1</span>
  </div>
</div>

<style>
  .right-align {
    text-align: right;
  }

  .streak {
    background-color: #4bb543;
    border: 2px solid #4bb543;
    padding: 1em;
  }

  .streak-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
