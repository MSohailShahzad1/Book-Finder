import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(() => {
        const u = localStorage.getItem('bf_user');
        return u ? JSON.parse(u) : null;
    });
    const [token, setToken] = useState(() => localStorage.getItem('bf_token'));
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // If token exists but no user object, try to fetch profile
        const syncProfile = async () => {
            if (token && !user) {
                try {
                    const res = await api.get('/auth/profile');
                    setUser(res.data);
                    localStorage.setItem('bf_user', JSON.stringify(res.data));
                } catch (err) {
                    console.error('Profile fetch failed, logging out', err);
                    logout();
                }
            }
        };
        syncProfile();
        // eslint-disable-next-line
    }, []);

    const register = async ({ username, email, password }) => {
        setLoading(true);
        try {
            await api.post('/auth/register', { username, email, password });

            const loginRes = await api.post('/auth/login', { email, password });
            const { token: t, user: u } = loginRes.data;
            localStorage.setItem('bf_token', t);
            localStorage.setItem('bf_user', JSON.stringify(u));
            setToken(t);
            setUser(u);
            setLoading(false);
            navigate('/');
            toast.success('Registration successful, logged in!');
            return { ok: true };
        } catch (err) {
            setLoading(false);
            const msg = err.response?.data?.message || "Login failed";
            toast.error(msg); // Show toast instantly
            return { ok: false, error: msg };
        }
    };

    const login = async ({ email, password }) => {
        setLoading(true);
        try {
            const res = await api.post('/auth/login', { email, password });
            const { token: t, user: u } = res.data;
            localStorage.setItem('bf_token', t);
            localStorage.setItem('bf_user', JSON.stringify(u));
            setToken(t);
            setUser(u);
            setLoading(false);
            navigate('/');
            toast.success('Login successful!');
            return { ok: true };
        } catch (err) {
            setLoading(false);
            const msg = err.response?.data?.message || "Login failed";
            toast.error(msg); // Show toast instantly
            return { ok: false, error: msg };
        }
    };

    const logout = () => {
        localStorage.removeItem('bf_token');
        localStorage.removeItem('bf_user');
        setToken(null);
        setUser(null);
        navigate('/login');
        toast.info('Logged out successfully');
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);