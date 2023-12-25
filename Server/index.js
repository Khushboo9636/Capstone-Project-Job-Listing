const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config()

const app = express();
app.use(cors({
    origin: 'https://capstone-project-job-listing.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

// Middleware to capture raw body
// app.use((req, res, next) => {
//     let data = '';
//     req.setEncoding('utf8');
//     req.on('data', (chunk) => {
//       data += chunk;
//     });
  
//     req.on('end', () => {
//       req.rawBody = data;
//       next();
//     });
//   });
//app.use(express.json());


 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded( {extended: true}));

app.use(express.static("public"));
mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
});

app.post('/your-endpoint', (req, res) => {
    console.log('Request Headers:', req.headers);
    console.log('Raw Body:', req.rawBody); // Log the raw body
    console.log('Parsed Body:', req.body);
  // ...
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
app.use('/api/job', jobRoutes);

app.use('/api/health', healthRoute);




const PORT = process.env.PORT || 8000;

app.listen(PORT, () =>{
    console.log(`server running at ${PORT}`);
    console.log( new Date());

})
