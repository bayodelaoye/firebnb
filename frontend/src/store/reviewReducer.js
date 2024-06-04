const LOAD_REVIEWS_BY_SPOT_ID = "reviews/LOAD_REVIEWS_BY_SPOT_ID";
const CREATE_REVIEW = "reviews/CREATE_REVIEW";
const DELETE_REVIEW = "reviews/DELETE_REVIEW";

export const loadReviewsBySpotId = (reviews) => {
  return {
    type: LOAD_REVIEWS_BY_SPOT_ID,
    reviews,
  };
};

export const addReview = (review) => {
  return {
    type: CREATE_REVIEW,
    review,
  };
};

export const deleteReview = (reviewId) => {
  return {
    type: DELETE_REVIEW,
    reviewId,
  };
};

export const getAllReviewsForSpot = (spotId) => async (dispatch) => {
  const res = await fetch(`/api/spots/${spotId}/reviews`);

  if (res.ok) {
    const data = await res.json();

    dispatch(loadReviewsBySpotId(data));

    return data;
  } else {
    const data = await res.json();

    return data;
  }
};

export const createReview = (review, spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });

  if (res.ok) {
    const data = await res.json();

    dispatch(addReview(data));

    return data;
  } else {
    const data = await res.json();

    data.spotId = parseInt(spotId);
    return data;
  }
};

export const removeReview = (reviewId) => async (dispatch) => {
  await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });

  dispatch(deleteReview(reviewId));

  return reviewId;
};

const initialState = { spot: {}, user: {} };

export const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_REVIEWS_BY_SPOT_ID: {
      const newState = { ...state };
      action.reviews.Reviews.forEach((review) => {
        newState.spot[review.id] = review;
      });
      return newState;
    }
    case CREATE_REVIEW: {
      const newState = { ...state };
      state.spot[action.review.id] = action.review;
      return newState;
    }
    case DELETE_REVIEW: {
      const newState = { ...state };
      delete newState.spot[action.reviewId];
      return newState;
    }
    default: {
      return state;
    }
  }
};
