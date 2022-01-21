const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const logger = require("../../util/logger");

const User = require("../models/user");

class AuthHelper {
  constructor() {}

  async findUser(email) {
    try {
      return await User.findOne({ email })
        .then((user) => {
          return user;
        })
        .catch((err) => {
          logger.error("Error while finding user");
          return err;
        });
    } catch (err) {
      logger.error(err.message);
      return err;
    }
  }

  async hashingPassword(password) {
    try {
      return await bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          logger.info("Password hashed successfully");
          return hashedPassword;
        })
        .catch((err) => {
          logger.error("Error while hashing password");
          return err;
        });
    } catch (err) {
      logger.error(err.message);
      return err;
    }
  }

  async saveUser(email, password) {
    try {
      return await User.create({
        _id: mongoose.Types.ObjectId(),
        email,
        password,
      })
        .then((result) => {
          logger.info("User created successfully");
          return {
            status: 201,
            message: {
              message: "User created successfully",
              createdUser: {
                _id: result._id,
                email: result.email,
              },
            },
          };
        })
        .catch((err) => {
          logger.error("Error while creating user");
          return err;
        });
    } catch (err) {
      logger.error(err.message);
      return err;
    }
  }

  async signup(user) {
    try {
      return await this.findUser(user.email)
        .then((existUser) => {
          if (existUser) {
            logger.warn("User already exist");
            return {
              status: 409,
              message: { message: "Email already exists" },
            };
          } else {
            return this.hashingPassword(user.password)
              .then((hashedPassword) => {
                return this.saveUser(user.email, hashedPassword);
              })
              .catch((err) => {
                logger.error("Error while hashing password");
                return err;
              });
          }
        })
        .catch((err) => {
          logger.error("Error while finding user");
          return err;
        });
    } catch (err) {
      logger.error(err.message);
      return err;
    }
  }

  createToken(user) {
    try {
      logger.info("Creating token");
      return jwt.sign(
        { email: user.email, userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
    } catch (err) {
      logger.error(err.message);
      return err;
    }
  }

  async comparePassword(userRequestPassword, hashedPassword) {
    try {
      return await bcrypt
        .compare(userRequestPassword, hashedPassword)
        .then((result) => {
          return result;
        })
        .catch((err) => {
          logger.error("Error while comparing password");
          return err;
        });
    } catch (err) {
      logger.error(err.message);
      return err;
    }
  }
  async login(user) {
    try {
      return await this.findUser(user.email)
        .then((existUser) => {
          if (existUser) {
            logger.info("User found");
            return this.comparePassword(user.password, existUser.password)
              .then((result) => {
                if (result) {
                  logger.info("Password matched");
                  return {
                    status: 200,
                    message: {
                      message: "User logged in successfully",
                      user: {
                        email: existUser.email,
                        token: this.createToken(existUser),
                      },
                    },
                  };
                } else {
                  logger.warn("Password does not match");
                  return {
                    status: 401,
                    message: {
                      message: "Invalid email or password",
                    },
                  };
                }
              })
              .catch((err) => {
                logger.error("Error while comparing password");
                return err;
              });
          } else {
            logger.warn("User not found");
            return {
              status: 401,
              message: { message: "Invalid email or password" },
            };
          }
        })
        .catch((err) => {
          logger.error("Error while finding user");
          return err;
        });
    } catch (err) {
      logger.error(err.message);
      return err;
    }
  }
}

module.exports = AuthHelper;
