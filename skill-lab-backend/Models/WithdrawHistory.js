const mongoose = require('mongoose');

const withdrawHistorySchema = new mongoose.Schema({
        reason:{
            type: String,
            required: true,
            min: 5,
            max: 255
        },
        amount:{
            type: Number,
            required: true,
            maxLength: 16
        },
        date:{
            type: Date,
            default: Date.now
        },
        status:{
            type: String
        }
});

const withdrawHistory = mongoose.model('WithdrawHistory', withdrawHistorySchema);
module.exports = withdrawHistory;