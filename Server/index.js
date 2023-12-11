const app = require('./app')
const mongoose = require('mongoose')
import dotenv from "dotenv"
dotenv.config()



app.listen(process.env.PORT, () =>{
    mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log(`Server is running on: http://localhost:${process.env.PORT}`))
    .catch(error => console.log(error))
    
    console.log( new Date())

})