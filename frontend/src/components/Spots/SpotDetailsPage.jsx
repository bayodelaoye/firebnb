import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getAllReviewsForSpot } from "../../store/reviewReducer";
import { getSingleSpot } from "../../store/spotReducer";
import "./SpotDetailsPage.css";
import { FaStar } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import ReviewIndexItem from "../Reviews/ReviewIndexItem";
import OpenModalButton from "../OpenModalButton";
import CreateReview from "../Reviews/CreateReview";

const SpotDetailsPage = () => {
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spots.currentSpot);
  const allSpots = useSelector((state) => state.spots.allSpots);
  const spotReviews = useSelector((state) => state.reviews.spot);
  const userSession = useSelector((state) => state.session.user);

  let countReviews = 0;
  let isReviewPresent = false;

  const findSpot = Object.values(allSpots).find((spot) => {
    return +spotId === +spot.id;
  });

  const ownerId = findSpot.ownerId;
  const reviewsArray = Object.values(spotReviews);
  reviewsArray.forEach((review) => {
    if (review.spotId === spot.id) {
      countReviews++;
    }
  });
  let reviewCount = countReviews;
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();

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
                {spot.SpotImages[1] ? (
                  <img src={spot.SpotImages[1].url} />
                ) : (
                  <></>
                )}
              </div>
              <div className="third-image-container">
                {spot.SpotImages[2] ? (
                  <img src={spot.SpotImages[2].url} />
                ) : (
                  <></>
                )}
                {spot.SpotImages[3] ? (
                  <img src={spot.SpotImages[3].url} />
                ) : (
                  <></>
                )}
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
                  <FaStar />{" "}
                  {spot.avgRating ? spot.avgRating.toFixed(2) : "New"}
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
                <FaStar /> {spot.avgRating ? spot.avgRating.toFixed(2) : "New"}
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
              {reviewCount === 0 && ownerId !== userSession.id ? (
                <p>Be the first to post a review!</p>
              ) : (
                <></>
              )}

              {reviewsArray.map((review) => {
                {
                  review.spotId == spot.id ? (
                    <>
                      {review.User.id === userSession.id ? (
                        (isReviewPresent = true)
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <></>
                  );
                }
              })}

              {isReviewPresent === true ? (
                <></>
              ) : (
                <OpenModalButton
                  buttonText="Post Your Review"
                  modalComponent={
                    <CreateReview spot={spot} user={userSession} />
                  }
                />
              )}

              {reviewsArray
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((review) => {
                  return (
                    <ReviewIndexItem
                      review={review}
                      spot={spot}
                      user={userSession}
                      key={review.id}
                    />
                  );
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
