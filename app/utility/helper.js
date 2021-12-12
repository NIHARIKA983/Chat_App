const Joi = require('joi');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
/**
 * @description   : validating all parameters we are getting from the user for registration
 * @method        : string, min, required, pattern of JOI
*/
class Helper {
    authSchema = Joi.object({
      firstName: Joi.string()
       .min(3)
       .required()
       // .pattern(new RegExp('^[A-Z][a-z]{3,}$')),
       .pattern(new RegExp("^([A-Z]?[a-zA-Z]{1,30}[ ]?[.]?[']?[ ]?[a-zA-Z]{1,30}[ ]?[.]?[']?[ ]?[a-zA-Z]{0,30}[ ]?[a-zA-Z]{0,30}?)")),
   
      lastName: Joi.string()
       .min(2)
       .required(),
       
      email: Joi.string()
       .pattern(new RegExp('([a-z0-9\\.-]+)@([a-z0-9-]+).([a-z]{2,4})(.[a-z]{2})?$'))
       .required(),
   
      password: Joi.string()
       .required()
       // .pattern(new RegExp('[A-Za-z0-9]{4,}[$&+,:;=?@#|<>.^*()%!-]{2,}')),
       .pattern(new RegExp('(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$')),
   
      
    });
   
     
   
    hashing = (password, callback) => {
     bcrypt.hash(password, 10, function (err, hash) {
       if (err) {
         throw err;
       } else {
         return callback(null, hash);
       }
     });
    };
     
   
    /**
      * @description   : creating token using jsonwebtoken module
      * @param {data} as data which comes from the body of postmen
      * @module        : jwt
     */
     token = (data) => {
      const dataForToken = {
        id: data._id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email        
      };
      //  console.log(dataForToken);
      return jwt.sign({ dataForToken }, process.env.JWT_SECRET);
    }

    validateToken = (req, res, next) => {
      console.log(req.headers.authorization);
      const header = req.headers.authorization;
      const myArr = header.split(' ');
      const token = myArr[1];
      try {
        if (token) {
          jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) {
              return res.status(400).send({ success: false, message: 'Invalid Token' });
            } else {
              req.user = decoded;
              next();
            }
          });
        } else {
          return res.status(401).send({ success: false, message: 'Authorisation failed! Invalid user' });
        }
      } catch (error) {
        return res.status(500).send({ success: false, message: 'Something went wrong!' });
      }
     }
   
    
   
    
}
   
module.exports = new Helper();