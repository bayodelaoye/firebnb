import { csrfFetch } from "./csrf";

const LOAD_REVIEWS_BY_SPOT_ID = "reviews/LOAD_REVIEWS_BY_SPOT_ID";

export const loadReviewsBySpotId = (reviews) => {
  return {
    type: LOAD_REVIEWS_BY_SPOT_ID,
    reviews,
  };
};

export const getAllReviewsForSpot = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`api/spots/${spotId}/reviews`);

  if (res.ok) {
    const data = await res.json();

    dispatch(loadReviewsBySpotId(data));

    return data;
  } else {
    const data = await res.json();

    return data;
  }
};

const initialState = { spot: {}, user: {} };

export const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_REVIEWS_BY_SPOT_ID: {
      console.log("REVIEWS", action.reviews);
      const newState = { ...state };
      //   newState.spot = { ...newState.spot };
      //   newState.user = { ...newState.user };
      action.reviews.reviews.forEach((review) => {
        newState.spot[review.id] = review;
      });

      return newState;
    }
    default: {
      return state;
    }
  }
};
