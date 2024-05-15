const express = require("express");
const {
  Spot,
  User,
  SpotImage,
  Review,
  ReviewImage,
  Booking,
} = require("../../db/models");
const { where } = require("sequelize");

const router = express.Router();

router.delete("/:reviewImageId", async (req, res) => {
  const { user } = req;

  if (user) {
    const reviewImage = await Booking.findByPk(req.params.reviewImageId);

    if (!reviewImage) {
      res.statusCode = 404;
      res.json({ message: "Review image couldn't be found" });
    } else {
      await reviewImage.destroy();

      res.json({ message: "Successfully deleted" });
    }
  } else {
    res.statusCode = 401;
    res.json({ message: "Authentication required" });
  }
});

module.exports = router;
