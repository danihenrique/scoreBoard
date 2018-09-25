# BACK-END ENGINEER TEST

This test is designed to exercise different aspects of technical abilities. 
The aim is to provide a clear, concise and organised code.

## TASK LIST

- Create a service which displays a RESTful API with ScoreBoard and Gist endpoints;
    - Method to submit a new score, see Sample Input section.
    - Method to retrieve latest scoreboard, see Sample Output section. 
    - Method to create a Gist in github. 
- Method to list all comments from a Gist.

## NOTES
- Check ScoreBoard.pdf for input samples and details;
- The response/request ContentType its a json.
- Gist ID its part of endpoint URL.
- Change Gist user and password in the configuration files.


## Running
- `npm start` and start coding
- Save your files and the server will automatically reload

## Production
- `npm run production`

## Lint
- `npm run lint`

## Postman
- Import `postman_collection.json` file, with all pre-configured endpoints;

## Unit Tests
- `npm run test`

## Coverage
- `npm run cover`

## Endpoints
- GET `/v1/score`: Get scores;
- POST `/v1/score`: Save new score;
- POST `/v1/score/:id/gist`: Save gist score;
- GET `/v1/gist`: List gists;
- GET `/v1/gist/:id/comments`: Get gist comments;

By [Daniel Henrique](mailto:danihenrique@gmail.com)
