const handlers = require('../genericHandlers')

const modelName = 'bugs'

module.exports = [
    {
        method: 'GET',
        path: '/' + modelName,
        handler: handlers.modelListHandler(modelName)
    },
    {
        method: 'GET',
        path: '/' + modelName + '/{id}',
        handler: handlers.modelFindHandler(modelName)
    },
    {
        method: 'POST',
        path: '/' + modelName,
        handler: handlers.modelCreateHandler(modelName)
    }
]