import { writable } from "svelte/store";


/**
 * Redux-like store in svelte
 * inspired by fireship : https://fireship.io/snippets/custom-svelte-stores/
 */
function dataStore(init) {

  const { update, subscribe } = writable(init);

  const reducer = (state, action) => {
    switch (action.type) {
      case "insert": {
        if (!state.activity) { state.activity = [] }
        return { activity: [...state?.activity, action.obj] }
      }
      case "delete": {
        return { activity: state.activity.filter((aObj) => aObj.id != action.obj) }
      }
      case "bulkInsert": {
        // sort by id and insert
        const sortedDate = action.obj.sort(function (a, b) {
          return b.id - a.id;
        });
        return { activity: sortedDate }
      }
      default:
        return state;
    }
  }

  const dispatch = (action) => {
    update((state) => {
      const newState = reducer(state, action);
      return newState
    })
  }

  return {
    subscribe,
    dispatch
  }
}
export const dataStoreInstance = dataStore([]);  // Create and export the store instance