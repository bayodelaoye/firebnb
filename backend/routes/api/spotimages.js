const express = require("express");
const { Spot, User, SpotImage, Review } = require("../../db/models");
const { where } = require("sequelize");

const router = express.Router();

router.delete("/:spotImageId", async (req, res) => {
  const { user } = req;
  if (user) {
    const spotImage = await SpotImage.findByPk(req.params.spotImageId);

    const spot = await Spot.findAll({
      where: {
        id: spotImage.spotId,
      },
    });

    if (user.id !== spot.ownerId) {
      res.statusCode = 403;
      res.json({ message: "Forbidden" });
    }
  } else {
    res.statusCode = 401;
    res.json({ message: "Authentication required" });
  }
});

module.exports = router;
