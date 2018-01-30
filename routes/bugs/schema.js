const Joi = require('joi');

module.exports = {
    createBugsAPI: {
        title: Joi.string().min(1).max(256),
        createdById: Joi.string().min(36).max(36),
        description: Joi.string().min(0).max(512),
        assignedToId: Joi.string().min(36).max(36),
    },
    createBugsModel: {

    }
}