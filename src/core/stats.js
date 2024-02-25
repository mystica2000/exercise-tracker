
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
 * @property {number} name - The name of the person.
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
    statHash: ""
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

  // for setting max pr count
  let statDateObj = {};
  for (let i = 0; i < activity.length; i++) {
    statDateObj[activity[i].date] = (statDateObj[activity[i].date] || 0) + activity[i].count;
  }

  let maxCount = 0;
  // Iterate through values of statDateObj
  for (const dateCount of Object.values(statDateObj)) {
    maxCount = Math.max(maxCount, dateCount);
  }
  stat.maxPRCount = maxCount;


}

// validate
const revalidateCache = () => {

}

const isStatCacheEmpty = (str) => {
  return str?.trim()?.length == 0;
}

const prepareData = () => {

}

// but the probelm is if someone manually edited we're f-ed lol

// ..{ checkedUptoId: id which is checked, maxSoFarStreak: number, maxPRCount: number,  maxPRTimeAndCountForEveryTarget: { count: number, time: number };

// ... so that i can avoid recalculating everytime ... can i use localstorage or indexeddb .. but it is just a object, not more will be stored... ok i will have isModified: boolean; .. if update/delete is applied then, set isModified to true.. so on the next time, i will refetch all and calculate... can i have like for once a week, refetch like that