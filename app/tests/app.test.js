import request from 'supertest';
import app from '../src/app';

jest.mock("../src/services/userService.js")

describe("app test suite", () => {
  test("adds 1 + 2 to equal 3", async () => {
    let response = await request(app).get('/users')
    expect(response.statusCode).toBe(200)
    const users = response.body
    expect(users.length).toBe(1)
  });
});
