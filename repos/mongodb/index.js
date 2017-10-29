module.exports = {
    listAll: (db, model, cb) => db[model].find(cb),
    create: (db, model, obj, cb) => db[model].save(obj, cb)
}