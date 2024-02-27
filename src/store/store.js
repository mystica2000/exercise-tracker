import { writable } from "svelte/store";
import { Action, State, View } from "../constant";


export const pause = writable(false);

// icon
export const action = writable(Action.PLAY);

// to store global db
export const db = writable(null);

export const currentState = writable(State.START)