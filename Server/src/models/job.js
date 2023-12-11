const mongoose = require("mongoose")

const jobSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    },
    companyName: {
        type: String,
        required: true,

    }, 

    remote: {
        type: String,
        enum: ['Remote', 'Office'],
        required: true,

    },
    skills:{
        type: [string],
        required: true,


    },
    recruiterName: {
        type:string,
        required: true,

    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    logoURL: {
        type: string,
        required: true,

    },
    position: {
        type: string,
        required: true,


    },
    MonthlySalary:{
        type: string,
        required: true,
    },
    jobType:{
        type: string,
        enum: ['Full-time', 'Part-time'],
        required: true,
    },
    location:{
        type: string,
        required: true,

    }, 
    jobdescription: {
        type: string,
        required: true,

    },
    about: {
        type: string,
        required: true,

    },
});

module.exports = mongoose.model('jobPost',jobSchema)