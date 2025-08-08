
const BookCard = ({ book }) => {
    return (
        <div className="border p-4 rounded-xl shadow-md bg-white flex flex-col md:flex-row gap-4">
            <img
                src={book.coverImage}
                alt={book.title}
                className="w-28 h-40 object-cover rounded-md mx-auto md:mx-0"
            />
            <div className="flex flex-col justify-between w-full">
                <div>
                    <h2 className="text-xl font-semibold">{book.title}</h2>
                    <p className="text-gray-600">by {book.authors?.join(', ')}</p>
                    <div className="flex gap-2 mt-2 flex-wrap">
                        {book.tags?.includes("Free eBook") && (
                            <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded-full">
                                Free eBook
                            </span>
                        )}
                        {book.tags?.includes("Library Available") && (
                            <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">
                                Library Available
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex gap-4 mt-4 flex-wrap">
                    {book.webReaderLink && (
                        <a
                            href={book.webReaderLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline"
                        >
                            Read Online
                        </a>
                    )}
                    {book.libraryLink && (
                        <a
                            href={book.libraryLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline"
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
