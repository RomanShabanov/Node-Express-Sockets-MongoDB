import pino from "pino";
import expressPino from "express-pino-logger";

const logger = pino({ level: process.env.LOG_LEVEL || "info" });
const expressLogger = expressPino({ logger });

export { logger, expressLogger };
export default logger;
