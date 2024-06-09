import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import "./ManageSpots.css";
import { useNavigate } from "react-router-dom";
import ManageSpotsIndexItem from "./ManageSpotsIndexItem";
import { useEffect } from "react";
import { getCurrentUserSpots } from "../../store/spotReducer";

const ManageSpots = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUserSpots = useSelector(
    (state) => state.spots.currentUserSpots.Spots
  );
  let spotsArray;

  if (currentUserSpots === undefined) {
    //do nothing and proceed
  } else {
    spotsArray = Object.values(currentUserSpots);
  }

  useEffect(() => {
    dispatch(getCurrentUserSpots()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="manage-spots-container">
      {isLoaded ? (
        <>
          <div className="manage-text-btn">
            <h2>Manage Spots</h2>
            <button onClick={() => navigate("/spots")}>
              Create a New Spot
            </button>
          </div>
          <div className="individual-spot-container">
            {currentUserSpots === undefined ? (
              <></>
            ) : (
              spotsArray.map((spot) => {
                return <ManageSpotsIndexItem spot={spot} key={spot.id} />;
              })
            )}
          </div>{" "}
        </>
      ) : (
        <>Loading</>
      )}
    </div>
  );
};

export default ManageSpots;
