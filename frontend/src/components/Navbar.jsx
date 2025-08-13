import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="bg-white shadow-md p-4 flex justify-between">
            <Link to="/" className="font-bold text-xl">Book Finder</Link>
            <div className="flex gap-4">
                <Link to="/my-library" className="hover:text-blue-500">
                    My Library
                </Link>
            </div>
        </nav>
    );
}
