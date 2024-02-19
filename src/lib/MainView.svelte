<script>
  import { View, Action } from "../constant";
  import StartIcon from "../icon/startIcon.svelte";
  import { view, pause, action } from "../store/store";
  import AcitivityView from "./AcitivityView.svelte";
  import StatsView from "./StatsView.svelte";
  import Tab from "./components/Tab.svelte";

  let tab = "activity";

  const handleStart = () => {
    view.set(View.RECORD_VIEW);
    pause.set(false);
    action.set(Action.PLAY);
  };
</script>

<header class="width100">
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
    justify-content: center;
  }

  .sticky {
    position: fixed;
    bottom: 50px;
    right: 50px;
  }
</style>
