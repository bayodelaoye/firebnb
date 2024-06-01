import { csrfFetch } from "./csrf";

const LOAD_SPOTS = "spots/LOAD_SPOTS";

// actions
export const loadSpots = (spots) => {
  return {
    type: LOAD_SPOTS,
    spots,
  };
};

// thunks
export const getAllSpots = () => async (dispatch) => {
  const res = await fetch("/api/spots");

  if (res.ok) {
    const data = await res.json();

    dispatch(loadSpots(data));

    return data;
  }
};

const initialState = { allSpots: {}, currentUserSpots: {} };

export const spotReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS: {
      const newState = { allSpots: {}, currentUserSpots: {} };
      action.spots.spots.forEach((spot) => {
        newState.allSpots[spot.id] = spot;
      });
      return newState;
    }
    default:
      return state;
  }
};
