var express = require('express');
var router = express.Router();

//get heath api
 router.get('/health', function(req,res) {
     try {
        const serverInfo = {
            serverName: process.env.SERVER,
            currentTime: new Date(),
            state: 'active',
        }
        res.json(serverInfo)
      
     } catch (error) {
        res.json({
            status: 'Failed',
            message: "Something Wrong"
        })
     }
 });


module.exports = router;