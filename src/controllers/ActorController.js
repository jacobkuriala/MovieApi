'use strict'
const Controller = require('./Controller');
const ActorsDB = require(`../database/ActorsDB`);
class ActorController extends Controller {
    constructor(){
        super();
    }

    /***
     * Create a new Actor Instance
     * @param req
     * @param h
     * @returns {Promise<Promise<undefined>|Promise<undefined|*>|*>}
     */
    async create(req, h){
        try{
            const result = await ActorsDB.create(req.payload);
            const response = h.response({
                actor_id: result[0] ,
                ...req.payload
            });
            response.code = 201;
            response.header('Location',`/actor/${result[0]}`);
            return response;
        } catch(ex) {
            return this.errorResponse(ex, h);
        }
    }

    async update(req, h){
        try{
            req.payload.actor_id = req.params.actor_id;
            const result = await ActorsDB.update(req.payload);
            const response = h.response(result);
            response.code = 200;
            return response;
        } catch(ex) {
            return this.errorResponse(ex, h);
        }
    }

    /***
     * Get all Actors
     * @param req
     * @param h
     * @returns {Promise<*>}
     */
    async list(req, h) {
        try{
            return await ActorsDB.list();
        }catch(ex){
            return this.errorResponse(ex, h);
        }
    }

    async get(req, h) {
        try{
            return await ActorsDB.get(req.params.actor_id);
        }catch(ex){
            return this.errorResponse(ex, h);
        }
    }

    async delete(req,h){
        try{
            return await ActorsDB.delete(req.params.actor_id);
        }catch(ex){
            return this.errorResponse(ex, h);
        }
    }

    async listByMovieId(req,h){
        try{
            return await ActorsDB.listByMovieId(req.params.film_id);
        }catch (ex){
            return this.errorResponse(ex,h);
        }
    }

    async listByMovieReleaseYear(req,h){
        try{
            return await ActorsDB.listByMovieReleaseYear(req.params.release_year)
        }catch (ex){
            return this.errorResponse(ex,h);
        }
    }
}

module.exports = new ActorController();