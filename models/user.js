'use strict'

import mongoose from "mongoose";

// Define Schema
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    createdAt: { type: Date, default: Date.now() }
})

// use referance
const User = mongoose.model('User', userSchema)

export default User