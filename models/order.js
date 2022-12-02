const mongoose = require("mongoose");
const ItemSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  }    
});    
const OrderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  card: {
    type: String,
    required: true,
  },      
  shippingFee: {
    type: Number,
  },
  total: {
    type: Number,
  },
  status: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  closedAt: {
    type: Date,
  },
  deliveredAt: {
    type: Date,
  },
  canceledAt: {
    type: Date,
  },    
  items: [ItemSchema]
});
const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
