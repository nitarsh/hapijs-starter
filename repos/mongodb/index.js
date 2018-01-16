const timestampedObject = obj => {
    t = Date.now()
    obj.created = t
    obj.updated = t
    return t
}

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
            $set: attr
        }
    }, cb)
}