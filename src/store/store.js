import { writable } from "svelte/store";
import { Action } from "../constant";

// to handle whether the timer is in pause state or not
export const pause = writable(false);

// to handle Notifications if timer is running and document is invisible then notifications pop up will be sent
export const timerRunning = writable(false);

// pause or play icon toggle
export const action = writable(Action.PLAY);

// to store global db
export const db = writable(null);

// to store current target in the localstorage
const stored = localStorage.content
export const curTarget = writable(stored || "1000");
curTarget.subscribe((value) => localStorage.content = value)