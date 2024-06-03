import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllSpots } from "../../store/spotReducer";

const CreateSpot = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);

  return <div>test</div>;
};

export default CreateSpot;
