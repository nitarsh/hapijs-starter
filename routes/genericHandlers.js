const Boom = require('boom');
const uuidv1 = require('uuid/v1');
const repo = require('../repos')

const generateIdForObj = o => Object.assign(o, { _id: uuidv1() })


module.exports = {
    modelListHandler:
    model =>
        (request, reply) =>
            repo.listAll(request.server.app.db,
                model,
                (err, result) =>
                    err ?
                        reply(Boom.wrap(err, 'Internal MongoDB error')) :
                        reply(result)),
    modelCreateHandler:
    model =>
        (request, reply) =>
            repo.create(
                request.server.app.db,
                model,
                generateIdForObj(request.payload),
                (err, result) =>
                    err ?
                        reply(Boom.wrap(err, 'Internal MongoDB error')) :
                        reply(result)),
    modelFindHandler:
    model =>
        (request, reply) =>
            repo.withId(request.server.app.db,
                model,
                request.params.id,
                (err, result) =>
                    err ?
                        reply(Boom.wrap(err, 'Internal MongoDB error')) :
                        reply(result ? result : Boom.notFound())),
    modelDeleteHandler:
    model =>
        (request, reply) =>
            repo.delete(request.server.app.db,
                model,
                request.params.id,
                (err, result) =>
                    err ?
                        reply(Boom.wrap(err, 'Internal MongoDB error')) :
                        reply(result ? result : Boom.notFound())),
}