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

    getAllChat = ( resolve, reject) => {
      chatModel
        .getAllChat()
        .then((data) => resolve(data))
        .catch(() => reject());
    };

    getChat = async (id) => {
      try {
        return await chatModel.getChat(id);
      } catch (err) {
        return err;
      }
    }
}
module.exports = new Service();