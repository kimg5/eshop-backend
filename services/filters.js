const categoryModel = require("../models/category");
const companyModel = require("../models/company");
const colorModel = require("../models/color");

const respContent = (success, message, content) => {
  return { success: success, message: message, content: content };
};

exports.getFilters = async () => {
  const categories = await categoryModel.find();
  const companies = await companyModel.find();
  const colors = await colorModel.find();

  if (categories && companies && colors) {
    return respContent(true, "", { categories: categories, companies: companies, colors: colors });
  }

  throw new Error("Cannot get filters data from mongodb");
};
