import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllReviewsForSpot } from "../../store/reviewReducer";
import { getSingleSpot } from "../../store/spotReducer";
import "./SpotDetailsPage.css";
import { FaStar } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import ReviewIndexItem from "../Reviews/ReviewIndexItem";

const SpotDetailsPage = () => {
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spots.currentSpot);
  const spotReviews = useSelector((state) => state.reviews.spot);
  const reviewsArray = Object.values(spotReviews);
  const dispatch = useDispatch();

  console.log(spotReviews);

  useEffect(() => {
    dispatch(getSingleSpot(spotId)).then(() =>
      dispatch(getAllReviewsForSpot(spotId))
    );
  }, [dispatch, spotId]);

  return (
    <div className="details-page-container">
      <h2>{spot.name}</h2>
      <p>
        {spot.city} {spot.state} {spot.country}
      </p>
      <div className="details-page-image-container">
        <div className="main-image-container">
          <img src={spot.previewImage} />
          <div className="sub-image-container">
            <img src={spot.SpotImages[1].url} />
          </div>
          <div className="third-image-container">
            <img src={spot.SpotImages[2].url} />
            <img src={spot.SpotImages[3].url} />
          </div>
        </div>
      </div>

      <div className="spot-info-container">
        <div className="owner-description-container">
          <h2>
            Hosted by {spot.Owner.firstName} {spot.Owner.lastName}
          </h2>
          <p>{spot.description}</p>
        </div>

        <div className="info-box-container">
          <div className="stay-info-container">
            <h2>${spot.price} night</h2>
            <p>
              <FaStar /> {spot.avgRating.toFixed(2)}
            </p>
            <GoDotFill /> {reviewsArray.length}
          </div>
          <div className="btn-container">
            <button onClick={() => alert("Feature comming soon")}>
              Reserve
            </button>
          </div>
        </div>
      </div>
      <div className="line-break"></div>
      <div className="summary-review-container">
        <div className="review-summary-container">
          <div className="star-rating-review-summary">
            <FaStar /> {spot.avgRating.toFixed(2)}
          </div>{" "}
          <GoDotFill /> {reviewsArray.length}
        </div>
        <div className="reviews-container">
          {reviewsArray.map((review) => {
            return <ReviewIndexItem review={review} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SpotDetailsPage;
