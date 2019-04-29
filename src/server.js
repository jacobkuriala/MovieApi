const Hapi = require('hapi');
const MovieController = require('./controllers/MovieController');
const ActorController = require('./controllers/ActorController');
const MovieActorController = require('./controllers/MovieActorController');

const server = new Hapi.Server({
    port: 3000,
    host: 'localhost'
});

const routes = [
    {
        method: 'POST',
        path: '/movie',
        handler: (req, h) => MovieController.create(req, h)
    },
    {
        method: 'PATCH',
        path: '/movie/{film_id}',
        handler: (req, h) => MovieController.update(req, h)
    },
    {
        method: 'GET',
        path: '/movies',
        handler: (req, h) => MovieController.list(req, h)
    },
    {
        method: 'GET',
        path: '/movie/{film_id}',
        handler: (req, h) => MovieController.get(req, h)
    },
    {
        method: 'DELETE',
        path: '/movie/{film_id}',
        handler: (req, h) => MovieController.delete(req, h)
    },
    {
        method: 'POST',
        path: '/actor',
        handler: (req, h) => ActorController.create(req, h)
    },
    {
        method: 'PATCH',
        path: '/actor/{actor_id}',
        handler: (req, h) => ActorController.update(req, h)
    },
    {
        method: 'GET',
        path: '/actors',
        handler: (req, h) => ActorController.list(req, h)
    },
    {
        method: 'GET',
        path: '/actors/releaseyear/{release_year}',
        handler: (req, h) => ActorController.listByMovieReleaseYear(req, h)
    },
    {
        method: 'GET',
        path: '/actor/{actor_id}',
        handler: (req, h) => ActorController.get(req, h)
    },
    {
        method: 'DELETE',
        path: '/actor/{actor_id}',
        handler: (req, h) => ActorController.delete(req, h)
    },
    {
        method: 'GET',
        path: '/movie/{film_id}/actors',
        handler: (req, h) => ActorController.listByMovieId(req, h)
    },
    {
        method: 'GET',
        path: '/actor/{actor_id}/movies',
        handler: (req, h) => MovieController.listByActorId(req, h)
    },
    {
        method: 'POST',
        path: '/movie/actor',
        handler: (req, h) => MovieActorController.create(req, h)
    },
    {
        method: 'GET',
        path:'/movies/start/{start_year}/end/{end_year}',
        handler: (req, h) => MovieController.listByYearRange(req, h)
    }
];


routes.forEach((route)=>{
    server.route(route)
});

(async () => {
    try {
        await server.start();
        console.log(`Server running at: ${server.info.uri}`);
    } catch (err){
        console.log(err);
    }
})();