const handlers = require('./genericHandlers')

module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: handlers.modelListHandler('docs')
    },
    {
        method: 'GET',
        path: '/baba/{id}',
        handler: handlers.modelFindHandler('docs')
    },
    {
        method: 'POST',
        path: '/haba',
        handler: handlers.modelCreateHandler('docs')
    }
]