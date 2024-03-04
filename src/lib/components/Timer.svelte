<script>
  import { onDestroy, onMount } from "svelte";
  import { action, pause, timerRunning } from "../../store/store";
  import { Action } from "../../constant";

  let radius; // half of the circle's diameter
  let circumference;
  let xy, hw;

  let progress = 0;
  let elapsedTime = 0;
  let elapsedTimeTextMilli = "00";

  const getSVGStyles = (width) => {
    if (width > 700 && window.screen.orientation.type == "portrait-primary") {
      return { newRadi: 245, newHw: 500, newXy: 250 };
    } else {
      return { newRadi: 145, newHw: 300, newXy: 150 };
    }
  };

  action.subscribe((val) => {
    if (val == Action.RESET) {
      elapsedTimeText = "00";
      elapsedTime = 0;
      elapsedTimeTextMilli = "00";
      progress = 0;
    }
  });

  export let elapsedTimeText = "00";

  let startTime;
  let intervalObj;

  const setWindowWidth = () => {
    const { newRadi, newHw, newXy } = getSVGStyles(window.innerWidth);

    radius = newRadi;
    hw = newHw;
    xy = newXy;

    circumference = 2 * Math.PI * radius;
  };

  const notificationsPermission = async () => {
    const reg = await navigator.serviceWorker.ready;

    // Check if the browser supports the Notification API
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          // Permission has been granted
          console.log("Notification permission granted!");

          window.onbeforeunload = function (e) {
            reg.active.postMessage("hideNotification");
          };

          document.addEventListener("visibilitychange", () => {
            if (document.visibilityState === "visible") {
              reg.active.postMessage("hideNotification");
            } else if ($timerRunning) {
              // TODO: MOVE TO APP
              reg.active.postMessage({
                action: "showNotification",
                pause: $pause,
              });
            }
          });
        } else if (permission === "denied") {
          // Permission has been denied
          console.warn("Notification permission denied!");
        } else if (permission === "default") {
          // The user closed the permission prompt without making a choice
          console.log("Notification permission dismissed.");
        }
      });
    } else {
      console.error("Notification API not supported in this browser.");
    }
  };

  onMount(() => {
    setWindowWidth();
    window.addEventListener("resize", setWindowWidth);
    notificationsPermission();

    return () => {
      window.removeEventListener("resize", setWindowWidth);
    };
  });

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
      let ms = milliseconds.toString().padStart(2, "0").slice(0, 2);

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

  <svg width={hw} height={hw} xmlns="http://www.w3.org/2000/svg">
    <!-- Background circle -->
    <circle class="background-circle" cx={xy} cy={xy} r={radius} />

    <circle
      class="circle"
      cx={xy}
      cy={xy}
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
