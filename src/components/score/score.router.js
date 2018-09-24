function Routes(api, component, controller) {
  try {
    api.get('/v1/score', controller.get);
    api.post('/v1/score', controller.post);
    api.post('/v1/score/:id/gist', controller.gist);
    return component;
  } catch (e) {
    console.error('Routes error', e.message);
    return e.message;
  }
}

module.exports = Routes;
