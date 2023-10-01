const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema({
        name:{
            type: String,
            required: true,
            min: 5,
            max: 255
        },
        accountNumber:{
            type: Number,
            required: true,
            maxLength: 16
        },
        bankName:{
            type: String,
            required: true
        },
        branch:{
            type: String,
            required: true
        },
        userID:{
            type: String,
            required: true
        }
});

const Bank = mongoose.model('Bank', bankSchema);
module.exports = Bank;