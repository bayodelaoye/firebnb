import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
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
  const userId = useSelector((state) => state.session.user.id);
  const ownerId = spot.ownerId;
  const reviewsArray = Object.values(spotReviews);
  let reviewCount = reviewsArray.length;
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();

  console.log(spotReviews);

  useEffect(() => {
    dispatch(getSingleSpot(spotId))
      .then(() => dispatch(getAllReviewsForSpot(spotId)))
      .then(() => setIsLoaded(true));
  }, [dispatch, spotId]);

  return (
    <div className="details-page-container">
      {isLoaded ? (
        <div>
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
                {reviewsArray.length > 0 ? <GoDotFill /> : <></>}
                {reviewsArray.length === 0 ? (
                  <p>New</p>
                ) : reviewCount === 1 ? (
                  <p>{reviewCount} review</p>
                ) : (
                  <p>{reviewCount} reviews</p>
                )}
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
              {reviewsArray.length > 0 ? <GoDotFill /> : <></>}
              {reviewsArray.length === 0 ? (
                <p>New</p>
              ) : reviewCount === 1 ? (
                <p>{reviewCount} review</p>
              ) : (
                <p>{reviewCount} reviews</p>
              )}
            </div>
            <div className="reviews-container">
              {reviewCount === 0 && ownerId !== userId ? (
                <p>Be the first to post a review!</p>
              ) : (
                <></>
              )}
              {reviewsArray.map((review) => {
                return <ReviewIndexItem review={review} key={review.id} />;
              })}
            </div>
          </div>
        </div>
      ) : (
        <>Loading</>
      )}
    </div>
  );
};

export default SpotDetailsPage;
