const Good = require('good');

const db_plugin = {
    register: function (server, options, next) {
        const db = server.app.db;
        // server.route({
        //     method: 'GET',
        //     path: '/{name}',
        //     handler: (request, reply) => {
        //         console.log(db);
        //         console.log("Hello 1234");
        //         db.books.find((err, docs) => {

        //             if (err) {
        //                 return reply(Boom.wrap(err, 'Internal MongoDB error'));
        //             }

        //             reply(docs);
        //         });
        //         // reply('Hello blah, ' + encodeURIComponent(request.params.name) + '!' + db);
        //     }
        // })
        return next();
    }
}
db_plugin.register.attributes = {
    name: 'db-plugin'
}


module.exports = [
    {
        register: Good,
        options: {
            reporters: {
                console: [{
                    module: 'good-squeeze',
                    name: 'Squeeze',
                    args: [{
                        response: '*',
                        log: '*'
                    }]
                }, {
                    module: 'good-console'
                }, 'stdout']
            }
        }
    },
    db_plugin
]