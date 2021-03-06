const mongoose = require('mongoose');
const chatSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Registration' },
  chatName: {
    type: String
  },

  username: {
    type: String
  },
  message: {
    type: String,
    required: true,
    minlength: 2
  }
}, {
  timestamps: true
});

const ChatRegister = mongoose.model('ChatRegister', chatSchema);

// created a class to write functions
class Model {
  
   newChat = (info, callback) => {
    const chat = new ChatRegister({
      userId: info.userId,
      username: info.username,
      message: info.message
    });
    chat.save((error, data) => {
      if (error) {
        return callback(error, null);
      } else {
        return callback(null, data);
      }
    });
  }

  getAllChat = () => {
    return new Promise((resolve, reject) => {
      ChatRegister.find()
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  };

  getChat = async (id) => {
    try {
      return await ChatRegister.find({ $and: [{ username: id.chatName }, { userId: id.userId }] });
    } catch (err) {
      return err;
    }
  }
}
module.exports = new Model();