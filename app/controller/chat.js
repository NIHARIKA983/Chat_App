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
}
module.exports = new Chat();