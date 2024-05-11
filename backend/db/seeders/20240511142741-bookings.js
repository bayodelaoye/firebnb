"use strict";

const { Booking } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const validBookings = [
  {
    userId: 2,
    spotId: 1,
    startDate: "2024-05-12",
    endDate: "2024-05-19",
  },
  {
    userId: 6,
    spotId: 2,
    startDate: "2024-05-12",
    endDate: "2024-05-15",
  },
  {
    userId: 10,
    spotId: 3,
    startDate: "2024-05-15",
    endDate: "2024-05-18",
  },
  {
    userId: 12,
    spotId: 4,
    startDate: "2024-05-19",
    endDate: "2024-05-21",
  },
  {
    userId: 13,
    spotId: 5,
    startDate: "2024-05-26",
    endDate: "2024-05-30",
  },
  {
    userId: 14,
    spotId: 6,
    startDate: "2024-05-12",
    endDate: "2024-05-17",
  },
  {
    userId: 16,
    spotId: 7,
    startDate: "2024-05-28",
    endDate: "2024-05-31",
  },
  {
    userId: 17,
    spotId: 8,
    startDate: "2024-05-20",
    endDate: "2024-05-25",
  },
  {
    userId: 18,
    spotId: 9,
    startDate: "2024-05-18",
    endDate: "2024-05-24",
  },
  {
    userId: 20,
    spotId: 10,
    startDate: "2024-06-03",
    endDate: "2024-06-12",
  },
  {
    userId: 21,
    spotId: 11,
    startDate: "2024-06-10",
    endDate: "2024-06-15",
  },
  {
    userId: 22,
    spotId: 12,
    startDate: "2024-06-16",
    endDate: "2024-06-18",
  },
  {
    userId: 23,
    spotId: 13,
    startDate: "2024-07-01",
    endDate: "2024-07-15",
  },
  {
    userId: 24,
    spotId: 14,
    startDate: "2024-06-03",
    endDate: "2024-06-24",
  },
  {
    userId: 25,
    spotId: 15,
    startDate: "2024-07-05",
    endDate: "2024-07-09",
  },
  {
    userId: 26,
    spotId: 16,
    startDate: "2024-07-15",
    endDate: "2024-07-22",
  },
  {
    userId: 27,
    spotId: 17,
    startDate: "2024-05-31",
    endDate: "2024-06-11",
  },
  {
    userId: 28,
    spotId: 18,
    startDate: "2024-07-09",
    endDate: "2024-07-14",
  },
  {
    userId: 29,
    spotId: 19,
    startDate: "2024-06-23",
    endDate: "2024-06-29",
  },
  {
    userId: 30,
    spotId: 20,
    startDate: "2024-05-27",
    endDate: "2024-05-31",
  },
  {
    userId: 30,
    spotId: 1,
    startDate: "2024-06-10",
    endDate: "2024-06-15",
  },
  {
    userId: 29,
    spotId: 2,
    startDate: "2024-05-19",
    endDate: "2024-05-24",
  },
  {
    userId: 28,
    spotId: 3,
    startDate: "2024-06-24",
    endDate: "2024-06-29",
  },
  {
    userId: 27,
    spotId: 4,
    startDate: "2024-06-17",
    endDate: "2024-06-20",
  },
  {
    userId: 26,
    spotId: 5,
    startDate: "2024-05-31",
    endDate: "2024-06-03",
  },
  {
    userId: 25,
    spotId: 6,
    startDate: "2024-07-28",
    endDate: "2024-07-31",
  },
  {
    userId: 24,
    spotId: 7,
    startDate: "2024-05-20",
    endDate: "2024-05-25",
  },
  {
    userId: 23,
    spotId: 8,
    startDate: "2024-06-10",
    endDate: "2024-06-14",
  },
  {
    userId: 22,
    spotId: 9,
    startDate: "2024-05-31",
    endDate: "2024-06-02",
  },
  {
    userId: 21,
    spotId: 10,
    startDate: "2024-05-12",
    endDate: "2024-05-17",
  },
  {
    userId: 20,
    spotId: 11,
    startDate: "2024-05-12",
    endDate: "2024-05-25",
  },
  {
    userId: 18,
    spotId: 12,
    startDate: "2024-08-01",
    endDate: "2024-08-05",
  },
  {
    userId: 17,
    spotId: 13,
    startDate: "2024-07-17",
    endDate: "2024-07-19",
  },
  {
    userId: 16,
    spotId: 14,
    startDate: "2024-06-29",
    endDate: "2024-07-05",
  },
  {
    userId: 14,
    spotId: 15,
    startDate: "2024-07-13",
    endDate: "2024-07-24",
  },
  {
    userId: 13,
    spotId: 16,
    startDate: "2024-08-09",
    endDate: "2024-08-19",
  },
  {
    userId: 12,
    spotId: 17,
    startDate: "2024-06-24",
    endDate: "2024-06-31",
  },
  {
    userId: 10,
    spotId: 18,
    startDate: "2024-07-16",
    endDate: "2024-07-20",
  },
  {
    userId: 6,
    spotId: 19,
    startDate: "2024-07-01",
    endDate: "2024-07-07",
  },
  {
    userId: 2,
    spotId: 20,
    startDate: "2024-06-06",
    endDate: "2024-06-09",
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await Booking.bulkCreate(validBookings, {
        validate: true,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Bookings";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null, {});
  },
};
