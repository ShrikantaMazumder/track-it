'use strict'

// library function
import express from "express";
import configure from "./controllers";
import { handleErrors } from './middlewares/handleErrors';
import connectWithDB from "./mongo";

const app = express()
const port = 3000
app.use(express.json())

const log = (msg) => console.log(msg);

connectWithDB()
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