const express = require("express");
const { Spot, User, SpotImage, Review } = require("../../db/models");
const { where } = require("sequelize");

const router = express.Router();

const populateRatingAndImageColumn = async () => {
  const spots = await Spot.findAll();
  const previewImages = await SpotImage.findAll({
    where: {
      preview: true,
    },
  });

  const avgRatingArray = [];

  for (let i = 1; i <= spots.length; i++) {
    let ratingAmount = 0;

    const reviewSpecificSpotId = await Review.findAll({
      where: {
        spotId: i,
      },
    });

    for (let j = 0; j < reviewSpecificSpotId.length; j++) {
      ratingAmount += reviewSpecificSpotId[j].stars;
    }
    avgRatingArray.push(ratingAmount / reviewSpecificSpotId.length);
  }

  for (let k = 0; k < spots.length; k++) {
    spots[k].avgRating = avgRatingArray[k];
    spots[k].previewImage = previewImages[k].url;

    await spots[k].save();
    console.log(spots[k]);
  }

  return spots;
};

router.get("/", async (req, res) => {
  const spots = await populateRatingAndImageColumn();

  res.json(spots);
});

router.post("/", async (req, res) => {
  const error = {
    message: {},
    errors: {},
  };

  const {
    ownerId,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  } = req.body;

  const numberOUsers = await User.findAll();

  if (
    ownerId &&
    address &&
    city &&
    state &&
    country &&
    lat &&
    lng &&
    name &&
    description &&
    price
  ) {
    if (numberOUsers.length < ownerId) {
      res.statusCode = 500;
      res.json({ message: `There is no owner with the id of ${ownerId}` });
    }

    const newSpot = await Spot.create({
      ownerId,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    });

    res.json(newSpot);
  } else {
    const spotObj = {
      ownerId,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    };

    res.statusCode = 400;
    error.message = "Bad Request";

    for (let key in spotObj) {
      if (spotObj[key] === undefined || spotObj[key] === "") {
        error["errors"][key] = key + " is required";
      }
    }

    return res.json(error);
  }
});

router.post("/:spotId/images", async (req, res) => {
  const error = {
    message: {},
    errors: {},
  };

  const { url, preview } = req.body;

  const spot = await Spot.findByPk(req.params.spotId);

  if (url && preview) {
    if (spot === null) {
      res.statusCode = 500;
      res.json({
        message: `Spot couldn't be found`,
      });
    }

    const spotImages = await SpotImage.findAll({
      where: {
        spotId: spot.id,
      },
    });

    if (preview === true && spotImages.length > 0) {
      for (let i = 0; i < spotImages.length; i++) {
        if (spotImages[i].preview === true) {
          spotImages[i].preview = false;

          await spotImages[i].save();
        }
      }
    }

    const spotImage = await SpotImage.create({
      spotId: spot.id,
      url,
      preview,
    });

    res.json(spotImage);
  } else {
    const spotImageObj = {
      url,
      preview,
    };

    res.statusCode = 400;
    error.message = "Bad Request";

    for (let key in spotImageObj) {
      if (spotImageObj[key] === undefined || spotImageObj[key] === "") {
        error["errors"][key] = key + " is required";
      }
    }

    return res.json(error);
  }
});

router.get("/current", async (req, res) => {
  const spots = await populateRatingAndImageColumn();
  const { user } = req;
  if (user) {
    const safeUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
    };

    const userSpots = await Spot.findAll({
      where: {
        ownerId: safeUser.id,
      },
    });

    return res.json({
      Spots: userSpots,
    });
  } else return res.json({ message: `User not logged in` });
});

module.exports = router;
