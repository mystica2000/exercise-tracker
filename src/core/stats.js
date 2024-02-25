
import hash from 'hash-it';

/**
 * Represents a person.
 * @typedef {Object} PR
 * @property {number} count - The name of the person.
 * @property {string} time - The age of the person.
 */

/**
 * Represents a person.
 * @typedef {Object} Stat
 * @property {number} lastCheckedID - The name of the person.
 * @property {number} maxStreak - The age of the person.
 * @property {number} currentStreak - The age of the person.
 * @property {number} maxPRCount - The age of the person.
 * @property {PR} maxPRTimeAndCount - The age of the person.
 * @property {string} statHash - The age of the person.
*/


/**
 * Represents a person.
 * @typedef {Object} Activity
 * @property {number} id - The name of the person.
 * @property {number} count - The name of the person.
 * @property {string} date - The age of the person.
 * @property {string} time - The age of the person.
*/


export const defaultStatObject = () => {
  return {
    lastCheckedID: 0,
    maxStreak: 0,
    currentStreak: 0,
    maxPRCount: 0,
    maxPRTimeAndCount: [], // contains { target: number, maxPRTimeCount: number}[],
    statHash: 0
  }
}

export const isDataTampered = (currentHash, activity) => {
  return hash(activity) !== currentHash;
}


/**
 *
 * @param {Activity[]} activity
*/

export const getStreakData = (activity) => {

  const stat = localStorage.getItem('statsCache')
  const refreshEntireStatCache = isStatCacheEmpty(stat);

  if (refreshEntireStatCache) {
    refreshCache(activity);
  } else {
    const statObj = JSON.parse(stat);

    const needsRefresh = isDataTampered(statObj.lastRefetchCacheDate, activity);

    if (needsRefresh) {
      refreshCache(activity);
    } else {
      revalidateCache();
    }
  }

}

/**
 * @param {Activity[]} activity
*/
const refreshCache = (activity) => {
  const stat = defaultStatObject();

  /**
   * Maximum PR count
   */
  let statDateObj = {};
  let statTimeObj = {}; // { [count:string]: string }
  let maxId = 0;
  for (let i = 0; i < activity.length; i++) {
    maxId = Math.max(maxId, activity[i].id);

    if (!statDateObj[activity[i].date]) { statDateObj[activity[i].date] = 0; }
    statDateObj[activity[i].date] = (statDateObj[activity[i].date]) + activity[i].count;


    if (!statTimeObj[activity[i].count]) { statTimeObj[activity[i].count] = 0; }
    statTimeObj[activity[i].count] = Math.max(statTimeObj[activity[i].count], timeToMinutes(activity[i].time))
  }

  stat.lastCheckedID = maxId;

  let maxCount = 0;
  // Iterate through values of statDateObj
  for (const dateCount of Object.values(statDateObj)) {
    maxCount = Math.max(maxCount, dateCount);
  }
  stat.maxPRCount = maxCount;


  /**
   * Current Streak Streak of all time
  */
  let currentStreak = 0;
  let currentDate = new Date();
  for (const date of Object.keys(statDateObj)) {
    const dateObj = new Date(date);

    // Check if the current date is consecutive to the previous one
    if (isConsectiveDates(currentDate, dateObj)) {
      currentDate = dateObj;
      currentStreak++;
    } else {
      break; // Break the loop if the streak is not consecutive
    }
  }

  stat.currentStreak = currentStreak;


  /**
   * Max Streak
  */
  currentStreak = 0;
  let previousDate;
  let maxStreak = 0;
  for (const { date, count } of Object.values(statDateObj)) {
    if (!previousDate || isConsectiveDates(previousDate, date)) {
      currentStreak += 1;
    } else {
      currentStreak = 1;
    }

    maxStreak = Math.max(maxStreak, currentStreak);
    previousDate = date;
  }

  stat.maxStreak = maxStreak;

  /**
   * Personal Record for time + count; for every count()
   */

  stat.statHash = hash(activity);
  writeToCache(stat);

  return stat;
}

// validate
const revalidateCache = () => {

}

const isStatCacheEmpty = (str) => {
  return str?.trim()?.length == 0;
}

const writeToCache = (obj) => {
  localStorage.setItem("statsCache", obj);
}

const isConsectiveDates = (date1, date2) => {
  const oneDay = 24 * 60 * 60 * 1000;

  const diffInDays = Math.round(Math.abs((date1 - date2) / oneDay));

  return diffInDays === 1;
}


const timeToMinutes = (time) => {
  const segments = time.split(":");

  let totalMin = 0;

  if (segments.length == 2) {
    // mm:ss
    totalMin = parseInt(segments[0]) + (parseInt(segments[1]) / 60);
  } else if (segments.length == 3) {
    // hh:mm:ss
    totalMin = (parseInt(segments[0]) * 60) + (parseInt(segments[1]) + (parseInt(segments[2]) / 60));
  }

  return totalMin;
}

// but the probelm is if someone manually edited we're f-ed lol

// ..{ checkedUptoId: id which is checked, maxSoFarStreak: number, maxPRCount: number,  maxPRTimeAndCountForEveryTarget: { count: number, time: number };

// ... so that i can avoid recalculating everytime ... can i use localstorage or indexeddb .. but it is just a object, not more will be stored... ok i will have isModified: boolean; .. if update/delete is applied then, set isModified to true.. so on the next time, i will refetch all and calculate... can i have like for once a week, refetch like that