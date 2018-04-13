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

module.exports = {
    timestampObject,
    updateTimestamp
}