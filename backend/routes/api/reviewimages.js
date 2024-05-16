const express = require("express");
const { Review, ReviewImage } = require("../../db/models");

const router = express.Router();

router.delete("/:reviewImageId", async (req, res) => {
  const { user } = req;

  if (user) {
    const reviewImage = await ReviewImage.unscoped().findByPk(
      req.params.reviewImageId
    );

    if (!reviewImage) {
      res.statusCode = 404;
      res.json({ message: "Review image couldn't be found" });
    } else {
      const review = await Review.findOne({
        where: {
          id: reviewImage.reviewId,
        },
      });

      if (user.id !== review.userId) {
        res.statusCode = 403;
        res.json({ message: "Forbidden" });
      } else {
        await reviewImage.destroy();

        res.json({ message: "Successfully deleted" });
      }
    }
  } else {
    res.statusCode = 401;
    res.json({ message: "Authentication required" });
  }
});

module.exports = router;
