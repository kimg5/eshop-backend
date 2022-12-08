const { getUserFromToken } = require("../middlewares/auth");
const userModel = require("../models/user");
const orderModel = require("../models/order");
const productModel = require("../models/product");

const respContent = (success, message, content) => {
  return { success: success, message: message, content: content };
};
const _getUsers = async () => {
  const users = await userModel.find();
  if (users) return respContent(true, "Users found", users);
  throw new Error("No users found");
}  
exports.getUsers = async () => {
  const respContent =  await _getUsers();
  return respContent;
};

exports.deleteUser = async (req) => {
  console.log("deleteUser");
  const status = await userModel.remove({ _id: req.params.userId });
  if (status.deletedCount === 1) {
    const respContent =  await _getUsers();
    return respContent;
  }
  throw new Error("The user " + req.params.userId + " cannot be deleted");
};

exports.updateUser = async (req) => {
  console.log("Updating user");
  const row = await userModel.findByIdAndUpdate(req.params.userId,{$set:{status:req.params.status}}).exec();
  if (row) {
    const respContent =  await _getUsers();
    return respContent;
  }
  throw new Error("The user " + req.params.userId + " cannot be update");
};

exports.getOrders = async () => {
  const orders = await orderModel.find().sort("-createdAt");
  if (orders) return respContent(true, "Orders found", orders);
  throw new Error("No users found");
};

exports.changeOrderStatus = async (req) => {
  const user = await getUserFromToken(req);
  const orderId = req.body.orderId;
  const status = req.body.status;
  const row = await orderModel.updateOne({ $and: [{ _id: orderId }, { userId: user._id }] }, { $set: { status: status } });
  if (row.modifiedCount === 1) return respContent(true, "order status updated successfully");
  throw new Error("The status of order " + orderId + " cannot be changed");
};

exports.getProducts = async () => {
  const products = await productModel.find().sort("name");
  if (products) return respContent(true, "Products found", products);
  throw new Error("No products found");
};

exports.getProduct = async (productId) => {
  const product = await productModel.findOne({ _id: productId });
  if (product) return respContent(true, "Product found", product);
  throw new Error("No product found");
};

exports.deleteProduct = async (req) => {
  const status = await productModel.remove({ _id: req.params.productId });
  if (status.deletedCount === 1) return respContent(true, "The product deleted successfully");
  throw new Error("The product cannot be deleted successfully");
};

exports.createProduct = async (req) => {
  const product = {
    name: req.body.name,
    price: req.body.price,
    colors: req.body.colors,
    featured: req.body.featured || false,
    company: req.body.company,
    category: req.body.category,
    description: req.body.description,
    image: req.body.image,
    images: req.body.images,
    shipping: req.body.shipping || false,
    brand: req.body.brand,
    available: req.body.available || "not available",
    sku: req.body.sku,
    stock: req.body.stock || 0,
  };
  const content = await productModel.create(product);
  return respContent(true, "The product is created successfully", content._id);
};

exports.updateProduct = async (req) => {
  const _id = req.body._id;
  const product = {
    name: req.body.name,
    price: req.body.price,
    colors: req.body.colors,
    featured: req.body.featured || false,
    company: req.body.company,
    category: req.body.category,
    description: req.body.description,
    image: req.body.image,
    images: req.body.images,
    shipping: req.body.shipping || false,
    brand: req.body.brand,
    available: req.body.available || "not available",
    sku: req.body.sku,
    stock: req.body.stock || 0,
  };

  const content = await productModel.replaceOne({ _id : _id}, { $set: product });
  return respContent(true, "The product is updated successfully", content);
};
