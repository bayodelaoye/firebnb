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

  const users = await User.unscoped().findAll();

  if ((firstName, lastName, email, username, password)) {
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === email) {
        error.message = "User already exists";
        error.errors = {
          email: "User with that email already exists",
        };
        return res.json(error);
      } else if (users[i].username === username) {
        error.message = "User already exists";
        error.errors = {
          username: "User with that username already exists",
        };
        return res.json(error);
      }
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
