const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // assuming you already have authentication
        required: true,
    },
    bookId: { type: String, required: true }, // from Google Books / OpenLibrary
    title: { type: String, required: true },
    authors: [String],
    thumbnail: String,
    availability: String, // "Free eBook", "Library Available", etc.
}, { timestamps: true });

module.exports = mongoose.model("Favorite", favoriteSchema);
