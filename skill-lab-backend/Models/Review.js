const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    stid:{
        type: String,
        max: 10,
    },
    fname:{
        type: String,
        min: 5,
        max: 255,
    },
    course:{
        type: String,
        maxLength: 50
    },
    rate:{
        type: Number,
        
        
    },
    comment:{
        type: String,
        min: 5,
        max: 50,
    },
            
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;