const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "warn" }),
    new winston.transports.File({ filename: "app.log" }),
  ],
});

logger.error("Error message");
logger.warn("Warning message");
logger.info("Info message");
