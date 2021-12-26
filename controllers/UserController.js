'use strict'

import express from "express";
import { deleteUser, getAllUsers, saveUser, updateUser } from "../services/userService";

const router = express.Router()

const getHandler = async (req, res) => {
    try {
        const users = await getAllUsers()
        res.status(201).send(users)
    } catch (error) {
        res.status(500).send('Failed to save user');
        console.log(error);
    }
}
const postHandler = async (req, res) => {
    const reqData = req.body

    try {
        const user = await saveUser(reqData)
    res.status(201).send(user)
    } catch (error) {
        res.status(500).send('Failed to save user');
    }
}
const putHandler = async (req, res) => {
    try {
        const result = await updateUser(req.body)
        res.status(201).send(result)
    } catch (error) {
        res.status(500).send('Failed to update user');
    }
}
const deleteHandler = async (req, res) => {
    try {
        console.log(req);
        const id = req.query.id
        const result = await deleteUser(id)
        res.status(201).send("User deleted")
    } catch (error) {
        res.status(500).send('Failed to delete user');
    }
}

router.get('/', getHandler)
router.post('/', postHandler)
router.put('/update', putHandler)
router.delete('/delete', deleteHandler)

const configureUserController = (app) => {
    app.use('/users', router)
}

export default configureUserController