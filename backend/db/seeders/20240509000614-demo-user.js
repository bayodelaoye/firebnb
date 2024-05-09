"use strict";

const { User } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const validUsers = [
  {
    firstName: "Charlotte",
    lastName: "Franklin",
    email: "charlotte.franklin@example.com",
    username: "CharFrank34",
    hashedPassword: bcrypt.hashSync("bJ4*(,fGTU~z"),
  },
  {
    firstName: "Dane",
    lastName: "Kirsch",
    email: "dkirsch0@furl.net",
    username: "dkirsch0",
    hashedPassword: bcrypt.hashSync("tA4>cvTya`x|$,"),
  },
  {
    firstName: "Guilbert",
    lastName: "Jakubovsky",
    email: "gjakubovsky1@digg.com",
    username: "gjakubovsky1",
    hashedPassword: bcrypt.hashSync("uG6|E}$=Rq"),
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await User.bulkCreate(validUsers, {
        validate: true,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        username: { [Op.in]: ["CharFrank34", "dkirsch0", "gjakubovsky1"] },
      },
      {}
    );
  },
};
