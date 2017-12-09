// Initializes the `mailer` service on path `/mailer`
const createService = require('feathers-mongodb');
const hooks = require('./mailer.hooks');

module.exports = function (app) {
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/mailer', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('mailer');

  mongoClient.then(db => {
    service.Model = db.collection('mailer');
  });

  service.hooks(hooks);
};
