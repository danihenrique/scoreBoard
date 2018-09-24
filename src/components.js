class Components {
  constructor(api, pathComponents = '') {
    api.components = [];
    api.controllers = {};
    try {
      const normalizedPath = require('path').join(__dirname, pathComponents);
      require('fs')
        .readdirSync(normalizedPath)
        .forEach(component => {
          if (component !== 'index.js') {
            api.controllers[
              component
            ] = require(`./${pathComponents}/${component}/${component}.controller`)(
              api,
              component
            );
            api.components.push(
              require(`./${pathComponents}/${component}/${component}.router`)(
                api,
                component,
                api.controllers[component]
              )
            );
            // console.info('Loaded component', component);
          }
        });
      return this;
    } catch (e) {
      return e.message;
    }
  }
}

module.exports = Components;
