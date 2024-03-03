import { writable } from "svelte/store";
import { Action, State, View } from "../constant";


export const pause = writable(false);

export const timerRunning = writable(false);

// icon
export const action = writable(Action.PLAY);

// to store global db
export const db = writable(null);

export const currentState = writable(State.START)

const stored = localStorage.content

export const curTarget = writable(stored || "1000");
curTarget.subscribe((value) => localStorage.content = value)