const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
    date:{
        type: Date,
        default: Date.now,
        required: true
    },
    notice:{
        type: String,
        required: true,
        maxlength:500
    },

});
const Notice = mongoose.model('Notice', noticeSchema);
module.exports = Notice;