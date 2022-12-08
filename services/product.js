const productModel = require("../models/product");

const respContent = (success, message, content) => {
  return { success: success, message: message, content: content };
};
const productsProjection = { image: 1, name: 1, price: 1, category: 1, _id: 1 };
const productDetailProjection = { images: 1, name: 1, price: 1, colors: 1, available: 1, sku: 1, brand: 1, rate: 1, reviews: 1, _id: 1,description:1,image,1 };

exports.getAllProducts = async () => {
  const products = await productModel.find({}, productsProjection);
  if (products) return respContent(true, "total : " + products.length, products);
  throw Error("Sorry, no products matched your search.");
};

exports.getFeaturedProducts = async () => {
  const products = await productModel.find({ featured: true }, productsProjection);
  if (products) return respContent(true, "total : " + products.length, products);
  throw Error("Sorry, no products matched your search.");
};

exports.getProductDetail = async (id) => {
  const product = await productModel.findOne({ _id: id }, productDetailProjection);
  if (product) return respContent(true, "", product);
  throw Error("Sorry, no products matched your search.");
};

exports.search = async (searchKey, category, company, colors, price, shipping, sort) => {
  let conditions = new Array();

  if (searchKey) {
    conditions.push({ name: { $regex: searchKey, $options: "i" } });
  }
  if (category && category != "All") {
    conditions.push({ category: category });
  }
  if (company && company != "All") {
    conditions.push({ company: company });
  }
  if (colors && colors != "All") {
    conditions.push({ colors: colors });
  }
  if (price) {
    conditions.push({ price: { $lt: price } });
  }
  if (shipping) {
    conditions.push({ shipping: shipping });
  }

  if(!sort) {
    sort ="-price";
  }  
  let products;
  if (conditions && conditions.length > 0) {
    products = await productModel.find({ $and: conditions }, productsProjection).sort(sort).limit(50);
  } else {
    products = await productModel.find().sort(sort).limit(50);
  }
  if (products) return respContent(true, "total : " + products.length, products);
  throw Error("Sorry, no products matched your search.");
};
