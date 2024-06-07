import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spotReducer";
import { useState } from "react";
// import SpotIndexItem from "./SpotIndexItem";
import "./SpotsIndex.css";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const SpotsIndex = () => {
  const spotsObj = useSelector((state) => state.spots.allSpots);
  const [isLoaded, setIsLoaded] = useState(false);
  let spots;

  if (spotsObj === undefined) {
    // do nothing again 1hjbhjb
  } else {
    spots = Object.values(spotsObj);
  }
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSpots()).then(() => setIsLoaded(true));
  }, [dispatch]);

  console.log(spots);
  return (
    <div>
      {isLoaded ? (
        <div className="spots-container">
          {spots.map((spot) => {
            console.log(spot);
            // return <SpotIndexItem spot={spot} />;
            <div className="spot-container">
              <Link to={`/spots/${spot.id}`}>
                <div className="spot-image-container">
                  <img src={spot.previewImage} />
                </div>
                <div className="tooltip">
                  <span className="tooltiptext">{spot.name}</span>
                </div>
                <div className="spot-text-container">
                  <h2>{spot.name}</h2>
                  <div className="spot-location-rating-container">
                    <p>
                      {spot.city}, {spot.state}
                    </p>
                    <p>
                      <FaStar />{" "}
                      {spot.avgRating
                        ? Number(spot.avgRating).toFixed(2)
                        : "New"}
                    </p>
                  </div>
                  <p>${spot.price} night</p>
                </div>
              </Link>
            </div>;
          })}
        </div>
      ) : (
        <>Loading</>
      )}
    </div>
  );
};

export default SpotsIndex;
