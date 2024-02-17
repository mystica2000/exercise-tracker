<script>
  import { action, pause, view } from "../store/store";
  import { Action, View } from "../util";
  import StartIcon from "../icon/startIcon.svelte";
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
  <button
    class="btn-large btn sticky"
    on:click={handleStart}
    aria-labelledby="pause-play-label"
  >
    <span id="pause-play-label" hidden>Start</span>
    <StartIcon />
  </button>
</footer>

<style>
  .sticky {
    position: fixed;
    bottom: 50px;
    right: 50px;
  }

  .stat-view {
    max-width: 790px;
  width: 100%;
  }
</style>