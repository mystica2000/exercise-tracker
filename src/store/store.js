import { writable } from "svelte/store";
import { Action, View } from "../util";

// view of the page
export const view = writable(View.STAT_VIEW);

export const pause = writable(false);

// icon
export const action = writable(Action.PLAY);

// to store global db
export const db = writable(null);