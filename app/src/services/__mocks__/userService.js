
import models from '../../models/index';
let users =[{
    "_id": "1", "username": "TestUser"
}]

export const getAllUsers = async () => {
    return users
}

export const saveUser = async (user) => {
   let model = new models.User(user)
   users.push(model)
    return model
}

export const getUserById = async (_id) => {
  const model = users.find(x => x.id === _id)
  return model;
};