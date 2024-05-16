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
  const { user } = req;
  const { url } = req.body;
  const reviewImagesSet = new Set();
  const maxReviewObj = {};
  const error = {
    message: {},
    errors: {},
  };

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
        const ownerReview = await Review.findOne({
          where: {
            id: req.params.reviewId,
            userId: user.id,
          },
        });

        if (!ownerReview) {
          res.statusCode = 403;
          res.json({ message: "Forbidden" });
        } else {
          const reviewImages = await ReviewImage.findAll({
            where: {
              reviewId: req.params.reviewId,
            },
          });

          if (reviewImages.length > 10) {
            res.statusCode = 403;
            res.json({
              message: "Maximum number of images for this resource was reached",
            });
          } else {
            const reviewImage = await ReviewImage.create({
              reviewId: req.params.reviewId,
              url,
            });

            res.json(reviewImage);
          }
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
    res.statusCode = 401;
    res.json({ message: "Authentication required" });
  }
});

router.get("/current", async (req, res) => {
  const { user } = req;

  if (user) {
    const reviews = await Review.findAll({
      where: {
        userId: user.id,
      },
      include: [{ model: User }, { model: Spot }, { model: ReviewImage }],
    });

    res.json({ Reviews: reviews });
  } else {
    res.statusCode = 401;
    res.json({ message: "Authentication required" });
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
      const userReview = await Review.findOne({
        where: {
          id: req.params.reviewId,
          userId: user.id,
        },
      });

      if (!editReview) {
        res.statusCode = 404;
        res.json({ message: "Review couldn't be found" });
      }

      if (!userReview) {
        res.statusCode = 403;
        res.json({ message: "Forbidden" });
      } else {
        editReview.review = review;
        editReview.stars = stars;

        const updatedReview = await editReview.save();

        res.json(updatedReview);
      }
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
    res.statusCode = 401;
    res.json({ message: "Authentication required" });
  }
});

router.delete("/:reviewId", async (req, res) => {
  const { user } = req;

  if (user) {
    const review = await Review.findByPk(req.params.reviewId);

    if (!review) {
      res.statusCode = 404;
      res.json({ message: "Review couldn't be found" });
    } else {
      const userReview = await Review.findOne({
        where: {
          id: req.params.reviewId,
          userId: user.id,
        },
      });

      if (!userReview) {
        res.statusCode = 403;
        res.json({ message: "Forbidden" });
      } else {
        await review.destroy();

        res.json({ message: "Successfully deleted" });
      }
    }
  } else {
    res.statusCode = 401;
    res.json({ message: "Authentication required" });
  }
});

module.exports = router;
