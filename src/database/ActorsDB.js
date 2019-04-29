const knex = require('knex')(require('./knexfile'));
const BaseDB = require('./BaseDB');

class ActorsDB extends BaseDB{
    constructor(){
        super();
    }

    create(actor){
        this.log('inserting Actor');
        this.log(actor);
        return knex.insert(actor).into('actor');
    }

    update(actor){
        this.log('updating actor');
        this.log(actor);
        return knex.update(actor)
            .into('actor')
            .where('actor_id',actor.actor_id)
            .then((result)=>{
                if(result === 1){
                    return this.get(actor.actor_id);
                }else {
                    throw 'Not found';
                }
            });
    }

    get(actor_id){
        this.log(`return actor with id = ${actor_id}`);
        return knex.select('*')
            .from('actor')
            .where('actor_id', actor_id)
            .then((response) =>{
                if(response.length>0){
                    return response[0];
                } else {
                    throw 'Not found';
                }
            });
    }

    list(){
        this.log('getting all actors');
        return knex.select('*')
            .from('actor');
    }

    async delete(actor_id){
        this.log(`Deleting actor with id ${actor_id}`);
        const row = await this.get(actor_id);
        return knex('actor')
            .where('actor_id', actor_id)
            .del()
            .then((result)=>{
                if(result === 1){
                    return row;
                } else {
                    throw 'Not found';
                }
            });
    }

    async listByMovieId(film_id){
        this.log(`Get all actors in movie with id ${film_id}`);
        return knex
            .select('*')
            .from('actor')
            .innerJoin('film_actor','actor.actor_id','film_actor.actor_id')
            .innerJoin('film', 'film.film_id', 'film_actor.film_id')
            .where('film_actor.film_id', '=', film_id)
            .then((result) =>{
                if(result && result.length >0){
                    return result;
                } else {
                    throw 'Not found';
                }
            }).map((row)=>{
                return {
                    actor_id: row.actor_id,
                    first_name: row.first_name,
                    last_name: row.last_name,
                    last_update: row.last_update
                }
            });

    }

    async listByMovieReleaseYear(releaseYear){
        this.log(`Get all actors in movies released in  ${releaseYear}`);
        return knex
            .select('*')
            .from('actor')
            .innerJoin('film_actor','actor.actor_id','film_actor.actor_id')
            .innerJoin('film', 'film.film_id', 'film_actor.film_id')
            .where('film.release_year', '=', releaseYear)
            .then((result) =>{
                if(result && result.length >0){
                    return result;
                } else {
                    throw 'Not found';
                }
            }).map((row)=>{
                return {
                    actor_id: row.actor_id,
                    first_name: row.first_name,
                    last_name: row.last_name,
                    last_update: row.last_update
                }
            });

    }
}

module.exports = new ActorsDB();