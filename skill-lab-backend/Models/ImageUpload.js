
//const { ObjectId } = mongoose.Schema;

const mongoose = require('mongoose');

const ImagesSchema = new mongoose.Schema(
  {
    

    images: {
        
    },
    

    
  });
   
  

const ImageUpload = mongoose.model('ImageUpload', ImagesSchema);
module.exports = ImageUpload ;