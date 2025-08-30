import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { useState } from 'react';
import { Heart } from 'lucide-react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
    const { user } = useAuth();
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        if (!user) return toast.warning('Please login to save favorites');

        try {
            setSaving(true);
            const res = await api.post("/favorites", {
                bookId: book.bookId,
                title: book.title,
                authors: book.authors,
                thumbnail: book.coverImage,
                availability: book.tags?.includes("Library Available") ? "Available" : "Not Available"
            });

            if (res.data.action === "added") {
                toast.success("Saved to favorites!");
            } else if (res.data.action === "removed") {
                toast.info("Removed from favorites!");
            }
        } catch (err) {
            console.error(err);
            toast.error("Unable to update favorites");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
            {/* Image */}
            <div className="relative">
                <Link to={`/book/${book.bookId}`}>
                    <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-full h-60 object-cover"
                    />
                </Link>
                {/* Save button as floating icon */}
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="absolute top-3 right-3 bg-white dark:bg-gray-700 p-2 rounded-full shadow-md hover:bg-red-100 dark:hover:bg-red-200 transition"
                >
                    <Heart
                        className={`w-5 h-5 ${saving ? "text-gray-400" : "text-red-500"}`}
                        fill={saving ? "none" : "currentColor"}
                    />
                </button>
            </div>
            {/* Content */}
            <div className="p-4 flex flex-col flex-grow">
                <Link to={`/book/${book.bookId}`}>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">{book.title}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-300 mb-3">{book.authors?.join(', ')}</p>

                    {/* Tags */}
                    <div className="flex gap-2 mb-3 flex-wrap">
                        {book.tags?.includes("Free eBook") && (
                            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                                Free eBook
                            </span>
                        )}
                        {book.tags?.includes("Library Available") && (
                            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                                Library Available
                            </span>
                        )}
                    </div>
                </Link>
                {/* Links */}
                <div className="mt-auto flex gap-4 text-sm">
                    {book.webReaderLink && (
                        <a
                            href={book.webReaderLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                            Read Online
                        </a>
                    )}
                    {book.libraryLink && (
                        <a
                            href={book.libraryLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                            View in Library
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookCard;
