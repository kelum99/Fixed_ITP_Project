const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    studentName:{
        type: String,
        required: true,
        min: 5,
        max: 255,

    },
    email:{
        type: String,
        required: true,
        
    },
    courseName:{
        type: String,
        required: true,
        
    },
    topic:{
        type: String,
        required: true,
        
    },
    question:{
        type: String,
        required: true,
        
    },
});

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;