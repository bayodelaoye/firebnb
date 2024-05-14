const express = require("express");
const {
  Spot,
  User,
  SpotImage,
  Review,
  ReviewImage,
} = require("../../db/models");
const { where } = require("sequelize");

const router = express.Router();

router.post("/:reviewId/images", async (req, res) => {
  const error = {
    message: {},
    errors: {},
  };
  const { user } = req;
  const { url } = req.body;

  if (user) {
    if (url) {
      const review = await Review.findOne({
        where: {
          id: req.params.reviewId,
        },
      });

      if (!review) {
        res.statusCode = 404;
        res.json({ message: "Review couldn't be found" });
      }

      const reviewImage = await ReviewImage.create({
        reviewId: req.params.reviewId,
        url,
      });

      res.json(reviewImage);
    } else {
      const reviewImageObj = {
        url,
      };

      res.statusCode = 400;
      error.message = "Bad Request";

      for (let key in reviewImageObj) {
        if (reviewImageObj[key] === undefined || reviewImageObj[key] === "") {
          error["errors"][key] = key + " is required";
        }
      }

      return res.json(error);
    }
  } else {
    res.statusCode = 403;
    res.json({ message: "Forbidden" });
  }
});

module.exports = router;
