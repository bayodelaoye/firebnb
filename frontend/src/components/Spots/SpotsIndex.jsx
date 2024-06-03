import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spotReducer";
import SpotIndexItem from "./SpotIndexItem";
import "./SpotsIndex.css";

const SpotsIndex = () => {
  const spotsObj = useSelector((state) => state.spots.allSpots);
  const spots = Object.values(spotsObj);
  const dispatch = useDispatch();

  //
  const spotReviews = useSelector((state) => state);
  console.log(spotReviews);

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);

  return (
    <div>
      <div className="spots-container">
        {spots.map((spot) => {
          return <SpotIndexItem spot={spot} key={spot.id} />;
        })}
      </div>
    </div>
  );
};

export default SpotsIndex;
