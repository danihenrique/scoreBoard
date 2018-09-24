const App = require('./app');

const app = new App('ScoreBoard');

app.listen(app.config.server.port, () => {
  console.log(
    `API ${app.apiName} started at ${app.url}:${app.config.server.port}`
  );
});
