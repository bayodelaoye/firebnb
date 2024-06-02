import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllReviewsForSpot } from "../../store/reviewReducer";
import { getSingleSpot } from "../../store/spotReducer";
import "./SpotDetailsPage.css";
import { FaStar } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";

const SpotDetailsPage = () => {
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spots.currentSpot);
  const spotReviews = useSelector((state) => state);
  //   const spot = useSelector((state) => state);
  const dispatch = useDispatch();
  console.log(spot);

  useEffect(() => {
    dispatch(getSingleSpot(spotId)).then(() =>
      dispatch(getAllReviewsForSpot(spotId))
    );
  }, [dispatch, spotId]);

  return (
    <div className="details-page-container">
      <h2>{spot.name}</h2>
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
          <h2>Hosted by {spot.Owner.firstName}</h2>
          <p>{spot.description}</p>
        </div>

        <div className="info-box-container">
          <div className="stay-info-container">
            <h2>${spot.price} night</h2>
            <p>
              <FaStar /> {spot.avgRating}
            </p>
          </div>
          <div className="btn-container">
            <button>Reserve</button>
          </div>
        </div>
      </div>
      <div className="line-break"></div>
    </div>
  );
};

export default SpotDetailsPage;
