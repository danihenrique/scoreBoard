const test = require('ava');
const request = require('supertest');
const App = require('../../app');

const app = new App('ScoreBoard');

let gists = [];

test.serial('List gists', async t => {
  const response = await request(app).get('/v1/gist');
  gists = response.body.data;
  t.is(response.status, 200);
});

test.serial('Get gist comments', async t => {
  const ID = gists[0].id;
  const response = await request(app).get(`/v1/gist/${ID}/comments`);
  t.is(response.status, 200);
});

test.serial('Try get gist comments with wrong ID', async t => {
  const ID = '123';
  const response = await request(app).get(`/v1/gist/${ID}/comments`);
  t.is(response.status, 500);
});
