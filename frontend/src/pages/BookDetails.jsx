import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { Heart } from "lucide-react";
import { toast } from "react-toastify";
import Header from "../components/Header";

export default function BookDetails() {
  const { id } = useParams();
  const { user } = useAuth();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false); // track favorite status

  useEffect(() => {
    async function fetchBookDetails() {
      try {
        const res = await axios.get(`/book/${id}`);
        setBook(res.data);

        if (user) {
          // Check if this book is in user's favorites
          const favRes = await axios.get("/favorites");
          const exists = favRes.data.some(fav => fav.bookId === id);
          setIsFavorite(exists);
        }
      } catch (err) {
        console.error("Error fetching book details:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBookDetails();
  }, [id, user]);

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (!book?.volumeInfo) return <p className="text-center mt-8">Book not found.</p>;

  const {
    title,
    authors,
    description,
    publishedDate,
    imageLinks
  } = book.volumeInfo;
  const webReaderLink = book.accessInfo?.webReaderLink;

  // Save/Remove from favorites
  const handleSave = async () => {
    if (!user) return toast.warning("Please login to manage favorites");

    try {
      setSaving(true);
      const res = await axios.post("/favorites", {
        bookId: id,
        title,
        authors,
        thumbnail: imageLinks?.thumbnail,
        availability: "Unknown"
      });

      if (res.data.action === "added") {
        toast.success("Saved to favorites!");
        setIsFavorite(true);
      } else if (res.data.action === "removed") {
        toast.info("Removed from favorites!");
        setIsFavorite(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("Unable to update favorites");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Book Cover */}
          <div className="flex-shrink-0">
            {imageLinks?.thumbnail ? (
              <img
                src={imageLinks.thumbnail}
                alt={title}
                className="w-48 h-auto rounded-lg shadow-md"
              />
            ) : (
              <div className="w-48 h-72 bg-gray-200 rounded-lg flex items-center justify-center">
                No Image
              </div>
            )}
          </div>

          {/* Book Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {title}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
              {authors?.join(", ")}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Published: {publishedDate || "N/A"}
            </p>

            {/* Description */}
            <div
              className="prose prose-sm dark:prose-invert max-w-none mb-6"
              dangerouslySetInnerHTML={{
                __html: description || "No description available.",
              }}
            />

            {/* Actions */}
            <div className="flex gap-4">
              {/* Favorite Button */}
              <button
                onClick={handleSave}
                disabled={saving}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition ${isFavorite
                  ? "bg-gray-600 hover:bg-gray-700 text-white"
                  : "bg-red-500 hover:bg-red-600 text-white"
                  }`}
              >
                <Heart
                  className="w-5 h-5"
                  fill={isFavorite ? "currentColor" : "none"}
                />
                {saving
                  ? "Saving..."
                  : isFavorite
                    ? "Remove from Favorites"
                    : "Save to Favorites"}
              </button>

              {/* Read Online */}
              {webReaderLink && (
                <a
                  href={webReaderLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
                >
                  Read Online
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}