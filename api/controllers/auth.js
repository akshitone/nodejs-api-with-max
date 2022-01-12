const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const logger = require("../../util/logger");

const User = require("../models/user");

exports.signup = (req, res, next) => {
  User.find({ email: req.body.email })
    .then((user) => {
      if (user.length > 0) {
        return res.status(409).json({
          message: "Email already exists",
        });
      } else {
        bcrypt
          .hash(req.body.password, 12)
          .then((hashedPassword) => {
            const user = new User({
              _id: mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hashedPassword,
            });
            user
              .save()
              .then((result) => {
                res.status(201).json({
                  message: "User created successfully",
                  createdUser: {
                    _id: result._id,
                    email: result.email,
                  },
                });
                logger.info("User created successfully");
              })
              .catch((err) => {
                res.status(500).json({
                  error: err,
                });
                logger.error(err);
              });
          })
          .catch((err) => {
            res.status(500).json({
              error: err,
            });
            logger.error(err);
          });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
      logger.error(err);
    });
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        bcrypt
          .compare(req.body.password, user.password)
          .then((result) => {
            if (result) {
              const token = jwt.sign(
                { email: user.email, userId: user._id },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
              );
              res.status(200).json({
                message: "User logged in successfully",
                userId: user._id,
                token: token,
              });
              logger.info("User logged in successfully");
            } else {
              res.status(401).json({
                message: "Invalid email or password",
              });
              logger.info("Incorrect password");
            }
          })
          .catch((err) => {
            res.status(500).json({
              error: err,
            });
            logger.error(err);
          });
      } else {
        res.status(401).json({
          message: "Invalid email or password",
        });
        logger.info("User not found");
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
      logger.error(err);
    });
};
