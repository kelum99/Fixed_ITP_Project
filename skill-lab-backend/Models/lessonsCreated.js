
//const { ObjectId } = mongoose.Schema;

const mongoose = require('mongoose');

const lessoncreateSchema = new mongoose.Schema(
  {
    cid: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 320,
      required: true,
    },

    lessoname: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 320,
      required: true,
    },

    lesson: {
      type: {},
      minlength: 200,
    },

  
  });



const lessonscreated = mongoose.model('lessonsCreated', lessoncreateSchema);
module.exports = lessonscreated;