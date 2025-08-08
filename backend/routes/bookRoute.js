const express = require("express");
const router = express.Router();
const { searchBooks } = require("../controller/bookController");

router.get("/:query", searchBooks);

module.exports = router;