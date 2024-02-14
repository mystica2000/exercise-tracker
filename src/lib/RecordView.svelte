<script>
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
    <Timer bind:elapsedTimeText={elapsedTimeText} bind:elapsedTime={elapsedTime} bind:elapsedTimeTextMilli={elapsedTimeTextMilli} bind:progress={progress}/>
  </div>
</main>

<footer class="btn-center">
  <button class="btn-small" on:click={handleRestart}>Restart</button>
  <button class="btn" on:click={handlePausePlay}>{pauseOrStop}</button>
  <button class="btn-small" on:click={handleStop}>Stop</button>
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
</style>
