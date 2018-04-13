const handlers = require('../genericHandlers')
const bugsSchema = require('./schema')

const modelName = 'bugs'

module.exports = [{
    method: 'GET',
    path: '/' + modelName,
    handler: handlers.modelListHandler(modelName)
}, {
    method: 'GET',
    path: '/' + modelName + '/{id}',
    handler: handlers.modelFindHandler(modelName)
}, {
    method: 'DELETE',
    path: '/' + modelName + '/{id}',
    handler: handlers.modelDeleteHandler(modelName)
}, {
    method: 'POST',
    path: '/' + modelName,
    handler: handlers.modelCreateHandler(modelName),
    config: {
        validate: {
            payload: bugsSchema.createBugsAPI,
            options:{presence:'required'}
        }
    }
}]