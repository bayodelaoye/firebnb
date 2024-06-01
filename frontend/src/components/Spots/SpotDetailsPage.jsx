import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllReviews } from "../../store/reviewReducer";
import { getSingleSpot } from "../../store/spotReducer";
import "./SpotDetailsPage.css";

const SpotDetailsPage = () => {
  const { spotId } = useParams();
  console.log(spotId);

  const spot = useSelector((state) => state);
  const dispatch = useDispatch();
  // const spot = useSelector((state) => state.spots.currentSpot);

  console.log(spot);

  useEffect(() => {
    dispatch(getSingleSpot(spotId));
    // dispatch(getAllReviews(spotId));
  }, [dispatch]);

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
    </div>
  );
};

export default SpotDetailsPage;
