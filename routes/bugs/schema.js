const Joi = require('joi');

const models = {
    bug: {
        title: String,
        description: String,
        createdById: String,
        assignedToId: String,
    }
}

module.exports = {
    createBugsAPI: {
        title: Joi.string().min(1).max(256),
        description: Joi.string().min(0).max(512),
        createdById: Joi.string().min(36).max(36),
        assignedToId: Joi.string().min(36).max(36),
    },
    createBugsModel: {

    }
}