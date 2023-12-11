const mongoose = require("mongoose")

const userSchema =new mongoose.Schema(
    {
       name: {
            type: String,
            required: true,
            index: true,
            
        },
        email: {
            type: String,
            required: true,
            unique: true,

        },
        mobile: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
    }
);

module.exports = mongoose.model("user",userSchema)