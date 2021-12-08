const controller = require('../controller/registration');

module.exports = (app) => {

    app.post('/register', controller.register);
}   