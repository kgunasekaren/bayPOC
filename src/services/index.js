const mailer = require('./mailer/mailer.service.js');
module.exports = function (app) {
  app.configure(mailer);
};
