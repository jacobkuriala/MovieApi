const Controller = require('./Controller');

class MovieController extends Controller {
    constructor(){
        super();
    }

    list(req, h) {
        return {message: 'Hello HubHaus'};
    }
}

module.exports = new MovieController();