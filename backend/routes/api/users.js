const express = require("express");
const bcrypt = require("bcryptjs");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateSignup = [
  check("firstName")
    .exists({ checkFalsy: true })
    .isLength({ min: 3 })
    .withMessage("First name must be 3 characters or more."),
  check("lastName")
    .exists({ checkFalsy: true })
    .isLength({ min: 3 })
    .withMessage("Last name must be 3 characters or more."),
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

router.post("/", async (req, res) => {
  const error = {
    message: {},
    errors: {},
  };

  const { firstName, lastName, email, username, password } = req.body;

  if (firstName && lastName && email && username && password) {
    const userSameEmail = await User.scope({
      method: ["findUser", email],
    }).findOne();

    const userSameUsername = await User.scope({
      method: ["findUser", username],
    }).findOne();

    if (userSameEmail && userSameUsername) {
      error.message = "User already exists";
      error.errors = {
        email: "User with that email already exists",
        username: "User with that username already exists",
      };

      res.statusCode = 500;

      return res.json(error);
    } else if (userSameEmail) {
      error.message = "User already exists";
      error.errors = {
        email: "User with that email already exists",
      };

      res.statusCode = 500;

      return res.json(error);
    } else if (userSameUsername) {
      error.message = "User already exists";
      error.errors = {
        username: "User with that username already exists",
      };

      res.statusCode = 500;

      return res.json(error);
    }

    if (password.length < 6) {
      error.message = "Password is not long";
      error.errors = {
        password: "Password must be 6 characters or more.",
      };

      res.statusCode = 403;

      return res.json(error);
    }

    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      firstName,
      lastName,
      email,
      username,
      hashedPassword,
    });

    const safeUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
    };

    await setTokenCookie(res, safeUser);

    return res.json({
      user: safeUser,
    });
  } else {
    const credentialObj = {
      firstName,
      lastName,
      email,
      username,
      password,
    };

    res.statusCode = 400;
    error.message = "Bad Request";

    for (let key in credentialObj) {
      if (credentialObj[key] === undefined || credentialObj[key] === "") {
        error["errors"][key] = key + " is required";
      }
    }

    return res.json(error);
  }
});

router.get("/all", async (req, res) => {
  let allUsers = await User.unscoped().findAll();
  res.status(200);
  return res.json(allUsers);
});

module.exports = router;
