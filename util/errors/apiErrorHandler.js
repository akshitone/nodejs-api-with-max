const logger = require("../../util/logger");

const ApiError = require("./ApiError");

exports.apiErrorHandler = (err, req, res, next) => {
  logger.error(err.message);

  if (err instanceof ApiError) {
    res.status(err.code).json({ message: err.message });
    return;
  }

  res.status(500).json({
    message: "Internal server error",
  });
};
