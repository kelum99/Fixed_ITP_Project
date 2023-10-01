const mongoose = require('mongoose');

const careereSchema = new mongoose.Schema({
        jobId:{
            type: String,
            required: true
            
        },
        title:{
            type: String,
            required: true
            
        },
        salary:{
            type: String,
            required: true
        },
        
        description:{
            type: String,
            required: true
           
        }

});

const Careere = mongoose.model('careere', careereSchema);
module.exports = Careere;