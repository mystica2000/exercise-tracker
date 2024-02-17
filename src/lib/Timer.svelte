<script>
  import { onDestroy, onMount } from "svelte";
  import { pause } from "../store/store";

  const radius = 145; // half of the circle's diameter
  const circumference = 2 * Math.PI * radius;
  export let progress = 0;
  export let elapsedTime = 0;
  export let elapsedTimeText = "00"
  export let elapsedTimeTextMilli = "00";

  let startTime;
  let intervalObj;

  const startTimer = () => {
    startTime = Date.now() - elapsedTime;

    intervalObj = setInterval(() => {
      elapsedTime = Date.now() - startTime;

      // Convert time to seconds
      let totalSeconds = Math.floor(elapsedTime / 1000);

      // Set the progress based on the time elapsed
      progress = (totalSeconds % 60) / 60;

      let hours = Math.floor(totalSeconds / 3600);
      totalSeconds = totalSeconds % 3600;

      // Calculate minutes
      let minutes = Math.floor(totalSeconds / 60);

      // Calculate remaining seconds
      let seconds = Math.floor(totalSeconds % 60);

      // Calculate remaining milliseconds
      let milliseconds = Math.floor(elapsedTime % 1000);

      let hh = hours.toString().padStart(2, "0");
      let mm = minutes.toString().padStart(2, "0");
      let ss = seconds.toString().padStart(2, "0");
      let ms = milliseconds.toString().padStart(2, "0").slice(0,2);

      if (hours) {
        // Ensure two-digit formatting

        elapsedTimeText = `${hh}:${mm}:${ss}`;
      } else if (seconds) {
        elapsedTimeText = `${mm}:${ss}`;
      }

      elapsedTimeTextMilli = ms;
    }, 10);
  };

  const pauseTimer = () => {
    clearInterval(intervalObj);
  };

  pause.subscribe((val) => {
    if (val) {
      pauseTimer();
    } else {
      startTimer();
    }
  });

  // Cleanup the update function on component destruction
  onDestroy(() => {
    clearInterval(intervalObj);
  });
</script>

<div class="item">
  <div class="time">
    <h3>{elapsedTimeText}</h3>
    <h6 style="text-align: end;">{elapsedTimeTextMilli}</h6>
  </div>

  <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
    <!-- Background circle -->
    <circle class="background-circle" cx="150" cy="150" r={radius} />

    <circle
      class="circle"
      cx="150"
      cy="150"
      r={radius}
      stroke-dasharray={circumference}
      stroke-dashoffset={circumference * (1 - progress)}
    />
  </svg>
</div>

<style>
  svg {
    rotate: -90deg;
  }
  /* Your styling goes here */
  .circle {
    /* // transform: rotate(-90deg); */
    fill: none;
    stroke: #3498db; /* Change color as needed */
    stroke-width: 10;
    stroke-linecap: round;
    stroke-linejoin: round;
    shape-rendering: auto; /* or geometricPrecision or crispEdges */
  }

  .background-circle {
    stroke: grey;
    stroke-width: 10;
    fill: none;
  }

  .item {
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .time {

    font-family: Arial, sans-serif;

    text-align: center;

    position: absolute;

    font-size: 3.5em;


    line-height: 0.9em;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }


  h3 {
    font-size: 1em;
  }

</style>
