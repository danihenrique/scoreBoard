const shortid = require('shortid');

const LINE = '\n';
const TWO_LINES = '\n\n';
const SPACE = ' ';
const CORRECT = 'C';
const INCORRECT = 'I';
const PENALTY = 20;
const db = [];

const setInputsResults = (api, row, results) => {
  const input = row.split(SPACE);
  const number1 = Number(input[0]);
  const number2 = Number(input[1]);
  let number3 = Number(input[2]);
  const answer = input[3];
  const exists = api._.find(results, result => result.id === number1);
  if (exists) {
    const oldInput = exists.row.split(SPACE);
    number3 = Number(oldInput[2]) + (answer === INCORRECT ? PENALTY : number3);
    exists.row = `${number1} ${number2} ${number3}`;
  } else {
    number3 = answer === INCORRECT ? PENALTY : number3;
    const newInput = { id: number1, row: `${number1} ${number2} ${number3}` };
    results.push(newInput);
  }
};

const claim = (api, input) => {
  let results = [];
  for (const row of input) {
    const splitedRow = row.split(SPACE);
    for (const str of splitedRow) {
      if (str === CORRECT || str === INCORRECT) {
        setInputsResults(api, row, results);
      }
    }
  }
  results = api._.map(results, res => res.row);
  return api._.values(results);
};

function Controller(api, component) {
  const controllers = {
    get: async (req, res) => api.reply(res, 200, 'All scores', db),
    post: async (req, res) => {
      try {
        const { scores } = req.body;
        const allScores = scores.split(TWO_LINES);
        for (const s of allScores) {
          const id = shortid.generate();
          const score = s.split(LINE);
          const contests = claim(api, score);
          const cases = score[0];
          db.push({
            id,
            cases,
            score,
            contests
          });
        }
        return api.reply(res, 201, 'Success', db);
      } catch (e) {
        return api.reply(res, 500, e.message, req.body);
      }
    },
    gist: async (req, res) => {
      try {
        const score = api._.find(db, s => s.id === req.params.id);
        if (score === undefined) {
          return api.reply(res, 404, 'Score not found', req.params.id);
        }
        const scores = `${score.score.join(LINE)}`;
        const options = {
          description: `Score: ${req.params.id}`,
          public: false,
          files: {
            'score.json': {
              content: scores
            }
          }
        };
        const saved = await api.gists.create(options);
        return api.reply(res, 201, 'Success', saved.body);
      } catch (e) {
        return api.reply(res, 500, e.message, req.body);
      }
    }
  };
  return controllers;
}

module.exports = Controller;
