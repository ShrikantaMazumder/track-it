'use strict'

// library function
import express from "express";
import expressWinston from "express-winston";
import winston from "winston";
import configure from "./controllers";
import { handleErrors } from './middlewares/handleErrors';
import connectWithDB from "./mongo";


const app = express()
const port = 3000
app.use(express.json())

const log = (msg) => console.log(msg);

// process request middleware
const processRequest = (req, res, next) => {
    let correlationId = req.headers['x-correlation-id'];

    if (!correlationId) {
        correlationId = Date.now().toString()
        req.headers['x-correlation-id'] = correlationId
    }

    res.set('x-correlation-id', correlationId)
    return next();
}
app.use(processRequest)

connectWithDB()

const getMessage = (req, res) => {
    let obj = {
        correlationId: req.headers['x-correlation-id'],
        requestBody: req.body
    }
    return JSON.stringify(obj)
}

const infoLogger = expressWinston.logger({
    transports: [
      new winston.transports.Console()
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    meta: true,
    msg: getMessage,
  })

app.use(infoLogger);

configure(app)

// register middlewares
app.use(handleErrors)


app.listen(port, () => console.log(`listening to ${port}`))

/**
 * 3 Layer architecture
 * Controller layer: process the http request
 * Service layer: process the object and send to data layer
 * Data layer: process the data and get/set to database
 */