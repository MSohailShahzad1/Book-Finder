const express = require("express");
const authMiddleware = require('../middleware/authMiddleware');
const { getFavorite, toggleFavorite, deleteFavorite } = require("../controller/favoriteController");
// import auth middleware here if using authentication
const router = express.Router();

// GET all favorites for a user 
router.get("/", authMiddleware, getFavorite);

// ADD a book to favorites
router.post("/", authMiddleware, toggleFavorite);

// DELETE a favorite
router.delete("/:id", authMiddleware, deleteFavorite);

module.exports = router;
