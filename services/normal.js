const validator = require("validator");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const { getUserFromToken } = require("../middlewares/auth");
const userModel = require("../models/user");
const orderModel = require("../models/order");

const respContent = (success, message, content) => {
  return { success: success, message: message, content: content };
};

exports.getProfile = async (req) => {
  const user = await getUserFromToken(req);
  user.password = "";
  return respContent(true, "", user);
};

exports.updatePassword = async (req) => {
  const password = req.body.password;
  const username = req.body.confirmPassword;
  const user = await getUserFromToken(req);

  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const results = await userModel.updateOne(
    {
      _id: user._id,
    },
    {
      $set: {
        password: hashedPassword,
      },
    }
  );
  if (results.matchedCount == 1 && results.modifiedCount == 1) {
    return respContent(true, "Password Updated successfully", "Password Updated successfully");
  }
  throw new Error("Update the password incorrectly");
};

exports.updateProfile = async (req) => {
  const email = req.body.email;
  const card = req.body.card;
  
  fieldsToUpdate = {};
  if (card) {
    fieldsToUpdate.card = card;
  }
  if (email) {
    fieldsToUpdate.email = email;
  }

  if (fieldsToUpdate === {}) {
    throw new Error("No fields to update for the profile");
  }

  const user = await getUserFromToken(req);
  const results = await userModel.updateOne(
    {
      _id: user._id,
    },
    {
      $set: fieldsToUpdate,
    }
  );

  if (results.matchedCount == 1 && results.modifiedCount == 1) {
    return respContent(true, "Profile Updated successfully", "Profile Updated successfully");
  }
  throw new Error("Update the profile incorrectly");
};

exports.getOrders = async (req) => {
  const user = await getUserFromToken(req);
  const orders = await orderModel.find({ userId: user._id }).sort({ createAt: 1 });
  if (orders) return respContent(true, "", orders);
  throw new Error("No orders found");
};

exports.cancelOrder = async (req) => {
  const user = await getUserFromToken(req);
  const orderId = req.params.orderId;
  const row = await orderModel.updateOne({ $and: [{ _id: orderId }, { userId: user._id }] }, { $set: { status: "canceled" } });
  if (row.modifiedCount === 1) return respContent(true, "","order canceled");
  throw new Error("The order " + orderId + " cannot be canceled");
};

exports.createOrders = async (req) => {
    const user = await getUserFromToken(req);

    const order = {
        userId: user._id,
        username: user.username,
        email: user.email,
        card: user.card,
        shippingFee: req.body.shippingFee||0,
        total: req.body.total,
        status: 'open',
        createdAt: Date.now(),
        items:req.body.items
      };
      const content = await orderModel.create(order);
      return respContent(true, "The order is created successfully", content._id);
    
  };