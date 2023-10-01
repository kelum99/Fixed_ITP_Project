const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        min: 5,
        max: 255,
    },
    email:{
        type: String,
        required: true,
        maxLength: 50
    },
    issuetype:{
        type: String,
        required:true,
        default: Date.now
    },
    subject:{
        type: String,
        required: true,
        min: 5,
        max: 50,
    },
    message:{
        type: String,
        required: true,
        min: 5,
        max: 500,
    },
});

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;