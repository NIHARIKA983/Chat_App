const chatModel = require('../models/chat');
class Service {
     newChat = (chat, callback) => {
      chatModel.newChat(chat, (error, data) => {
        if (error) {
          return callback(error, null);
        } else {
          return callback(null, data);
        }
      }
      );
    }
}
module.exports = new Service();