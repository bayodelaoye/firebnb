import { Link } from "react-router-dom";
import "./SpotsIndex.css";
import { FaStar } from "react-icons/fa";

const SpotIndexItem = ({ spot }) => {
  return (
    <div className="spot-container">
      <h2>{spot.id}</h2>
      <Link to={`/spots/${spot.id}`}>
        <div className="spot-image-container">
          <img src={spot.previewImage} />
        </div>
        <div className="spot-text-container">
          <h2>{spot.name}</h2>
          <div className="spot-location-rating-container">
            <p>
              {spot.city}, {spot.state}
            </p>
            <p>
              <FaStar /> {spot.avgRating ? spot.avgRating : "New"}
            </p>
          </div>
          <p>${spot.price} night</p>
        </div>
      </Link>
    </div>
  );
};

export default SpotIndexItem;
