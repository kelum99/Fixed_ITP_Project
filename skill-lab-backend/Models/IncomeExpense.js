const mongoose = require('mongoose');

const finaceAnalysisSchema = new mongoose.Schema({
        type:{
            type: String,
            required: true,
            min: 5,
            max: 255
        },
        amount:{
            type: Number,
            required: true,
        },
        reason:{
            type: String,
            required: true
        },
        date:{ 
            type: Date,
            required: true
        },
        month:{ 
            type: String,
            required: true
        }
});

const FinanceAnalysis = mongoose.model('FinanceAnalysis', finaceAnalysisSchema );
module.exports = FinanceAnalysis;