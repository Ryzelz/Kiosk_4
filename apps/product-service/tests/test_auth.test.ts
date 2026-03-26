/**
 * TC-06 — POST /api/auth/login Valid & Invalid Credentials
 *
 * Note: Backend is Express (Node.js), not Flask — tests use supertest, not pytest.
 * The auth routes live in this same service for demo purposes.
 */
import request from 'supertest';
import app from '../src/app';

// Register a user before running login tests
beforeAll(async () => {
  await request(app)
    .post('/api/auth/register')
    .send({ email: 'u@w.com', password: 'Pass123!', name: 'U' });
});

test('POST /api/auth/login with valid credentials returns 200 and token', async () => {
  const res = await request(app)
    .post('/api/auth/login')
    .send({ email: 'u@w.com', password: 'Pass123!' });

  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty('token');
});

test('POST /api/auth/login with wrong password returns 401', async () => {
  const res = await request(app)
    .post('/api/auth/login')
    .send({ email: 'u@w.com', password: 'Wrong' });

  expect(res.status).toBe(401);
});
