module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: (request, reply) => {
            const db = request.server.app.db;
            console.log(db);
            console.log("blah blah");
            db.books.find((err, docs) => {

                if (err) {
                    return reply(Boom.wrap(err, 'Internal MongoDB error'));
                }

                reply(docs);
            });
        }
    },
    {
        method: 'GET',
        path: '/baba/{name}',
        handler: (request, reply) => {
            const db = request.server.app.db;
            console.log(db);
            console.log("Hello 1234dd");
            db.docs.find((err, docs) => {

                if (err) {
                    return reply(Boom.wrap(err, 'Internal MongoDB error'));
                }

                reply(docs);
            });
            // reply('Hello blah, ' + encodeURIComponent(request.params.name) + '!' + db);
        }
    },
    {
        method: 'GET',
        path: '/haba/{code}',
        handler: (request, reply) => {
            const db = request.server.app.db;
            db.docs.find((err, docs) => {

                if (err) {
                    return reply(Boom.wrap(err, 'Internal MongoDB error'));
                }

                reply(docs);
            });
        }
    }
]