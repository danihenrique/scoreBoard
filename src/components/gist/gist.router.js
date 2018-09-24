function Routes(api, component, controller) {
  try {
    api.get('/v1/gist', controller.list);
    api.get('/v1/gist/:id/comments', controller.getGistComments);
    return component;
  } catch (e) {
    console.error('Routes error', e.message);
    return e.message;
  }
}

module.exports = Routes;
