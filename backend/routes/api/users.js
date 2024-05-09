const express = require("express");
const bcrypt = require("bcryptjs");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

const router = express.Router();

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
      return res.json(error);
    } else if (userSameEmail) {
      error.message = "User already exists";
      error.errors = {
        email: "User with that email already exists",
      };
      return res.json(error);
    } else if (userSameUsername) {
      error.message = "User already exists";
      error.errors = {
        username: "User with that username already exists",
      };
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
      if (credentialObj[key] === undefined) {
        error["errors"][key] = key + " is required";
      }
    }

    return res.json(error);
  }
});

module.exports = router;
