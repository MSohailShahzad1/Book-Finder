
const Favorite = require("../models/Favorite.js");


// GET all favorites for a user
const getFavorite = async (req, res) => {
    try {
        const userId = req.user?._id;
        const favorites = await Favorite.find({ userId });
        res.json(favorites);
    } catch (error) {
        console.error("Error fetching favorites:", error);
        res.status(500).json({ error: "Failed to fetch favorites" });
    }
}

// ADD a book to favorites
const addFavorite = async (req, res) => {
    try {
        const userId = req.user?._id || "dummyUser";
        const { bookId, title, authors, thumbnail, availability } = req.body;

        const existing = await Favorite.findOne({ userId, bookId });
        if (existing) return res.status(400).json({ error: "Already in favorites" });

        const favorite = new Favorite({
            userId,
            bookId,
            title,
            authors,
            thumbnail,
            availability
        });

        await favorite.save();
        res.status(201).json(favorite);
    } catch (error) {
        console.error("Error adding favorite:", error);
        res.status(500).json({ error: "Failed to add favorite" });
    }
}

// DELETE a favorite
const deleteFavorite = async (req, res) => {
    try {
        const userId = req.user?._id || "dummyUser";
        const favorite = await Favorite.findOneAndDelete({ _id: req.params.id, userId });
        if (!favorite) return res.status(404).json({ error: "Favorite not found" });
        res.json({ message: "Favorite removed" });
    } catch (error) {
        res.status(500).json({ error: "Failed to remove favorite" });
    }
}

module.exports = {
    getFavorite,
    addFavorite,
    deleteFavorite
};