const express = require("express");
const router = express.Router();

const userModel = require("../models/user");
const orderModel = require("../models/order");
const adminService = require("../services/admin");

const {isAdmin} = require("../middlewares/auth");

router.get("/users", isAdmin, async (req, res) => {
  const content = await adminService.getUsers();
  res.send(content);
});

router.delete("/user/:userId", isAdmin, async (req, res) => {
  const content = await adminService.deleteUser(req);
  res.send(content);
});

router.patch("/user/:userId/:status", isAdmin, async (req, res) => {
  console.log("Updating user patch");
  const content = await adminService.updateUser(req);
  res.send(content);
});

router.get("/user/:userId/:status", isAdmin, async (req, res) => {
  console.log("Updating user get");
  const content = await adminService.updateUser(req);
  res.send(content);
});

router.get("/orders", isAdmin, async (req, res) => {
  const content = await adminService.getOrders();
  res.send(content);
});

router.patch("/orders/status", isAdmin, async (req, res) => {
  const content = await adminService.changeOrderStatus(req);
  res.send(content);
});

router.get("/products",isAdmin, async (req, res) => {
  const content = await adminService.getProducts();
  res.send(content);
});

router.get("/products/:productId",isAdmin, async (req, res) => {
  const content = await adminService.getProduct(req.params.productId);
  res.send(content);
});

router.delete("/products/:productId",isAdmin, async (req, res) => {
  const content = await adminService.deleteProduct(req);
  res.send(content);
});

router.post("/products",isAdmin, async (req, res) => {
  const content = await adminService.createProduct(req);
  res.send(content);
});

router.put("/products",isAdmin, async (req, res) => {
  const content = await adminService.updateProduct(req);
  res.send(content);
});

module.exports = router;
