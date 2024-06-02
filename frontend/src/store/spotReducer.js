import { csrfFetch } from "./csrf";

const LOAD_SPOTS = "spots/LOAD_SPOTS";
const RECEIVE_SPOT = "spots/RECEIVE_SPOT";

export const loadSpots = (spots) => {
  return {
    type: LOAD_SPOTS,
    spots,
  };
};

export const receiveSpot = (spot) => {
  return {
    type: RECEIVE_SPOT,
    spot,
  };
};

export const getAllSpots = () => async (dispatch) => {
  const res = await fetch("/api/spots");

  if (res.ok) {
    const data = await res.json();

    dispatch(loadSpots(data));

    return data;
  }
};

export const getSingleSpot = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`);

  if (res.ok) {
    const data = await res.json();

    dispatch(receiveSpot(data));

    return data;
  } else {
    const data = await res.json();

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
    case RECEIVE_SPOT: {
      const newState = { ...state, currentSpot: action.spot };
      return newState;
    }
    default: {
      return state;
    }
  }
};
