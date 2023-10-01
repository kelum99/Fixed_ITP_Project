const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    maxLength: 10
  },

  productName: {
    type: String,
    required: true,
    min: 5,
    max: 255
  },

  price: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description:{
      type: String,
      required: true
  },
  userID:{
      type: String,
      required: true
  }
});

const productDetails = mongoose.model("productDetails", productSchema);
module.exports = productDetails;
