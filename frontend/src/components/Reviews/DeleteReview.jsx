import { useDispatch } from "react-redux";
import { removeReview } from "../../store/reviewReducer";
import { getAllReviewsForSpot } from "../../store/reviewReducer";
import { useModal } from "../../context/Modal";
import { getSingleSpot } from "../../store/spotReducer";

function DeleteReview({ review }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleDelete = async () => {
    dispatch(removeReview(review.id))
      .then(closeModal)
      .then(() => dispatch(getAllReviewsForSpot(review.spotId)))
      .then(() => dispatch(getSingleSpot(review.spotId)));
  };

  return (
    <div>
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete this review?</p>

      <div>
        <button onClick={handleDelete}>Yes (Delete Review)</button>
        <button onClick={closeModal} className="do-not-delete-btn">
          No (Keep Review)
        </button>
      </div>
    </div>
  );
}
export default DeleteReview;
