import { useState } from "react";
import SearchBar from "../components/SearchBar";
import BookCard from "../components/BookCard";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Header from "../components/Header";
import { toast } from "react-toastify";
import api from "../api/axios";

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchBooks = async (query) => {
        setLoading(true);
        try {
            const res = await api.get(`/books/${query}`);
            setBooks(res.data);
        } catch (err) {
            toast.error("Failed to fetch books", err);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen p-4 bg-variable relative">
            <h1 className="text-3xl font-bold text-center mb-4">📚 Book Finder</h1>
            <Header />
            <SearchBar onSearch={fetchBooks} />
            {loading ? (
                Array(5).fill().map((_, i) => (
                    <div className="book-card" key={i}>
                        <Skeleton height={150} width={100} />
                        <div className="book-info">
                            <Skeleton width={200} height={25} />
                            <Skeleton count={2} width={300} />
                            <Skeleton width={100} height={30} />
                        </div>
                    </div>
                ))
            ) : (
                <div className="mt-8 grid gap-6 md:grid-cols-2">
                    {books.length === 0 && (
                        <p className="text-center w-full col-span-2">No books to display</p>
                    )}
                    {books.map((book, index) => (
                        <BookCard key={index} book={book} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
