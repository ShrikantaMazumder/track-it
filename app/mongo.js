import dotenv from 'dotenv';
import mongoose from "mongoose";
dotenv.config()

const DB_NAME = process.env.DB_NAME;
const DB_PASS = process.env.DB_PASS;

export const uri = `mongodb+srv://${DB_NAME}:${DB_PASS}@cluster0.gbyyk.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
const options = {}

export const connectWithDB = () => {
    mongoose.connect(uri, options, (err, res) => {
        if(!err) console.log('Connected with DB')
        else console.log(err);
        
    })
}

export default connectWithDB