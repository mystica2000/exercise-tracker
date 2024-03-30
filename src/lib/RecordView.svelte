<script>
  import { withDbOperation } from "../db/db";
  import PauseIcon from "../icon/pauseIcon.svelte";
  import PlayIcon from "../icon/playIcon.svelte";
  import RestartIcon from "../icon/restartIcon.svelte";
  import StopIcon from "../icon/stopIcon.svelte";
  import { dataStoreInstance } from "../store/dataStore";
  import { action, curTarget, db, pause, timerRunning } from "../store/store";
  import { Action } from "../constant";
  import Timer from "./components/Timer.svelte";
  import { push } from "svelte-spa-router";
  import EditIcon from "../icon/editIcon.svelte";
  import EditDialog from "./dialogs/editDialog.svelte";
  import { get } from "svelte/store";

  let elapsedTimeText = "00";

  const handleStop = async () => {
    const result = await withDbOperation($db, "insert", {
      count: parseInt($curTarget),
      date: new Intl.DateTimeFormat("en-US").format(new Date()),
      time: elapsedTimeText,
    });

    dataStoreInstance.dispatch({ type: "insert", obj: result });
    timerRunning.set(false);
    push("/");
    action.set(Action.PAUSE);
  };

  const handleRestart = () => {
    action.set(Action.RESET);
    pause.set(true);
  };

  const handlePausePlay = () => {
    action.update((act) => (act = $pause ? Action.PAUSE : Action.PLAY));
    pause.update((pause) => !pause);
  };

  const handleEditTarget = () => {
    if (!get(pause)) {
      action.update((act) => (act = Action.PAUSE));
      pause.update((pause) => !pause);
    }

    const dialog = document.getElementById("edit-dialog");
    dialog["showModal"]();
  };

  //listen to messages
  navigator.serviceWorker.onmessage = (event) => {
    if (event.data && event.data.action === "pauseTimer") {
      pause.set(true);
    } else if (event.data && event.data.action == "playTimer") {
      pause.set(false);
    } else if (event.data && event.data.action === "stopTimer") {
      handleStop();
    }
  };
</script>

<main class="main-container">
  <div class="timer-center">
    <h2>
      Target 🎯: {$curTarget}
      <button
        class="btn-edit"
        on:click={handleEditTarget}
        aria-label="Edit Target"><EditIcon /></button
      >
    </h2>
    <Timer bind:elapsedTimeText />
  </div>
</main>

<EditDialog />
<footer class="btn-center footer-btn">
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
    <span id="pause-play-label" hidden>{$pause == true ? "Play" : "Pause"}</span
    >
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

  .footer-btn {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  .btn-edit {
    background: white;
    border: 1px solid black;
    border-radius: 10px;
    width: 3em;
    height: 3em;
    margin-top: 1em;
    top: -5px;
    position: relative;
  }

  @media screen and (min-width: 720px) {
    .footer-btn {
      justify-content: center;
      gap: 5em;
    }
  }
</style>
