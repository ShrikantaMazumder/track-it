import request from 'supertest';
import app from '../src/app';

describe("app test suite", () => {
  test("adds 1 + 2 to equal 3", async () => {
    let response = await request(app).get('/users')
    console.log(response.body);
  });
});
