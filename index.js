"use strict";

// library function
import express from "express";
import expressWinston from "express-winston";
import winston from "winston";
import "winston-daily-rotate-file";
import configure from "./controllers";
import { handleErrors } from "./middlewares/handleErrors";
import connectWithDB from "./mongo";

const app = express();
const port = 3000;
app.use(express.json());

const log = (msg) => console.log(msg);

// process request middleware
const processRequest = (req, res, next) => {
  let correlationId = req.headers["x-correlation-id"];

  if (!correlationId) {
    correlationId = Date.now().toString();
    req.headers["x-correlation-id"] = correlationId;
  }

  res.set("x-correlation-id", correlationId);
  return next();
};
app.use(processRequest);

connectWithDB();

const getMessage = (req, res) => {
  let obj = {
    correlationId: req.headers["x-correlation-id"],
    requestBody: req.body,
  };
  return JSON.stringify(obj);
};

const fileInfoLogger = new winston.transports.DailyRotateFile({
  filename: "log-info-%DATE%.log",
  datePattern: "YYYY-MM-DD-HH",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
});

const fileErrorLogger = new winston.transports.DailyRotateFile({
  filename: "log-error-%DATE%.log",
  datePattern: "YYYY-MM-DD-HH",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
});

const infoLogger = expressWinston.logger({
  transports: [new winston.transports.Console(), fileInfoLogger,],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  meta: true,
  msg: getMessage,
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.Console(),
    fileErrorLogger,
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  )
});

// app.use(infoLogger);

configure(app);

// handle error logger after route
app.use(errorLogger)

// register middlewares
app.use(handleErrors);

app.listen(port, () => console.log(`listening to ${port}`));

/**
 * 3 Layer architecture
 * Controller layer: process the http request
 * Service layer: process the object and send to data layer
 * Data layer: process the data and get/set to database
 */
