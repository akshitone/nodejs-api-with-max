const { format, createLogger, transports } = require("winston");
const { timestamp, combine, printf, colorize, align, errors } = format;

const logFormat = combine(
  colorize(),
  //   align(),
  timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  errors({ stack: true }),
  printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} [${level}]: ${
      stack || typeof message === "object" ? JSON.stringify(message) : message
    }`;
  })
);

const logger = createLogger({
  format: logFormat,
  transports: [new transports.Console()],
});

module.exports = logger;
