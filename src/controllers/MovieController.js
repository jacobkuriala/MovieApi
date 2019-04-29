'use strict'
const Controller = require('./Controller');
const MoviesDB = require(`../database/MoviesDB`);
class MovieController extends Controller {
    constructor(){
        super();
    }

    /***
     * Create a new Movie Instance
     * @param req
     * @param h
     * @returns {Promise<Promise<undefined>|Promise<undefined|*>|*>}
     */
    async create(req, h){
        try{
            const result = await MoviesDB.create(req.payload);
            const response = h.response({
                film_id: result[0] ,
                ...req.payload
            });
            response.code = 201;
            response.header('Location',`/movie/${result[0]}`)
            return response;
        } catch(ex) {
            return this.errorResponse(ex, h);
        }
    }

    async update(req, h){
        try{
            if(!req.params.film_id){
                return this.errorResponse('Movie id is not specified', h);
            };
            req.payload.film_id = req.params.film_id;
            const result = await MoviesDB.update(req.payload);
            const response = h.response(result);
            response.code = 200;
            return response;
        } catch(ex) {
            return this.errorResponse(ex, h);
        }
    }

    /***
     * Get all movies
     * @param req
     * @param h
     * @returns {Promise<*>}
     */
    async list(req, h) {
        try{
            return await MoviesDB.list();
        }catch(ex){
            return this.errorResponse(ex, h);
        }
    }

    async get(req, h) {
        try{
            return await MoviesDB.get(req.params.film_id);
        }catch(ex){
            return this.errorResponse(ex, h);
        }
    }

    async delete(req,h){
        try{
            return await MoviesDB.delete(req.params.film_id);
        }catch(ex){
            return this.errorResponse(ex, h);
        }
    }

    async listByActorId(req, h){
        try{
            return await MoviesDB.listByActorId(req.params.actor_id);
        } catch (ex){
            return this.errorResponse(ex, h);
        }
    }

    async listByYearRange(req, h){
        try{
            if(req.params.start_year >
                req.params.end_year){
                return this.errorResponse(
                    'Start Year cannot be greater than End Year',h);
            }
            return await MoviesDB.listByYearRange(
                req.params.start_year,
                req.params.end_year);
        } catch (ex) {
            return this.errorResponse(ex, h);
        }
    }
}

module.exports = new MovieController();