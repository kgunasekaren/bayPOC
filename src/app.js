const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('winston');

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');


const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');


const handler = require('@feathersjs/errors/handler');
const memory = require('feathers-memory');

const mongodb = require('./mongodb');

// Create a Feathers application that is also fully compatible
// with an Express app
const app = express(feathers());



// Load app configuration
app.configure(configuration());
// // Enable CORS, security, compression, favicon and body parsing
app.use(cors());
app.use(helmet());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// // Host the public folder
app.use('/', express.static(app.get('public')));
//
// // Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio());
app.configure(mongodb);
//
// // Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
// // Set up our services (see `services/index.js`)
app.configure(services);
// // Set up event channels (see channels.js)
app.configure(channels);
//
// // Configure a middleware for 404s and the error handler
// app.use(express.notFound());
// app.use(express.errorHandler({ logger }));

app.hooks(appHooks);
//
// app.service('messages').create({
//   text: 'This is a POC message'
// });
// Parse HTTP JSON bodies
app.use(express.json());
// Parse URL-encoded params
app.use(express.urlencoded({ extended: true }));
// Add REST API support
app.configure(express.rest());
// Configure Socket.io real-time APIs
app.configure(socketio());
// Register our memory "messages" service
app.use('/messages', memory());
// Register a nicer error handler than the default Express one
app.use(handler());
// Start the server
app.use(handler());
// Start the server
app.listen(3333);

// Create a new message on the server
app.service('messages').create({
  text: 'This is a eBay POC'
});

module.exports = app;
