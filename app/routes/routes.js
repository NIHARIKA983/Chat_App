const controller = require('../controller/registration');
const middleware = require('../utility/helper.js');
const chatController = require('../controller/chat');

module.exports = (app) => {

    app.post('/register', controller.register);

    app.post('/login', controller.login);

    app.post('/NewChat', middleware.validateToken, chatController.newChat);
}   