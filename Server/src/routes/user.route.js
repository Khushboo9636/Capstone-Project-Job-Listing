var express = require('express');
var router= express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/user.js");

require('dotenv').config();

const errorHandler = (res, error) => {
    console.log(error);
    res.status(500).json({ error: ' Internal Server Error'})

};
router.post('/register',async (req, res) => {
    try {
        

        const {name,email, mobile, password } = req.body;
       
        console.log("Received registration request with the following data:");
        console.log("Name:", name);
        console.log("Email:", email);
        console.log("Mobile:", mobile);
        console.log("Password:", password);

        if(!name || !email || !mobile || !password){
            return res.status(400).json({
                 error: 'All fields are required'
                });

        }
        const existedUser = await User.findOne({
            $or: [{email}]

        })
        if(existedUser){
            return res.status(400).json({
                error: 'Email is already registered'
            })

        }

        const hashPassword = await bcrypt.hash(password, 10)

        const user = new User( { name, email,mobile, password: hashPassword });
        await user.save();
        res.json({ 
            success: true,
            user: email,
            name: name
        });


    } catch (error) {
        errorHandler(res,error);
        
    }

});
router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body

        if( !email || !password){
            return res.status(400).json({ error: "Email and Password are required"})

        }

        const user = await User.findOne({ email });
        if(!user) {
            return res.status(401).json({ error: 'Invalid email or password'})
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            return res.status(401).json({ error: 'Invalid email or password'})
        }

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: 60*30})
        res.json({
             success: true,
             token,
             recruiteName: user.name,
             user: email
            
            });
        
    } catch (error) {
        errorHandler(res, error)
    }
});

module.exports= router;