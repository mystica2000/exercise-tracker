<script>
  import Chart from "./components/Chart.svelte";
</script>

<main class="main-container">
  <div class="view">
    <div class="right-align">
      <span class="streak">🔥 Streaks: 1</span>
    </div>
    <section>
      <Chart />
    </section>
  </div>
</main>

<style>
  .right-align {
    text-align: right;
  }

  .streak {
    background-color: #4bb543;
    border: 2px solid #4bb543;
    padding: 1em;
  }
</style>
