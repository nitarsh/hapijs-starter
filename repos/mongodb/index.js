const timestampedObject = obj => {
    t = Date.now()
    obj.created = t
    obj.updated = t
    return obj
}

const updatedTimestamp = obj => Object.defineProperty(obj,'updated',{value:Date.now()})

//TODO: create logs for all create, delete, update operations

module.exports = {
    withId: (db, model, _id, cb) => db[model].findOne({
        _id
    }, cb),
    listAll: (db, model, cb) => db[model].find(cb),
    create: (db, model, obj, cb) => db[model].save(timestampedObject(obj), cb),
    delete: (db, model, _id, cb) => db[model].remove({
        _id
    }, {
        justOne: true
    }, cb),
    update: (db, model, _id, attr, cb) => db[model].findAndModify({
        query: {
            _id: obj._id
        },
        update: {
            $set: updatedTimestamp(attr)
        }
    }, cb)
}