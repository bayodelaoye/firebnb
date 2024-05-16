const express = require("express");
const { Spot, SpotImage } = require("../../db/models");

const router = express.Router();

router.delete("/:spotImageId", async (req, res) => {
  const { user } = req;

  if (user) {
    const spotImage = await SpotImage.findByPk(req.params.spotImageId);

    if (!spotImage) {
      res.statusCode = 404;
      res.json({ message: "Spot image couldn't be found" });
    } else {
      const spot = await Spot.findOne({
        where: {
          id: spotImage.spotId,
        },
      });

      if (user.id !== spot.ownerId) {
        res.statusCode = 403;
        res.json({ message: "Forbidden" });
      } else {
        if (spotImage.preview === true) {
          const newSpotImage = await SpotImage.findOne({
            where: {
              spotId: spotImage.spotId,
              preview: false,
            },
          });

          if (!newSpotImage) {
            await spotImage.destroy();

            res.json({ message: "Successfully deleted" });
          } else {
            newSpotImage.preview = true;

            await newSpotImage.save();

            await spotImage.destroy();

            res.json({ message: "Successfully deleted" });
          }
        } else {
          await spotImage.destroy();

          res.json({ message: "Successfully deleted" });
        }
      }
    }
  } else {
    res.statusCode = 401;
    res.json({ message: "Authentication required" });
  }
});

module.exports = router;
