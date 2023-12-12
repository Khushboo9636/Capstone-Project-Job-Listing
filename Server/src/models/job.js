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
    
    recruiterName: {
        type: String,
        required: true,
      

    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    logoURL: {
        type: String,
        required: true,

    },
    position: {
        type: String,
        required: true,


    },
    MonthlySalary:{
        type: String,
        required: true,
    },
    jobType:{
        type: String,
        enum: ['Full-time', 'Part-time'],
        required: true,
    },
    location:{
        type: String,
        required: true,

    }, 
    remote: {
        type: String,
        enum: ['Remote', 'Office'],
        required: true,

    },
    skills:{
        type: [String],
        required: true,


    },
    jobdescription: {
        type: String,
        required: true,

    },
    about: {
        type: String,
        required: true,

    },
    additionalInfo: {
        type: String,
        required: false,
    }
}, {timestamps: true});

module.exports = mongoose.model('jobPost',jobSchema)