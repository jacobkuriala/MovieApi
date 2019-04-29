class Logger {
    constructor(){
    }
    log(message) {
        console.log(message);
    }


    logError(message) {
        console.log('Caught Error');
        console.log(message);
    }
}

module.exports = Logger;