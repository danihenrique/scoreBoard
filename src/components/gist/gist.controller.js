function Controller(api, component) {
  const controllers = {
    list: async (req, res) => {
      try {
        const { pages } = await api.gists.all();
        const gists = [];
        for (const page of pages) {
          const { body } = page;
          api._.merge(gists, body);
        }
        if (gists.length === 0) {
          return api.reply(res, 404, 'List gists empty', gists);
        }
        return api.reply(res, 200, 'List gists', gists);
      } catch (e) {
        return api.reply(res, 500, e.message, req.body);
      }
    },
    getGistComments: async (req, res) => {
      try {
        const { id } = req.params;
        const { body } = await api.gists.listComments(id);
        return api.reply(res, 200, 'Gist comments', body);
      } catch (e) {
        return api.reply(res, 500, e.message, req.body);
      }
    }
  };
  return controllers;
}

module.exports = Controller;
