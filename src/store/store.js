import { writable } from "svelte/store";
import { Action, State, View } from "../constant";

// view of the page
export const view = writable(View.MAIN_VIEW);

export const pause = writable(false);

// icon
export const action = writable(Action.PLAY);

// to store global db
export const db = writable(null);

export const currentState = writable(State.START)