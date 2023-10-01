const mongoose = require('mongoose');

const ApplicantSchema = new mongoose.Schema({
        position:{
            type: String,
            required: true
            
        },
        firstName:{
            type: String,
            required: true
            
        },
        lastName:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true,
            
        },
        phone:{
            type: Number,
            required: true,
           
        },
        address:{
            type: String,
            required: true
           
        },
        nic:{
            type: String,
            required: true
           
        },
        birthDate:{
            type: Date,
            required: true
           
        },
        status:{
            type: String,
            required: true
           
        }

});

const Applicant = mongoose.model('applicant', ApplicantSchema);
module.exports = Applicant;