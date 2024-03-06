<script>
  import chartjs from "chart.js/auto";
  import { onMount } from "svelte";

  let ctx;
  let lineGraphCanvas;
  let barGraphCanvas;

  export let lineGraphData;
  export let barGraphData;

  const data = {
    datasets: [
      {
        label: "Per day count",
        data: lineGraphData,
        borderColor: "#00FF00",
        backgroundColor: "#00FF00",
        pointStyle: "circle",
        pointRadius: 10,
        pointHoverRadius: 15,
      },
    ],
  };

  const lineGraph = () => {
    ctx = lineGraphCanvas.getContext("2d");
    new chartjs(ctx, {
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
  };

  const barGraph = () => {
    ctx = barGraphCanvas.getContext("2d");
    new chartjs(ctx, {
      type: "bar",
      data: {
        labels: barGraphData.labels,
        datasets: [
          {
            label: "minimum time taken for target",
            data: barGraphData.times,
            borderColor: "#00FF00",
            backgroundColor: "#00FF00",
            borderWidth: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => formatTime(value),
            },
          },
        },
      },
    });
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  onMount(async () => {
    barGraph();
    lineGraph();
  });
</script>

<canvas id="line-graph" bind:this={lineGraphCanvas}></canvas>

<canvas id="bar-chart" bind:this={barGraphCanvas}></canvas>

<style>
  canvas {
    width: 100%;
    object-fit: contain;
  }
</style>
