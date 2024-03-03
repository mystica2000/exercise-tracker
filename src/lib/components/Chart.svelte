<script>
  import chartjs from "chart.js/auto";
  import { onMount } from "svelte";
  import { dataStoreInstance } from "../../store/dataStore";
  import { chartData } from "../../core/stats";

  let ctx;
  let chartCanvas;

  let monthlyData;
  dataStoreInstance.subscribe((val) => {
    const arr = [...val.activity];
    monthlyData = chartData(arr);
  });

  const data = {
    datasets: [
      {
        label: "Target",
        data: monthlyData,
        borderColor: "#00FF00",
        backgroundColor: "#00FF00",
        pointStyle: "circle",
        pointRadius: 10,
        pointHoverRadius: 15,
      },
    ],
  };

  onMount(async (promise) => {
    ctx = chartCanvas.getContext("2d");
    var chart = new chartjs(ctx, {
      type: "line",
      data: data,
      options: {
        responsive: true,
        scales: {
          x: {
            type: "category",
          },
          y: {
            beginAtZero: true,
            suggestedMin: 0, // Ensure the Y-axis starts from 0
            suggestedMax: 1000, // Adjust the max value based on your dataset
          },
        },
      },
    });
  });
</script>

<canvas id="responsive-canvas" bind:this={chartCanvas}></canvas>

<style>
  canvas {
    width: 100%;
    object-fit: contain;
  }
</style>
