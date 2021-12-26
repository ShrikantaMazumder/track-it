import models from "../models";

export const saveUser = async (user) => {
    const model = models.User({
        username: user.username,
        createdAt: Date.now()
    })
    const savedUser = await model.save()
    return savedUser
}

export const getAllUsers = async () => {
    const users = await models.User.find()
    return users
}

export const updateUser = async (user) => {
    const model = await models.User.findById(user._id)
    
    if (model) {
        model.username = user.username
        await model.save()
        return model
    } else {
        return null
    }
}

export const deleteUser = async _id => {
    const result = await models.User.deleteOne({_id})
    return result
}