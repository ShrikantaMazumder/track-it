"use strict";

// library function
import dotenv from 'dotenv';
import express from "express";
import configure from "./controllers";
import { errorLogger, infoLogger } from './logger';
import { handleErrors, processRequest } from './middlewares/index';
import { connectWithDB } from "./mongo";

dotenv.config()
const app = express();
app.use(express.json());

const log = (msg) => console.log(msg);

// process request middleware
if(process.env.NODE_ENV !== "TEST") {
  app.use(processRequest);
}

connectWithDB();

if(process.env.NODE_ENV !== "TEST") {
  app.use(infoLogger);
}

configure(app);

// handle error logger after route
app.use(errorLogger)

// register middlewares
app.use(handleErrors);

export default app

/**
 * 3 Layer architecture
 * Controller layer: process the http request
 * Service layer: process the object and send to data layer
 * Data layer: process the data and get/set to database
 */
