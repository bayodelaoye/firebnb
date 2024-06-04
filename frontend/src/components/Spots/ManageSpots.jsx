import { useSelector } from "react-redux";
import "./ManageSpots.css";
import { useNavigate } from "react-router-dom";
import ManageSpotsIndexItem from "./ManageSpotsIndexItem";

const ManageSpots = () => {
  const userSession = useSelector((state) => state.session.user);
  const allSpotsObj = useSelector((state) => state.spots.allSpots);
  const allSpotsArray = Object.values(allSpotsObj);
  const navigate = useNavigate();
  const spotsArray = [];

  const findOwnerSpots = () => {
    allSpotsArray.forEach((spot) => {
      if (userSession.id === spot.ownerId) {
        spotsArray.push(spot);
      }
    });
  };

  findOwnerSpots();

  return (
    <div className="manage-spots-container">
      <div className="manage-text-btn">
        <h2>Manage Spots</h2>
        <button onClick={() => navigate("/spots")}>Create a New Spot</button>
      </div>

      <div className="individual-spot-container">
        {spotsArray.map((spot) => {
          return <ManageSpotsIndexItem spot={spot} key={spot.id} />;
        })}
      </div>
    </div>
  );
};

export default ManageSpots;
