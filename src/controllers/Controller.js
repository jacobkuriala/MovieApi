const Logger = require(`../common/Logger`);

class Controller extends Logger{
    constructor(){
        super();
    }
    errorResponse(ex, h){
        this.logError(ex);
        const respCode = typeof ex === 'string' &&
        ex.toLowerCase() === 'not found' ? 404 : 400;
        const response = h.response({
            status: respCode,
            title: 'Bad Request',
            detail: ex
        });
        response.header('Content-Type','application/problem+json');
        response.code(respCode);
        return response;
    }
}

module.exports = Controller;