const jwt = require('jsonwebtoken')
require('dotenv').config()


  const isLoggedIn = (req,res,next) =>{
  //  console.log(req.h)
    
   // console.log(req.headers.Authorization)
       const token = req.header('authorization').split(" ")[1];
         console.log(token)
       if(!token){

        return res.status(401).json({
            message:" Unauthorized User"
        })
       }

    try {
        const jwtDecode = jwt.verify(token, process.env.JWT_SECRET);
        console.log(jwtDecode)
        console.log(req.body)
        req.body.user =jwtDecode.user;
        req.body.name =jwtDecode.name;
        console.log("successfull")
        next();
    } catch (error) {
        console.error(error)
        res.status(401).json({
            status: 'failed',
            message: "you are not LogIn,please, first login"
        })
        
    }
  }
  module.exports = isLoggedIn;