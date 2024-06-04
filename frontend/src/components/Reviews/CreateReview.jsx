import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createReview } from "../../store/reviewReducer";
import { getSingleSpot } from "../../store/spotReducer";
import { useModal } from "../../context/Modal";
import "./CreateReview.css";
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import SpotDetailsPage from "../Spots/SpotDetailsPage";

function CreateReview({ spot, user }) {
  const [stars, setStars] = useState(0);
  const [review, setReview] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const [activeRating, setActiveRating] = useState(5);
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    let errors = {};
    if (stars < 1) errors.stars = "Stars can't be empty";
    if (review.length < 10)
      errors.review = "Review must be at least 10 characters long";

    setErrors(errors);
  }, [review, stars]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(errors).length > 0) {
      alert("Please fix the errors you have");
    } else {
      let spotId = parseInt(spot.id);
      let newReview = {
        stars,
        review,
      };

      await dispatch(createReview(newReview, spotId))
        .then(closeModal)
        .then(() => {
          getSingleSpot(spotId);
        })
        .then(() => {
          setStars(0);
          setReview("");
          setErrors({});
          setActiveRating(0);
        })
        .catch((error) => {
          setServerError(error.message);
        });
      console.log(newReview);
    }
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h2 className="review-title">How was your stay?</h2>

      {serverError && <p className="server-error">{serverError}</p>}
      <label className="review-label">
        Review:
        <textarea
          placeholder="Leave your review here..."
          className="review-input long-text"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
      </label>
      <label className="review-label">
        Stars:
        <div className="rating-input">
          {stars === 0 ? (
            <div className="star-ratings-container">
              <div onClick={() => setStars(1)}>
                <FaRegStar />
              </div>
              <div onClick={() => setStars(2)}>
                <FaRegStar />
              </div>
              <div onClick={() => setStars(3)}>
                <FaRegStar />
              </div>
              <div onClick={() => setStars(4)}>
                <FaRegStar />
              </div>
              <div onClick={() => setStars(5)}>
                <FaRegStar />
              </div>
            </div>
          ) : stars === 1 ? (
            <div className="star-ratings-container">
              <div onClick={() => setStars(1)}>
                <FaStar />
              </div>
              <div onClick={() => setStars(2)}>
                <FaRegStar />
              </div>
              <div onClick={() => setStars(3)}>
                <FaRegStar />
              </div>
              <div onClick={() => setStars(4)}>
                <FaRegStar />
              </div>
              <div onClick={() => setStars(5)}>
                <FaRegStar />
              </div>
            </div>
          ) : stars === 2 ? (
            <div className="star-ratings-container">
              <div onClick={() => setStars(1)}>
                <FaStar />
              </div>
              <div onClick={() => setStars(2)}>
                <FaStar />
              </div>
              <div onClick={() => setStars(3)}>
                <FaRegStar />
              </div>
              <div onClick={() => setStars(4)}>
                <FaRegStar />
              </div>
              <div onClick={() => setStars(5)}>
                <FaRegStar />
              </div>
            </div>
          ) : stars === 3 ? (
            <div className="star-ratings-container">
              <div onClick={() => setStars(1)}>
                <FaStar />
              </div>
              <div onClick={() => setStars(2)}>
                <FaStar />
              </div>
              <div onClick={() => setStars(3)}>
                <FaStar />
              </div>
              <div onClick={() => setStars(4)}>
                <FaRegStar />
              </div>
              <div onClick={() => setStars(5)}>
                <FaRegStar />
              </div>
            </div>
          ) : stars === 4 ? (
            <div className="star-ratings-container">
              <div onClick={() => setStars(1)}>
                <FaStar />
              </div>
              <div onClick={() => setStars(2)}>
                <FaStar />
              </div>
              <div onClick={() => setStars(3)}>
                <FaStar />
              </div>
              <div onClick={() => setStars(4)}>
                <FaStar />
              </div>
              <div onClick={() => setStars(5)}>
                <FaRegStar />
              </div>
            </div>
          ) : stars === 5 ? (
            <div className="star-ratings-container">
              <div onClick={() => setStars(1)}>
                <FaStar />
              </div>
              <div onClick={() => setStars(2)}>
                <FaStar />
              </div>
              <div onClick={() => setStars(3)}>
                <FaStar />
              </div>
              <div onClick={() => setStars(4)}>
                <FaStar />
              </div>
              <div onClick={() => setStars(5)}>
                <FaStar />
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </label>
      <button disabled={Object.values(errors).length > 0} type="submit">
        Submit Your Review
      </button>
    </form>
  );
}

export default CreateReview;
