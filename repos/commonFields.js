const uuidv1 = require('uuid/v1');

const timestampObject = (obj, datetime) => {
    obj.created = datetime
    obj.updated = datetime
    return obj
}

const updateTimestamp = (obj, datetime) => {
    Object.defineProperty(obj, 'updated', {
        value: datetime
    })
}

const generateIdForObj = o => Object.assign(o, { _id: uuidv1() })

module.exports = {
    timestampObject,
    updateTimestamp,
    generateIdForObj
}