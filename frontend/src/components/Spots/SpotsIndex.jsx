import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spotReducer";
import { useState } from "react";
import SpotIndexItem from "./SpotIndexItem";
import "./SpotsIndex.css";

const SpotsIndex = () => {
  const spotsObj = useSelector((state) => state.spots.allSpots);
  const [isLoaded, setIsLoaded] = useState(false);
  let spots;

  if (spotsObj === undefined) {
    // do nothing and proceed
    window.location.reload();
  } else {
    spots = Object.values(spotsObj);
  }
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSpots()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div>
      {isLoaded ? (
        <div className="spots-container">
          {spots.map((spot) => {
            console.log(spot);
            return <SpotIndexItem spot={spot} key={spot.id} />;
          })}
        </div>
      ) : (
        <>Loading</>
      )}
    </div>
  );
};

export default SpotsIndex;
