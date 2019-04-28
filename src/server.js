const Hapi = require('hapi');
const MovieController = require('./controllers/MovieController');

const server = new Hapi.Server({
    port: 3000,
    host: 'localhost'
});

server.route({
    method: 'GET',
    path: '/movies',
    handler: MovieController.list
});

(async () => {
    try {
        await server.start();
        console.log(`Server running at: ${server.info.uri}`);
    } catch (err){
        console.log(err);
    }
})();