import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const SpotIndexItem = ({ spot }) => {
  console.log("TEST!", spot);
  return (
    <div>
      jjhjbjhqbdhj
      <Link>
        <div>
          <img src={spot.previewImage} />
        </div>
      </Link>
    </div>
  );
};

export default SpotIndexItem;
