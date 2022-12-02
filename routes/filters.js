const express = require("express");
const router = express.Router();

const filtersService = require("../services/filters");


router.get("/", async (req, res) => {
    const content = await filtersService.getFilters();
    res.send(content);
});

module.exports = router;
