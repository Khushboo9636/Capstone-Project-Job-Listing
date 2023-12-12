var express = require("express")
const Job = require('../models/job.js')
const auth = require('../middlewares/islogin.js')
var router = express.Router();




const errorHandler = (req, res) =>{
    console.log(error)
    res.status(500).json( { error:'Internal server error'})
}

router.post('/jobDescription', auth , async (req, res) =>{
 
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
               additionalInfo
    
            } = req.body
            const recruiterName = req.body.name;
        console.log("Received Job Description using following data:");
        console.log("compannyName:", companyName);
        console.log("position:", position);
        console.log("jobType:", jobType);
        console.log("jobdescription:",jobdescription);
        console.log("additionalInfo:",additionalInfo);
        console.log(req.body)
        let skillsArray =skills;
        if(typeof skills === 'String') {
         skillsArray = skills.split(',').map(skill =>skill.trim());
        }

        if(!companyName || !logoURL || !position || !MonthlySalary || !jobType ||!location || !remote || !skills || !jobdescription || !about){
            return res.status(401).json({
                error: 'All fields are required'
            });
        };

        
       
     try {
          
        const jobPost = new Job ({
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
            additionalInfo,
            recruiterName
        });
     
        await jobPost.save()
        res.json({ 
            success: true,
            message:"Job Desciption Added Successfully",
            name: recruiterName
        });


    } catch (error) {
        console.error(err)
        errorHandler(res,error);
        
        
    }

});


router.put('editjob/:id', auth, async (req, res) =>{
    try {
        const jobId  = req.params.id;
        const { companyName, jobType, skillRequired} = req.body;
        const recruiterName = req.body.name
      const jobUpdate=  await Job.findByIdAndUpdate(jobId);

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
            status:'Success',
            message: 'Job Updated successfully.'
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'Failed',
            message: 'Internel sever Error'
        })
        
    }
})





module.exports = router