const test = require('ava');
const request = require('supertest');
const App = require('./app');

const app = new App('ScoreBoard');

test.serial('Return 404 for /v1/404', async t => {
  const response = await request(app).get('/v1/404');
  t.is(response.status, 404);
});
