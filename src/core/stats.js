
import hash from 'hash-it';
import { timeToMinutes } from '../date-util';

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
 * @property {string} lastCheckedDate - The last checked date
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
    const stat = refreshCache(activity);
    return stat;
  } else {
    const statObj = JSON.parse(stat);

    const needsRefresh = isDataTampered(statObj.statHash, activity);

    if (needsRefresh) {
      const stat = refreshCache(activity);
      return stat;
    } else {

      const currentDate = new Intl.DateTimeFormat("en-US").format(new Date());
      if (statObj.lastCheckedDate == currentDate) {
        statObj.currentStreak = 0;
      }

      return statObj;
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
  let currentStreakCalc = 0;
  let previousDate = null;
  let maxStreak = 0;
  for (const [date, count] of Object.entries(statDateObj)) {

    if (!previousDate || isConsectiveDates(previousDate != null ? new Date(previousDate) : null, new Date(date))) {
      currentStreakCalc += 1;
    } else {
      currentStreakCalc = 1;
    }

    maxStreak = Math.max(maxStreak, currentStreakCalc);
    previousDate = date;
  }

  stat.maxStreak = maxStreak;

  /**
   * Personal Record for time + count; for every count()
   */

  stat.statHash = hash(activity);
  stat.lastCheckedDate = new Date();
  writeToCache(stat);


  return stat;
}

const isStatCacheEmpty = (str) => {
  return str?.trim()?.length == 0 || str == null;
}

const writeToCache = (obj) => {
  localStorage.setItem("statsCache", JSON.stringify(obj));
}

const isConsectiveDates = (date1, date2) => {
  const oneDay = 24 * 60 * 60 * 1000;

  const diffInDays = Math.round(Math.abs((date1 - date2) / oneDay));
  return diffInDays === 1 || diffInDays === 0;
}