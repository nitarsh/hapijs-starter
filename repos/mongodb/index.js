const commons = require('../commonFields');
const fns = {
    withId: (db, model, _id, cb) => db[model].findOne({
        _id
    }, cb),
    listAll: (db, model, cb) => db[model].find(cb),
    create: (db, model, obj, cb) => db[model].save(commons.timestampObject(obj, Date.now()), cb),
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
            $set: commons.updateTimestamp(attr, Date.now())
        }
    }, cb)
}

//TODO: create logs for all create, delete, update operations

module.exports = fns