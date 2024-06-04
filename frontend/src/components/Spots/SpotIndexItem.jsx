import { Link } from "react-router-dom";
import "./SpotsIndex.css";
import { FaStar } from "react-icons/fa";
import { sendPreviewImage } from "./CreateSpot";

const SpotIndexItem = ({ spot }) => {
  return (
    <div className="spot-container">
      <Link to={`/spots/${spot.id}`}>
        <div className="spot-image-container">
          <img src={spot.previewImage ? spot.previewImage : sendPreviewImage} />
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
              <FaStar /> {spot.avgRating ? spot.avgRating.toFixed(2) : "New"}
            </p>
          </div>
          <p>${spot.price} night</p>
        </div>
      </Link>
    </div>
  );
};

export default SpotIndexItem;
