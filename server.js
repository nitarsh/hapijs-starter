'use strict';

const Hapi = require('hapi');
const mongojs = require('mongojs');
const plugins = require('./plugins');
const routes = require('./routes');


// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8000,
    routes: { cors: true }
});

server.app.db = mongojs('bt-hapi-db', ['bug']);

server.register(plugins, (err) => {

    if (err) {
        throw err; // something bad happened loading the plugin
    }

    server.route(routes);

    server.start((err) => {

        if (err) {
            throw err;
        }
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});

// listen on SIGINT signal and gracefully stop the server
process.on('SIGINT', function () {  
    console.log('stopping hapi server')
  
    server.stop({ timeout: 10000 }).then(function (err) {
      console.log('hapi server stopped')
      process.exit((err) ? 1 : 0)
    })
  })

module.exports = server

