'use strict';

const Hapi = require('hapi');
const mongojs = require('mongojs');
const plugins = require('./plugins');
const routes = require('./routes');


// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8000
});

server.app.db = mongojs('bt-hapi-db', ['bug']);

// Add the route
server.route(routes);

server.register(plugins, (err) => {

    if (err) {
        throw err; // something bad happened loading the plugin
    }

    server.start((err) => {

        if (err) {
            throw err;
        }
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});