<script>
  import { action, pause, view } from "../store/store";
  import { Action, View } from "../util";
  import Table from "./Table.svelte";

  const handleStart = () => {
    view.set(View.RECORD_VIEW);
    pause.set(false);
    action.set(Action.PLAY);
  };
</script>

<main class="main-container">
  <div class="stat-view">
    <Table />
  </div>
</main>

<footer class="btn-center">
  <button class="btn" on:click={handleStart}>Start</button>
</footer>
