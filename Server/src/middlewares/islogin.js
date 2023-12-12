const jwt = require('jsonwebtoken')
require('dotenv').config()


  const isLoggedIn = (req,res,next) =>{
       const token = req.header('Authorization');
       if(!token){

        return res.status(401).json({
            message:" Unauthorized User"
        })
       }

    try {
        const jwtDecode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.user =jwtDecode.user;
        next();
    } catch (error) {
        res.status(401).json({
            status: 'failed',
            message: "you are not LogIn,please, first login"
        })
        
    }
  }
  module.exports = isLoggedIn;