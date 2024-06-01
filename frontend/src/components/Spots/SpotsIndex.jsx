import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spotReducer";
import SpotIndexItem from "./SpotIndexItem";

const SpotsIndex = () => {
  const spotsObj = useSelector((state) => state.spots.allSpots);
  const spots = Object.values(spotsObj);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);

  return (
    <div>
      <div>
        {spots.map((spot) => {
          <SpotIndexItem spot={spot} key={spot.id} />;
        })}
      </div>
    </div>
  );
};

export default SpotsIndex;
