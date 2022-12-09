const express = require("express");
const router = express.Router();

const normalService = require("../services/normal");
const { isLogin } = require("../middlewares/auth");

router.get("/users", isLogin, async (req, res) => {
  const content = await normalService.getProfile(req);
  res.send(content);
});

router.patch("/users/password", isLogin, async (req, res) => {
  const content = await normalService.updatePassword(req);
  res.send(content);
});

router.post("/users/password", isLogin, async (req, res) => {
  const content = await normalService.updatePassword(req);
  res.send(content);
});


router.patch("/users/profile", isLogin, async (req, res) => {
  const content = await normalService.updateProfile(req);
  res.send(content);
});

router.post("/users/profile", isLogin, async (req, res) => {
  const content = await normalService.updateProfile(req);
  res.send(content);
});


router.get("/orders", isLogin, async (req, res) => {
    const content = await normalService.getOrders(req);
    res.send(content);
});

router.patch("/orders/cancel/:orderId", isLogin, async (req, res) => {
    const content = await normalService.cancelOrder(req);
    res.send(content);
});

router.post("/orders/cancel/:orderId", isLogin, async (req, res) => {
  const content = await normalService.cancelOrder(req);
  res.send(content);
});

router.post("/orders", isLogin, async (req, res) => {
    const content = await normalService.createOrders(req);
    res.send(content);
});

module.exports = router;
