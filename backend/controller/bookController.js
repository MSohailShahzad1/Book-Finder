const axios = require('axios');

const getOpenLibraryCover = (coverId) => {
    return coverId ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` : null;
};

const searchBooks = async (req, res) => {
    const query = req.params.query;

    try {

        const googleRes = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
        const googleBooks = googleRes.data.items || [];

        const openLibraryRes = await axios.get(`https://openlibrary.org/search.json?q=${query}`);
        const openBooks = openLibraryRes.data.docs || [];

        const mergedBooks = [];

        for (const gBook of googleBooks) {
            const volumeInfo = gBook.volumeInfo;
            const accessInfo = gBook.accessInfo;

            const isbn = (volumeInfo.industryIdentifiers || []).find(i => i.type === 'ISBN_13')?.identifier;

            const olMatch = openBooks.find(ob => ob.isbn?.includes(isbn));

            const book = {
                bookId: gBook.id,
                title: volumeInfo.title || "Unknown Title",
                authors: volumeInfo.authors || ["Unknown Author"],
                isbn: isbn || null,
                coverImage: volumeInfo.imageLinks?.thumbnail || getOpenLibraryCover(olMatch?.cover_i),
                tags: [],
                libraryLink: olMatch?.edition_key ? `https://openlibrary.org/books/${olMatch.edition_key[0]}` : null,
                webReaderLink: accessInfo?.webReaderLink || null,
            };

            if (accessInfo?.epub?.isAvailable) {
                book.tags.push("Free eBook");
            }

            if (olMatch?.isbn && olMatch.edition_key) {
                book.tags.push("Library Available");
                book.libraryBranch = "Central Library, Mock City";
            }

            mergedBooks.push(book);
        }

        mergedBooks.sort((a, b) => {
            const aPriority = (a.tags.includes("Free eBook") ? 1 : 0) + (a.tags.includes("Library Available") ? 1 : 0);
            const bPriority = (b.tags.includes("Free eBook") ? 1 : 0) + (b.tags.includes("Library Available") ? 1 : 0);
            return bPriority - aPriority;
        });

        res.json(mergedBooks);
    } catch (err) {
        console.error("Error fetching books:", err.message);
        res.status(500).json({ error: "Something went wrong." });
    }
};
// controllers/bookController.js
const getPopularBooks = async (req, res) => {
    try {
        // Fetch fiction category from Google Books
        const googleRes = await axios.get(
            `https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=10`
        );
        const googleBooks = googleRes.data.items || [];

        // Map into your normalized format
        const popularBooks = googleBooks.map(gBook => {
            const volumeInfo = gBook.volumeInfo;
            const accessInfo = gBook.accessInfo;

            return {
                bookId: gBook.id,
                title: volumeInfo.title || "Unknown Title",
                authors: volumeInfo.authors || ["Unknown Author"],
                isbn: (volumeInfo.industryIdentifiers || [])[0]?.identifier || null,
                coverImage: volumeInfo.imageLinks?.thumbnail || null,
                tags: [],
                libraryLink: null,
                webReaderLink: accessInfo?.webReaderLink || null,
            };
        });

        res.json(popularBooks);
    } catch (err) {
        console.error("Error fetching popular books:", err.message);
        res.status(500).json({ error: "Something went wrong." });
    }
};

module.exports = { searchBooks, getPopularBooks };

