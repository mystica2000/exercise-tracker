export const prepareLineGraphData = (activity) => {
  let lineGraphObj = {};
  activity.sort((a, b) => a.id - b.id);

  for (let i = 0; i < activity.length; i++) {
    if (!lineGraphObj[activity[i].date]) { lineGraphObj[activity[i].date] = 0; }
    lineGraphObj[activity[i].date] = (lineGraphObj[activity[i].date]) + activity[i].count;
  }

  return lineGraphObj;
}

export const prepareBarGraph = (activity) => {

  const minTimeMap = new Map();

  activity.forEach(element => {
    const { date, count, time } = element;

    if (!minTimeMap.has(count) || time < minTimeMap.get(count)) {
      minTimeMap.set(count, time);
    }

  });

  const bestestCounts = Array.from(minTimeMap.entries());


  const labels = bestestCounts.map(entry => entry[0]);
  const times = bestestCounts.map(entry => secondsArray(entry[1]));

  return { labels, times }
}


const secondsArray = (time) => {

  const timeComponents = time.split(":").map(Number);
  if (timeComponents.length === 3) {
    return (timeComponents[0] * 3600) + (timeComponents[1] * 60) + timeComponents[2];
  } else if (timeComponents.length === 2) {
    return (timeComponents[0] * 60) + timeComponents[1];
  } else if (timeComponents.length === 1) {
    return timeComponents[0];
  } else {
    return NaN;
  }

};