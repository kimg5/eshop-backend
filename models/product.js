var mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  colors: [String],
  featured: {
    type: Boolean,
    default: false,
  },
  company: {
    type: String,
  },
  category: {
    type: String,
  },
  description: {
    type: String,
  },
  shipping: {
    type: Boolean,
  },
  image: String,
  images: [String],
  brand:{
    type: String,
  },
  available: {
    type: String,
  },
  sku:{
    type: String,
  },
  stock: {
    type: Number,
  },
  rates: {
    type:Number,
  },
  reviews: {
    type:Number,
  }  
});
const Product = mongoose.model("Product", ProductSchema,"product");
module.exports = Product;
