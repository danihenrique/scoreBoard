const test = require('ava');
const request = require('supertest');
const App = require('../../app');

let db = [];

const app = new App('ScoreBoard');

test.serial('Get scores', async t => {
  const response = await request(app).get('/v1/score');
  t.is(response.status, 200);
});

test.serial('Save a new score', async t => {
  const BODY = {
    scores:
      '1\n1 2 10 I\n3 1 11 C\n1 2 19 R\n1 2 21 C\n1 1 25 C\n\n2\n1 2 10 I\n3 1 11 C\n1 2 19 R\n1 2 21 C\n1 1 25 C'
  };
  const response = await request(app)
    .post('/v1/score')
    .send(BODY);
  db = response.body.data;
  t.is(response.status, 201);
});

test.serial('Try save score with different body', async t => {
  const BODY = {
    wrong:
      '1\n1 2 10 I\n3 1 11 C\n1 2 19 R\n1 2 21 C\n1 1 25 C\n\n2\n1 2 10 I\n3 1 11 C\n1 2 19 R\n1 2 21 C\n1 1 25 C'
  };
  const response = await request(app)
    .post(`/v1/score/`)
    .send(BODY);
  t.is(response.status, 500);
});

test.serial('Save gist score', async t => {
  const BODY = {
    scores:
      '1\n1 2 10 I\n3 1 11 C\n1 2 19 R\n1 2 21 C\n1 1 25 C\n\n2\n1 2 10 I\n3 1 11 C\n1 2 19 R\n1 2 21 C\n1 1 25 C'
  };
  const ID = db[0].id;
  const response = await request(app)
    .post(`/v1/score/${ID}/gist`)
    .send(BODY);
  t.is(response.status, 201);
});

test.serial('Try save gist score with wrong ID', async t => {
  const BODY = {
    scores:
      '1\n1 2 10 I\n3 1 11 C\n1 2 19 R\n1 2 21 C\n1 1 25 C\n\n2\n1 2 10 I\n3 1 11 C\n1 2 19 R\n1 2 21 C\n1 1 25 C'
  };
  const ID = '123';
  const response = await request(app)
    .post(`/v1/score/${ID}/gist`)
    .send(BODY);
  t.is(response.status, 404);
});
