import { writable } from "svelte/store";

function dataStore(init) {

  const { update, subscribe } = writable(init);

  const dispatch = (action) => {
    update(state => {
      console.log(state)
      return reducer(state, action);
    })
  }

  return {
    subscribe,
    dispatch
  }
}

const reducer = (state, action) => {
  switch (action.type) {
    case "insert": {
      return { activity: [...state.activity, action.obj] }
    }
    case "update": {
      const index = state.activity.findIndex(aState => aState.id === action.obj.id);

      if (index == -1) {
        state[index] = { ...state[index], ...action.obj }
      }

      return { activity: state }
    }
    case "delete": {
      return { activity: state.activity.filter((aObj) => aObj.id != action.obj.id) }
    }
    case "bulkInsert": {
      const sortedDate = action.obj.sort(function (a, b) {
        return b.id - a.id;
      });
      return { activity: sortedDate }
    }
    default:
      return state;
  }
}

export const dataStoreInstance = dataStore([]);  // Create and export the store instance