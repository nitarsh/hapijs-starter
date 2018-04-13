const Boom = require('boom');
const uuidv1 = require('uuid/v1');
const repo = require('../repos')

const generateIdForObj = o => Object.assign(o, { _id: uuidv1() })

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
                generateIdForObj(request.payload),
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