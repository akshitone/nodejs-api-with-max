const authHelper = require("../helpers/auth");

exports.signup = (req, res, next) => {
  authHelper
    .signup(req.body)
    .then((result) => {
      res.status(result.status).json(result.message);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
      });
    });
};

exports.login = (req, res, next) => {
  authHelper
    .login(req.body)
    .then((result) => {
      res.status(result.status).json(result.message);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
      });
    });
};
