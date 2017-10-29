const Boom = require('boom');
const uuid = require('node-uuid');
const repo = require('../repos')

module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: (request, reply) => {
            const db = request.server.app.db;
            repo.listAll(db, 'docs', (err, result) =>
                err ?
                    reply(Boom.wrap(err, 'Internal MongoDB error')) :
                    reply(result))
        }
    },
    {
        method: 'GET',
        path: '/baba',
        handler: (request, reply) => {
            const db = request.server.app.db;
            repo.listAll(db, 'docs', (err, result) =>
                err ?
                    reply(Boom.wrap(err, 'Internal MongoDB error')) :
                    reply(result));
        }
    },
    {
        method: 'POST',
        path: '/haba',
        handler: (request, reply) => {
            const db = request.server.app.db;
            // const doc = {}
            doc = request.payload
            doc._id = uuid.v1();

            db.docs.save(doc, (err, result) =>
                err ?
                    reply(Boom.wrap(err, 'Internal MongoDB error')) :
                    reply(result));
        }
    }
]