const controller = require('../controller/registration');

module.exports = (app) => {

    app.post('/register', controller.register);

    app.post('/login', controller.login);
}   