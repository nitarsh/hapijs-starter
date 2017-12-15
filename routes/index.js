const Joi = require('joi');
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
        handler: handlers.modelCreateHandler('docs'),
        config: {
            validate: {
                params: {
                    name: Joi.string().min(5).max(10)
                }
            }
        }
    }
].concat(require('./bugs'))