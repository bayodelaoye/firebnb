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
  const reviewImagesSet = new Set();

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
      } else {
        const reviewImages = await ReviewImage.findAll();

        for (let i = 0; i < reviewImages.length; i++) {
          reviewImagesSet.add(reviewImages[i].reviewId);
        }

        if (reviewImagesSet.has(+req.params.reviewId)) {
          console.log("t");
          res.statusCode = 400;
          res.json({
            message: "The limit to the amount of review images is reached",
          });
        } else {
          const reviewImage = await ReviewImage.create({
            reviewId: req.params.reviewId,
            url,
          });

          res.json(reviewImage);
        }
      }
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

router.get("/current", async (req, res) => {
  const { user } = req;

  if (user) {
    const reviews = await Review.findAll({
      where: {
        userId: user.id,
      },
    });

    res.json(reviews);
  } else {
    res.statusCode = 403;
    res.json({ message: "Forbidden" });
  }
});

router.put("/:reviewId", async (req, res) => {
  const { user } = req;
  const { review, stars } = req.body;
  const error = {
    message: {},
    errors: {},
  };

  if (user) {
    if (review && stars) {
      const editReview = await Review.findByPk(req.params.reviewId);

      if (!editReview) {
        res.statusCode = 404;
        res.json({ message: "Review couldn't be found" });
      }

      editReview.review = review;
      editReview.stars = stars;

      const updatedReview = await editReview.save();

      res.json(updatedReview);
    } else {
      const reviewObj = {
        review,
        stars,
      };

      res.statusCode = 400;
      error.message = "Bad Request";

      for (let key in reviewObj) {
        if (reviewObj[key] === undefined || reviewObj[key] === "") {
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
