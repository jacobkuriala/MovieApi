const knex = require('knex')(require('./knexfile'));
const BaseDB = require('./BaseDB');

class MoviesDB extends BaseDB{
    constructor(){
        super();
    }

    create(movieActor){
        this.log(`inserting Actor with id ${movieActor.actor_id} 
        to movie with id ${movieActor.film_id}`);;
        this.log(movieActor);
        return knex.insert(movieActor).into('film_actor');
    }
}

module.exports = new MoviesDB();