<script>
  import chartjs from "chart.js/auto";
  import { onMount } from "svelte";

  let ctx;
  let chartCanvas;

  var monthlyData = {
    January: [100, 1000, 2000, 5000, 0, 12, 50, 1000, 7000],
    February: [15, 25, 20, 35, 30],
    // Add more datasets for each month
  };

  var selectedMonth = "January";

  const data = {
    datasets: [
      {
        label: "Dataset",
        data: monthlyData[selectedMonth],
        borderColor: "#00FF00",
        backgroundColor: "#00FF00",
        pointStyle: "circle",
        pointRadius: 10,
        pointHoverRadius: 15,
      },
    ],
  };

  function generateLabels(month) {
    // Assuming you want labels for each day of the month
    var daysInMonth = 31; // You may need to adjust this based on the actual days in the month
    var labels = [];
    for (var i = 1; i <= daysInMonth; i++) {
      labels.push("Day " + i);
    }
    return labels;
  }

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
            labels: generateLabels(10),
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

<canvas bind:this={chartCanvas} id="myChart"></canvas>
