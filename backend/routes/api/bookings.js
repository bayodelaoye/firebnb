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

router.get("/current", async (req, res) => {
  const { user } = req;

  if (user) {
    const bookings = await Booking.unscoped().findAll({
      where: {
        userId: user.id,
      },
      include: [{ model: Spot }],
    });

    res.json({
      Bookings: bookings,
    });
  } else {
    res.statusCode = 401;
    res.json({ message: "Authentication required" });
  }
});

router.put("/:bookingId", async (req, res) => {
  const { user } = req;
  const error = {
    message: {},
    errors: {},
  };

  if (user) {
    const { startDate, endDate } = req.body;

    if (startDate && endDate) {
      const booking = await Booking.unscoped().findByPk(req.params.bookingId);

      if (!booking) {
        res.statusCode = 404;
        res.json({ message: "Booking couldn't be found" });
      } else {
        const userBooking = await Booking.findOne({
          where: {
            id: req.params.bookingId,
            userId: user.id,
          },
        });

        if (!userBooking) {
          res.statusCode = 403;
          res.json({ message: "Forbidden" });
        } else {
          const bookings = await Booking.findAll({
            where: {
              spotId: booking.spotId,
            },
          });

          for (let i = 0; i < bookings.length; i++) {
            if (
              new Date(bookings[i].startDate).getTime() ===
                new Date(startDate).getTime() &&
              new Date(bookings[i].endDate).getTime() ===
                new Date(endDate).getTime()
            ) {
              res.statusCode = 403;
              error.message =
                "Sorry, this spot is already booked for the specified dates";
              error["errors"].startDate =
                "Start date conflicts with an existing booking";
              error["errors"].endDate =
                "End date conflicts with an existing booking";
              res.json(error);
            }
          }

          if (Date.now() > new Date(endDate)) {
            res.statusCode = 403;
            res.json({ message: "Past bookings can't be modified" });
          } else if (new Date(startDate) < Date.now()) {
            error.message = "Dates cannot be in the past";
            error["errors"].startDate = "The start date cannot be in the past";
            res.json(error);
          } else if (
            new Date(booking.startDate).getTime() ===
              new Date(startDate).getTime() &&
            new Date(booking.endDate).getTime() === new Date(endDate).getTime()
          ) {
            res.statusCode = 400;
            error.message =
              "The start and end date is already the same as your inputed values";
            error["errors"].startDate =
              "The start date of this booking is already the same as your inputed value";
            error["errors"].endDate =
              "The end date of this booking is already the same as your inputed value";
            res.json(error);
          } else if (startDate === endDate) {
            res.statusCode = 400;
            error.message = "The start and end date cannot be the same";
            error["errors"].startDate =
              "The start date is the same as the end date";
            error["errors"].endDate =
              "The end date is the same as the start date";
            res.json(error);
          } else if (startDate > endDate) {
            res.statusCode = 400;
            error.message = "End date cannot be before start date";
            error["errors"].startDate =
              "The start date must be before the end date";
            error["errors"].endDate =
              "The end date must be after the start date";
            res.json(error);
          } else if (
            new Date(booking.startDate).getTime() ===
            new Date(startDate).getTime()
          ) {
            error.message =
              "Start date cannot be the same as the existing start date";
            error["errors"].startDate =
              "The start date needs to be different than the existing start date";
            res.json(error);
          } else if (
            new Date(startDate).getTime() ===
            new Date(booking.endDate).getTime()
          ) {
            error.message =
              "Start date cannot be the same as the existing end date";
            error["errors"].startDate =
              "The start date needs to be different than the existing end date";
            res.json(error);
          } else if (
            new Date(endDate).getTime() ===
            new Date(booking.startDate).getTime()
          ) {
            error.message =
              "End date cannot be the same as the existing start date";
            error["errors"].endDate =
              "The end date needs to be different than the existing start date";
            res.json(error);
          } else if (
            new Date(endDate).getTime() === new Date(booking.endDate).getTime()
          ) {
            error.message =
              "End date cannot be the same as the existing end date";
            error["errors"].endDate =
              "The end date needs to be different than the existing end date";
            res.json(error);
          } else if (
            new Date(startDate) > new Date(booking.startDate) &&
            new Date(startDate) < new Date(booking.endDate) &&
            new Date(endDate) > new Date(startDate) &&
            new Date(endDate) < new Date(booking.endDate)
          ) {
            error.message = "Dates cannot be within an existing booking";
            error["errors"].startDate =
              "The start date cannot be within an existing booking";
            error["errors"].endDate =
              "The end date cannot be within an existing booking";
            res.json(error);
          } else if (
            new Date(startDate) < new Date(booking.startDate) &&
            new Date(endDate) > new Date(booking.endDate)
          ) {
            error.message = "Dates cannot surround an existing booking";
            error["errors"].startDate =
              "The start date cannot surround an existing booking";
            error["errors"].endDate =
              "The end date cannot surround an existing booking";
            res.json(error);
          } else if (
            new Date(startDate) > new Date(booking.startDate) &&
            new Date(startDate) < new Date(booking.endDate)
          ) {
            error.message = "Start date cannot be during the existing booking";
            error["errors"].startDate =
              "The start date needs to be outside the existing booking";
            res.json(error);
          } else if (
            new Date(endDate) > new Date(booking.startDate) &&
            new Date(endDate) < new Date(booking.endDate)
          ) {
            error.message = "End date cannot be during the existing booking";
            error["errors"].endDate =
              "The end date needs to be outside the existing booking";
            res.json(error);
          } else {
            booking.startDate = startDate;
            booking.endDate = endDate;

            const newBooking = await booking.save();

            res.json(newBooking);
          }
        }
      }
    } else {
      const bookingObj = {
        startDate,
        endDate,
      };

      res.statusCode = 400;
      error.message = "Bad Request";

      for (let key in bookingObj) {
        if (bookingObj[key] === undefined || bookingObj[key] === "") {
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

router.delete("/:bookingId", async (req, res) => {
  const { user } = req;

  if (user) {
    const booking = await Booking.findByPk(req.params.bookingId);

    if (!booking) {
      res.statusCode = 404;
      res.json({ message: "Booking couldn't be found" });
    } else {
      const userBooking = await Booking.findOne({
        where: {
          id: req.params.bookingId,
          userId: user.id,
        },
      });

      if (!userBooking) {
        res.statusCode = 403;
        res.json({ message: "Forbidden" });
      } else {
        await userBooking.destroy();

        res.json({ message: "Successfully deleted" });
      }
    }
  } else {
    res.statusCode = 401;
    res.json({ message: "Authentication required" });
  }
});

module.exports = router;
