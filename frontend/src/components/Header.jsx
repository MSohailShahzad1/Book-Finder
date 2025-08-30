import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProfilePopup from './ProfilePopup';
import DarkModeToggle from "./DarkModeToggle";
import { toast } from 'react-toastify';

const Header = () => {
    const { user, logout } = useAuth();
    const [showProfile, setShowProfile] = useState(false);

    return (
        <header className="bg-variable shadow py-3 relative">
            <div className="max-w-5xl mx-auto px-4 flex justify-between items-center">
                <Link to="/" className="font-bold text-xl">📚 Book Finder</Link>
                <nav className="flex items-center gap-4">
                    <Link to="/" className="text-sm">Search</Link>
                    {user ? (
                        <Link to="/my-library" className="text-sm">My Library</Link>
                    ) : (
                        <button
                            className="text-sm text-gray-600"
                            onClick={() => toast.warning("Please login to acces Favorite")}
                        >
                            My Library
                        </button>
                    )}

                    {user ? (
                        <>
                            <button
                                onClick={() => setShowProfile(prev => !prev)}
                                className="text-sm text-gray-700"
                            >
                                Hi, {user.username}
                            </button>
                            <button onClick={logout} className="text-sm text-red-600">Logout</button>
                            {showProfile && <ProfilePopup onClose={() => setShowProfile(false)} />}
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-sm text-blue-600">Login</Link>
                            <Link to="/register" className="text-sm text-green-600">Register</Link>
                        </>
                    )}
                    <DarkModeToggle />
                </nav>
            </div>
        </header>
    );
};

export default Header;
