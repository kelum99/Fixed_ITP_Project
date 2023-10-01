
//const { ObjectId } = mongoose.Schema;

const mongoose = require('mongoose');

const coursecreateSchema = new mongoose.Schema(
  {
     
    name: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 320,
      required: true,
    },
    
    description: {
      type: {},
      minlength: 200,
      required: true,
    },
    price: {
      type: Number,
      default: 0.00,
    },
  
    paid: {
      type: Boolean,
      default: false,
    },

    category:{
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 320,
      required: true,
    },

    userID:{
      type: String,
      required: true
  }
    

    
  });
   
  

const CourseCreate = mongoose.model('CourseCreate', coursecreateSchema);
module.exports = CourseCreate ;