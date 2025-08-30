const Favorite = require("../models/Favorite.js");

// GET /favorites
const getFavorite = async (req, res) => {
    try {
        const userId = req.user?._id;
        if (!userId) return res.status(401).json({ error: "Unauthorized" });
        const favorites = await Favorite.find({ userId });
        res.json(favorites);
    } catch (error) {
        console.error("Error fetching favorites:", error);
        res.status(500).json({ error: "Failed to fetch favorites" });
    }
};

// POST /favorites  (toggle)
const toggleFavorite = async (req, res) => {
    try {
        const userId = req.user?._id;
        if (!userId) return res.status(401).json({ error: "Unauthorized" });

        const { bookId, title, authors, thumbnail, availability } = req.body;
        if (!bookId) return res.status(400).json({ error: "bookId is required" });

        const existing = await Favorite.findOne({ userId, bookId });

        if (existing) {
            await Favorite.deleteOne({ _id: existing._id });
            return res.json({ action: "removed", message: "Favorite removed" });
        }

        const favorite = await Favorite.create({
            userId,
            bookId,
            title,
            authors,
            thumbnail,
            availability,
        });

        res.status(201).json({ action: "added", favorite, message: "Favorite added" });
    } catch (error) {
        console.error("Error toggling favorite:", error);
        res.status(500).json({ error: "Failed to toggle favorite" });
    }
};

// DELETE /favorites/:id   (by favorite _id)
const deleteFavorite = async (req, res) => {
    try {
        const userId = req.user?._id;
        if (!userId) return res.status(401).json({ error: "Unauthorized" });

        const { id } = req.params;
        const favorite = await Favorite.findOneAndDelete({ _id: id, userId });
        if (!favorite) return res.status(404).json({ error: "Favorite not found" });

        res.json({ message: "Favorite removed" });
    } catch (error) {
        console.error("Error removing favorite:", error);
        res.status(500).json({ error: "Failed to remove favorite" });
    }
};

module.exports = {
    getFavorite,
    toggleFavorite,
    deleteFavorite,
};
