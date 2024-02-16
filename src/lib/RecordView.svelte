<script>
  import PauseIcon from "../icon/pauseIcon.svelte";
  import PlayIcon from "../icon/playIcon.svelte";
  import RestartIcon from "../icon/restartIcon.svelte";
  import StopIcon from "../icon/stopIcon.svelte";
  import { action, pause, timer, view } from "../store/store";
  import { Action, View } from "../util";
  import Timer from "./Timer.svelte";

  let pauseOrStop = "Pause";

  let elapsedTime = 0;
  let elapsedTimeText = "00";
  let elapsedTimeTextMilli = "00";
  let progress = 0;

  const handleStop = () => {
    view.set(View.STAT_VIEW);
    action.set(Action.PAUSE);
  };

  const handleRestart = () => {
    action.set(Action.RESET);
    pause.set(true);

    elapsedTimeText = "00";
    elapsedTime = 0;
    elapsedTimeTextMilli = "00";
    progress = 0;
  };

  const handlePausePlay = () => {
    pauseOrStop = pauseOrStop == "Pause" ? "Play" : "Pause";
    pause.update((pause) => !pause);

    action.update(
      (act) => (act = pauseOrStop == "Pause" ? Action.PAUSE : Action.PLAY)
    );
  };
</script>

<main class="main-container">
  <div class="timer-center">
    <h2>Target 🎯: 1000</h2>
    <Timer
      bind:elapsedTimeText
      bind:elapsedTime
      bind:elapsedTimeTextMilli
      bind:progress
    />
  </div>
</main>

<footer class="btn-center">
  <button
    class="btn-small btn"
    on:click={handleRestart}
    aria-labelledby="restart-label"
  >
    <span id="restart-label" hidden>Restart</span>
    <RestartIcon />
  </button>
  <button
    class="btn-large btn"
    on:click={handlePausePlay}
    aria-labelledby="pause-play-label"
  >
    <span id="pause-play-label" hidden>{pauseOrStop}</span>
    {#if $pause}
      <PlayIcon />
    {:else}
      <PauseIcon />
    {/if}</button
  >
  <button
    class="btn-small btn"
    on:click={handleStop}
    aria-labelledby="stop-label"
  >
    <span id="stop-label" hidden>Stop</span><StopIcon />
  </button>
</footer>

<style>
  .timer-center {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    justify-items: center;
    width: 100%;
    height: 100%;
  }

  h2 {
    font-size: 2.5em;
    margin-bottom: 1em;
  }

</style>
