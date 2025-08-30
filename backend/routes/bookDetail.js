
const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`);

        res.json(response.data);
    } catch (error) {
        console.error("Error fetching book details:", error);
        res.status(500).json({ message: "Error fetching book details" });
    }
});

module.exports = router;