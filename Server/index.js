const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

const app = express()
app.use(cors());

app.use(bodyParser.urlencoded( {extended: false}));
app.use(bodyParser.json());
app.use(express.static("public"));
mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
});

const userRoutes = require('./src/routes/user.route.js')
const jobRoutes = require('./src/routes/job.route.js')
const healthRoute = require('./src/routes/health.route.js')



app.get("/", async( req,res) =>{
    res.status(200).json({
        status: "active",
        service: process.env.SERVER,
        time: new Date(),
    })
   
});

app.use('/api/user', userRoutes);

app.use('/api/health', healthRoute);



const PORT = process.env.PORT || 8000;

app.listen(PORT, () =>{
    console.log(`server running at ${PORT}`);
    console.log( new Date());

})