/**
 * TC-05 — GET /api/products Returns Product List
 *
 * Note: Backend is Express (Node.js), not Flask — tests use supertest, not pytest.
 */
import request from 'supertest';
import app from '../src/app';

test('GET /api/products returns 200', async () => {
  const response = await request(app).get('/api/products');
  expect(response.status).toBe(200);
});

test('GET /api/products returns a non-empty array', async () => {
  const response = await request(app).get('/api/products');
  const data = response.body;
  expect(Array.isArray(data)).toBe(true);
  expect(data.length).toBeGreaterThan(0);
});
