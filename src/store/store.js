import { writable } from "svelte/store";
import { Action, View } from "../util";

export const view = writable(View.STAT_VIEW);

export const timer = writable("00:00");

export const pause = writable(false);

export const action = writable(Action.PLAY);