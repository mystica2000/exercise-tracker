<script>
  import { push } from "svelte-spa-router";
  import { View, Action } from "../constant";
  import StartIcon from "../icon/startIcon.svelte";
  import { pause, action, timerRunning } from "../store/store";
  import AcitivityView from "./AcitivityView.svelte";
  import StatsView from "./StatsView.svelte";
  import Tab from "./components/Tab.svelte";
  import TargetEditor from "./components/TargetEditor.svelte";

  let tab = "activity";

  const handleStart = () => {
    push("/timer");
    timerRunning.set(true);
    pause.set(false);
    action.set(Action.PLAY);
  };
</script>

<header class="width100">
  <TargetEditor />
  <Tab bind:tab />
</header>
{#if tab == "activity"}
  <AcitivityView />
{:else}
  <StatsView />
{/if}

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
  .width100 {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .sticky {
    position: fixed;
    bottom: 50px;
    right: 50px;
  }
</style>
