const mongoose = require("mongoose");
const CompanySchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  }
});
const Company = mongoose.model("Company", CompanySchema,"company");
module.exports = Company;
