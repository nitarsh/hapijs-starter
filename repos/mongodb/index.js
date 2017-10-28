module.exports = {
    create: (db, model, obj, cb) => db[model].save(obj, cb)
}