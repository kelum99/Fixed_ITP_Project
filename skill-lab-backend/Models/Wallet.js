const mongoose = require('mongoose');
const walletSchema = new mongoose.Schema({
        nickName:{
            type: String,
            min: 5,
            max: 255
        },
        name:{
            type: String,
            required: true,
            min: 5,
            max: 255
        },
        cardNumber:{
            type: Number,
            required: true,
            maxLength: 16
        },
        expireDate:{
            type: Date,
            default: Date.now
        },
        cvv:{
            type: Number,
            required: true,
            max: 999
        },
        userID:{
            type: String,
            required: true
        }
});

const Wallet = mongoose.model('Wallet', walletSchema);
module.exports = Wallet;