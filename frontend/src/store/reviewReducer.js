import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = "reviews/LOAD_REVIEWS";

// actions
export const loadReviews = (reviews) => {
  return {
    type: LOAD_REVIEWS,
    reviews,
  };
};

// thunks
export const getAllReviews = (spotId) => async (dispatch) => {
  const res = await fetch(`api/spots/${spotId}/reviews`);

  if (res.ok) {
    const data = await res.json();

    dispatch(loadReviews(data));

    return data;
  } else {
    const data = await res.json();
    return data;
  }
};

const initialState = { spot: {}, user: {} };

export const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_REVIEWS: {
      console.log("yyyy");
      const newState = { ...state };
      newState.spot = { ...newState.spot };
      newState.user = { ...newState.user };
      action.reviews.reviews.forEach((review) => {
        newState.spot[review.id] = review;
      });

      return newState;
    }
    default:
      return state;
  }
};
