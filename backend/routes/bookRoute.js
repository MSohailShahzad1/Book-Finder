const express = require("express");
const router = express.Router();
const { searchBooks, getPopularBooks } = require("../controller/bookController");

router.get("/:query", searchBooks);
router.get("/popular-books", getPopularBooks)

module.exports = router; 