const ReviewIndexItem = ({ review, spot }) => {
  return (
    <>
      {review.spotId === spot.id ? (
        <>
          <h2>{review.User.firstName}</h2>
          <p>{review.createdAt.split("T")[0]}</p>
          <p>{review.review}</p>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default ReviewIndexItem;
