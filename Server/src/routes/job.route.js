var express = require("express")
const Job = require('../models/job.js')
const auth = require('../middlewares/islogin.js')
var router = express.Router();


const errorHandler = (res,error) =>{
   // console.log(error)
    res.status(500).json( { error:'Internal server error'})
}


router.post('/jobdescription',auth, async (req, res) => {
    
 try{
    console.log("Received Job Description using following data1:", req.body);
    const {
       companyName,
       logoURL,
       position,
       MonthlySalary,
       jobType,
       location,
       remote,
       skills,
       jobdescription,
       about,
       
    } = req.body;
    const recruiterName = req.body.name;
   
    console.log("Received Job Description using following data2:", req.body);
      // return req.body;
 
  
 
    // if (!companyName || !logoURL || !position || !MonthlySalary || !jobType || !location || !remote || !jobdescription || !about) {
    //    return res.status(401).json({
    //       error: 'All fields are required'
    //    });
    // }
 
    let skillsArray = skills;
    console.log('Original skills:', skills);
    
    if (typeof skills === 'string') {
       skillsArray = skills.split(',').map(skill => skill.trim());
    }
    
    console.log('Processed skills:', skillsArray);
 
   
       const jobPost = new Job({
          companyName,
          logoURL,
          position,
          MonthlySalary,
          jobType,
          location,
          remote,
          skillRequired: skillsArray,
          jobdescription,
          about,
          recruiterName
         
       });
      console.log(jobPost)
       await jobPost.save();
       res.json({
          success: true,
          message: "Job Description Added Successfully",
          name: recruiterName
       });
    } catch (error) {
       console.error(error);
       errorHandler(res, error);
    }
 });
 

router.put('/editjob/:id', auth, async (req, res) =>{
    try {
        const jobId  = req.params.id;
        const { companyName, jobType, skillRequired} = req.body;
        const recruiterName = req.body.name
      const jobUpdate=  await Job.findById(jobId);

      if (!jobPost) {
        return res.status(404).json({ 
            message: 'Job post not found'
        });
      }
      jobUpdate.companyName = companyName;
      jobUpdate.jobType = jobType;
      jobUpdate.skillRequired= skillRequired;
      jobUpdate.recruiterName= recruiterName;
          
      await jobUpdate.save();
        res.status(200).json({
            success: true,
            message: "Job Description Added Successfully",
            name: recruiterName,
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'Failed',
            message: 'Internel sever Error'
        })
        
    }
})



router.get('/viewjoblist', async (req, res) =>{
    const {jobType, skillRequired} = req.query

    try {
        let query ={};
        if(jobType) {
            query.jobType = jobType
        }
        if(skillRequired) {
            query.skillRequired = { $in: skillRequired.split('&')};

        }
        console.log(query)
        const jobPosts = await Job.find(query).sort({createdAt: -1});
        return res.json({jobPosts})
    } catch (error) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error'});
          
    }
})


router.get('/viewjob/:id', async (req, res) => {
    const jobId = req.params.id;
    try {
        
        const jobPost = await Job.findById(jobId)
         if(!jobPost){
            return res.status(404).json({ message: 'Job post not found' });

         }
        return res.json(jobPost)

    } catch (error) {;

        console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
 
    }
})







module.exports = router