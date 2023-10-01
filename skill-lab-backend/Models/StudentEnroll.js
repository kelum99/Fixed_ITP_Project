const mongoose = require('mongoose');

const enrollSchema = new mongoose.Schema({
    subject:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    lecturer:{
        type:String,
        required:true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

const enroll = mongoose.model('Enroll', enrollSchema);
module.exports = enroll;

