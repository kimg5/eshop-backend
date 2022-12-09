const express = require("express");
const router = express.Router();

const productService = require("../services/product");

router.get("/", async (req, res) => {
  const content = await productService.getAllProducts();
  res.send(content);
});

router.get("/featured", async (req, res) => {
  const content = await productService.getFeaturedProducts();
  res.send(content);
});

router.get("/detail/:id", async (req, res) => {
  const content = await productService.getProductDetail(req.params.id);
  res.send(content);
});

router.get("/search", async (req, res) => {
  const searchKey = req.body.searchKey;
  const category = req.body.category;
  const company = req.body.company;
  const colors = req.body.colors;
  const price = req.body.price;
  const shipping = req.body.shipping;
  const sort = req.body.sort;

  const content = await productService.search(searchKey, category, company, colors, price, shipping,sort);
  res.send(content);
});

router.post("/search", async (req, res) => {
  const searchKey = req.body.searchKey;
  const category = req.body.category;
  const company = req.body.company;
  const colors = req.body.colors;
  const price = req.body.price;
  const shipping = req.body.shipping;
  const sort = req.body.sort;

  const content = await productService.search(searchKey, category, company, colors, price, shipping,sort);
  res.send(content);
});

router.get("/image/update", async (req, res) => {
  const content = await productService.updateImages();
  res.send(content);
});

module.exports = router;
