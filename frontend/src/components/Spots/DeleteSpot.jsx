import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { removeSpot } from "../../store/spotReducer";
import { getCurrentUserSpots } from "../../store/spotReducer";
import { useModal } from "../../context/Modal";

function DeleteSpot({ spot }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleDelete = async (e) => {
    dispatch(removeSpot(spot.id)).then(closeModal);
    dispatch(getCurrentUserSpots());
  };

  return (
    <div>
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to remove this spot from the listings?</p>

      <div>
        <button onClick={handleDelete}>Yes (Delete Spot)</button>
        <button onClick={closeModal}>No (Keep Spot)</button>
      </div>
    </div>
  );
}
export default DeleteSpot;
