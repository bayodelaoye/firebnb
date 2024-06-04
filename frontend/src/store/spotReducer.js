import { csrfFetch } from "./csrf";

const LOAD_SPOTS = "spots/LOAD_SPOTS";
const RECEIVE_SPOT = "spots/RECEIVE_SPOT";
const CREATE_SPOT = "spots/CREATE_SPOT";
const UPDATE_SPOT = "spots/UPDATE_SPOT";
const GET_USER_SPOTS = "spots/GET_USER_SPOTS";
const DELETE_SPOT = "spots/DELETE_SPOT";

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

export const addSpot = (spot) => {
  return {
    type: CREATE_SPOT,
    spot,
  };
};

export const updateSpot = (spot) => {
  return {
    type: UPDATE_SPOT,
    spot,
  };
};

export const getUserSpots = (spots) => {
  return {
    type: GET_USER_SPOTS,
    spots,
  };
};

export const deleteSpot = (spotId) => {
  return {
    type: DELETE_SPOT,
    spotId,
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

export const createSpot = (spot) => async (dispatch) => {
  const res = await csrfFetch("/api/spots", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(spot),
  });
  console.log(res);
  if (res.ok) {
    const data = await res.json();

    dispatch(addSpot(data));

    return data;
  } else {
    const data = await res.json();

    return data;
  }
};

export const createUpdatedSpot = (spotId, updatedSpot) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedSpot),
  });

  if (res.ok) {
    const data = await res.json();

    dispatch(updateSpot(data));

    return data;
  } else {
    const data = await res.json();

    return data;
  }
};

export const getCurrentUserSpots = () => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/current`);

  if (res.ok) {
    const data = await res.json();

    dispatch(getUserSpots(data));

    return data;
  } else {
    const data = await res.json();

    return data;
  }
};

export const removeSpot = (spotId) => async (dispatch) => {
  await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });

  dispatch(deleteSpot(spotId));

  return spotId;
};

const initialState = { allSpots: {}, currentUserSpots: {}, currentSpot: {} };

export const spotReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS: {
      const newState = { ...state };
      action.spots.spots.forEach((spot) => {
        newState.allSpots[spot.id] = spot;
      });
      return newState;
    }
    case RECEIVE_SPOT: {
      const newState = { ...state, currentSpot: action.spot };
      // state.currentSpot = action.spot;
      console.log(action.spot, "TEST", state);
      return newState;
    }
    case CREATE_SPOT: {
      const newState = { ...state, createdSpot: action.spot };
      return newState;
    }
    case UPDATE_SPOT: {
      const newState = { ...state, updatedSpot: action.spot };
      return newState;
    }
    case GET_USER_SPOTS: {
      const newState = { ...state, currentUserSpots: action.spots };
      console.log(action.spots);
      return newState;
    }
    case DELETE_SPOT: {
      const newState = { ...state };
      delete newState.allSpots[action.spotId];
      return newState;
    }
    default: {
      return state;
    }
  }
};
