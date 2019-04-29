'use strict'
const Controller = require('./Controller');
const MovieActorDB = require(`../database/MovieActorDB`);

class MovieActorController extends Controller {
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
            const result = await MovieActorDB.create(req.payload);
            const response = h.response({
                ...req.payload
            });
            response.code = 200;
            return response;
        } catch(ex) {
            return this.errorResponse(ex, h);
        }
    }
}

module.exports = new MovieActorController();