// server/tests/auth.test.js
const request = require('supertest');
const app = require('../index');

describe('Auth API', () => {
  it('should register a user', async () => {
    const res = await request(app).post('/api/register').send({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });
    expect(res.statusCode).toEqual(201);
  });
});
