const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load User model
const User = require("../../models/User");

// @route       GET api/users/test
// @desc        Tests users route
// @access      Public
router.get("/test", (req, res) => res.json({ msg: "User Works" }));

// @route       GET api/users/register
// @desc        Register new user
// @access      Public
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const avatar = gravatar.url(req.body.eamil, {
        s: "200", // size
        r: "pg", // rating
        d: "mm" // default avatar for non-avatar
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });
      // generate salt with length 10 to encrypt
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route       POST api/users/login
// @desc        Login User / Returning a JWT Token
// @access      Public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Find User bt email
  User.findOne({ email }).then(user => {
    // Check email
    if (!user) {
      res.status(404).json({ email: "User not found" });
    }
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        const payload = { id: user.id, name: user.name, avatar: user.avatar }; // Create JWT payload

        // Sign a token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            res.json({
              success: true,
              token: `Bearer ${token}`
            });
          }
        );
      } else {
        res.status(400).json({ password: "Password incorrect" });
      }
    });
  });
});

// @route       POST api/users/current
// @desc        Teturn current user
// @access      Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
