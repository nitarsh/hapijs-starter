const Boom = require('boom');
const repo = require('../repos')

const httpReplyCallback = (reply, code=200) => {
    return (err, result) =>
    err ?
        reply(Boom.wrap(err, 'Internal MongoDB error')) :
        reply(result).code(code)
}

const genericHandlers = {
    modelListHandler:
    model =>
        (request, reply) =>
            repo.listAll(request.server.app.db,
                model,
                httpReplyCallback(reply)),
    modelCreateHandler:
    model =>
        (request, reply) =>
            repo.create(
                request.server.app.db,
                model,
                request.payload,
                httpReplyCallback(reply,201)),
    modelFindHandler:
    model =>
        (request, reply) =>
            repo.withId(request.server.app.db,
                model,
                request.params.id,
                httpReplyCallback(reply)),
    modelDeleteHandler:
    model =>
        (request, reply) =>
            repo.delete(request.server.app.db,
                model,
                request.params.id,
                httpReplyCallback(reply)),
}

module.exports = genericHandlers