const express = require("express");
const cors = require("cors");

const app = require("./app");
const logger = require("./util/logger");

const server = express();

server.use(cors({ origin: "*", methods: ["GET", "POST", "PATCH", "DELETE"] }));
server.use(express.json());
server.use("/api/v1", app);

server.listen(3000, () => {
  logger.info("Running on... http://localhost:3000");
});
