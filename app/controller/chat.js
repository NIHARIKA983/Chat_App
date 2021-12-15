const chatService = require('../service/chat');

class Chat {
    
     newChat =(req, res) => {
      try {
        const chat = {
          userId: req.user.dataForToken.id,
          username: req.body.username,
          message: req.body.message
        };
  
        chatService.newChat(chat, (error, data) => {
          if (error) {
            return res.status(400).json({
              message: 'failed to post chat',
              success: false
            });
          } else {
            return res.status(201).send({
              message: 'Successfully created new  chat',
              success: true,
              data: data
            });
          }
        });
      } catch {
        return res.status(500).json({
          message: 'Error occured',
          success: false
        });
      }
    }
    getAllChat = (req, res) => {
      try {
        chatService.getAllChat(resolve, reject);
        function resolve (data) {
          return res.status(201).json({
            message: 'Get All Chats successfully',
            success: true,
            data: data
          });
        }
        function reject () {
          return res.status(400).json({
            message: 'failed to get all Chats',
            success: false
          });
        }
      } catch {
        return res.status(500).json({
          message: 'Internal Error'
        });
      }
    };
}
module.exports = new Chat();