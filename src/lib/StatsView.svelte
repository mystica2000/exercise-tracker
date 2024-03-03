<script>
  import Chart from "./components/Chart.svelte";
  import Streak from "./components/Streak.svelte";
</script>

<main class="main-container">
  <div class="view flex">
    <Streak />
    <section>
      <Chart />
    </section>
  </div>
</main>

<style>
  .flex {
    display: flex;
    flex-direction: column;
  }
</style>
