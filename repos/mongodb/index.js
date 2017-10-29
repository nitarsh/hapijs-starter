module.exports = {
    withId: (db, model, _id, cb) => db[model].findOne({ _id }, cb),
    listAll: (db, model, cb) => db[model].find(cb),
    create: (db, model, obj, cb) => db[model].save(obj, cb)
}