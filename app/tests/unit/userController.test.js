import request from 'supertest';
import app from '../../src/app';

jest.mock("../../src/services/userService.js")

describe("UserController Unit Test", () => {
    test("get should return an array of users", async () => {
      let response = await request(app).get('/users')
      expect(response.statusCode).toBe(200)
      const users = response.body
      expect(users.length).toBeGreaterThan(0)
      expect(users[0]._id).toBe("1")
    });

    test("post should return created user object", async () => {
        let user = {username: "testuser002"}
        let response = await request(app).post('/users').send(user)
        expect(response.statusCode).toBe(201)
        const {username, _id} = response.body
        expect(username).toBe(user.username)

        const newUserResponse = await request(app).get('/users/'+_id)
        expect(newUserResponse.statusCode).toBe(200)
        expect(newUserResponse.body._id).toBe(_id)
      });
  });