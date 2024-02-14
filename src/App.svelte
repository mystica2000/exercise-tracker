<script>
  import RecordView from "./lib/RecordView.svelte";
  import { View } from "./util";
  import { view } from "./store/store";
  import StatsView from "./lib/StatsView.svelte";
</script>

<h1 style="text-align: center;">Jump Rope Tracker ✍🏼</h1>

<div class="flex">
  {#if $view == View.STAT_VIEW}
    <StatsView />
  {:else}
    <RecordView />
  {/if}
</div>

<style>
  .flex {
    display: flex;
    flex-direction: column;

    height: calc(100% - 100px);
  }
</style>
