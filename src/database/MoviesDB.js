const knex = require('knex')(require('./knexfile'));
const BaseDB = require('./BaseDB');

class MoviesDB extends BaseDB{
    constructor(){
        super();
    }

    create(movie){
        this.log('inserting movie');
        this.log(movie);
        return knex.insert(movie).into('film');
    }

    update(movie){
        this.log('updating movie');
        this.log(movie);
        return knex.update(movie)
            .into('film')
            .where('film_id',movie.film_id)
            .then((result)=>{
                if(result === 1){
                    return this.get(movie.film_id);
                } else {
                    throw 'Not found';
                }
            });
    }

    get(filmId){
        this.log(`return movie with id = ${filmId}`);
        return knex.select('*')
            .from('film')
            .where('film_id', filmId)
            .then((vals) =>{
                if(vals && vals.length>0){
                    return{
                        film_id: vals[0].film_id,
                        title: vals[0].title,
                        description: vals[0].description,
                        release_year: vals[0].release_year,
                        last_update: vals[0].last_update
                    }
                } else {
                    throw 'Not found';
                }
            });
    }

    list(){
        this.log('getting all films');
        return knex.select('*')
            .from('film')
            .map((row)=>{
                return {
                    film_id: row.film_id,
                    title: row.title,
                    description: row.description,
                    release_year: row.release_year,
                    last_update: row.last_update
                }
            });
    }

    async delete(film_id){
        this.log(`Deleting film with id ${film_id}`);
        const row = await this.get(film_id);
        return knex('film')
            .where('film_id', film_id)
            .del()
            .then((result)=>{
                if(result === 1){
                    return row;
                } else {
                    throw 'Not found';
                }
            });
    }

    async listByActorId(actor_id){
        this.log(`Get all movies featuring actor with id ${actor_id}`);
        return knex
            .select('*')
            .from('film')
            .innerJoin('film_actor','film.film_id','film_actor.film_id')
            .innerJoin('actor', 'actor.actor_id', 'film_actor.actor_id')
            .where('film_actor.film_id', '=', film_id)
            .then((result) =>{
                if(result && result.length >0){
                    return result;
                } else {
                    throw 'Not found';
                }
            }).map((row)=>{
                return {
                    film_id: row.film_id,
                    title: row.title,
                    description: row.description,
                    release_year: row.release_year,
                    last_update: row.last_update
                }
            });
    }

    async listByYearRange(startYear,endYear){
        this.log(`Get all movies between the year ${startYear} and ${endYear}`);
        return knex
            .column(['film_id',
                'title',
                'description',
                'release_year',
                'last_update'])
            .select()
            .from('film')
            .whereBetween('release_year', [startYear, endYear]);
    }
}

module.exports = new MoviesDB();