const express = require("express");
const { Spot, User, SpotImage, Review } = require("../../db/models");

const router = express.Router();

router.get("/", async (req, res) => {
  const spots = await Spot.findAll();

  const payLoadSpotsArray = [];
  let avgRatingArray = [];

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
    const payload = {
      id: spots[k].id,
      ownerId: spots[k].ownerId,
      address: spots[k].address,
      city: spots[k].city,
      state: spots[k].state,
      country: spots[k].country,
      lat: spots[k].lat,
      lng: spots[k].lng,
      name: spots[k].name,
      description: spots[k].description,
      price: spots[k].price,
      avgRating: avgRatingArray[k],
    };

    payLoadSpotsArray.push(payload);
  }

  res.json(payLoadSpotsArray);
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

module.exports = router;
