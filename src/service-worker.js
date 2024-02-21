let pageVisible = true;
let intervalObj;
let startTime = 0;
let elapsedTime = 0;
let progress = 0;
let elapsedTimeText = "00";
let elapsedTimeTextMilli = "00";


self.addEventListener('message', (event) => {
  if (event.data && event.data.action === "startTimer") {
    startTimer();
  } else if (event.data && event.data.action == "stopTimer") {
    stopTimer();
  } else if (event.data && event.data.action == "pauseTimer") {
    pauseTimer();
  } else if (event.data && event.data.action == "resetTimer") {
    resetTimer();
  }
})


const resetTimer = () => {
  elapsedTimeText = "00";
  elapsedTime = 0;
  elapsedTimeTextMilli = "00";
  progress = 0;


  postMessageToClient({ action: 'resetTimeDone', elapsedTimeText: elapsedTimeText, elapsedTimeTextMilli: elapsedTimeTextMilli, progress: progress });

}

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


    postMessageToClient({ action: 'updateTimerDone', elapsedTimeText: elapsedTimeText, elapsedTimeTextMilli: elapsedTimeTextMilli, progress: progress });

  }, 100);
};

const pauseTimer = () => {
  clearInterval(intervalObj);

  postMessageToClient({ action: 'pauseTimerDone', elapsedTimeText: elapsedTimeText, elapsedTimeTextMilli: elapsedTimeTextMilli, progress: progress });
};

const stopTimer = () => {
  clearInterval(intervalObj);

  postMessageToClient({ action: 'stopTimerDone', elapsedTimeText: elapsedTimeText, elapsedTimeTextMilli: elapsedTimeTextMilli, progress: progress });

}

const postMessageToClient = (data) => {

    console.log("whattttttt ", data)

    this.clients.matchAll().then(clients => {
        clients.forEach(client => {
          client.postMessage(data);
       })});
      
}


  