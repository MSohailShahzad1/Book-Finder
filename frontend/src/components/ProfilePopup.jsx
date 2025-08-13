import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../api/axios';

const ProfilePopup = ({ onClose }) => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("bf_token");
                const res = await api.get('/auth/profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setProfile(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchProfile();
    }, []);

    return (
        <div className="absolute right-4 top-14 bg-white shadow-lg rounded-lg p-4 w-64 z-50">
            {profile ? (
                <>
                    <h3 className="font-bold text-lg mb-2">👤 {profile.username}</h3>
                    <p className="text-sm text-gray-700">📧 {profile.email}</p>
                    <p className="text-xs text-gray-500 mt-2">User ID: {profile._id}</p>
                    <button
                        onClick={onClose}
                        className="mt-4 w-full bg-red-500 text-white py-1 rounded"
                    >
                        Close
                    </button>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ProfilePopup;
