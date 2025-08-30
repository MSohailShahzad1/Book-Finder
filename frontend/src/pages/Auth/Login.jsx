import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';

const Login = () => {
    const { login, loading } = useAuth();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');
        const res = await login(form);
        if (!res.ok) setError(res.error || 'Login failed');
    };

    return (
        <>
            <Header />
            <div className="min-h-screen flex items-center justify-center bg-variable dark:bg-gray-900 px-4">
                <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl p-8 shadow">
                    <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800 dark:text-white">
                        Login
                    </h2>

                    {error && (
                        <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-3 py-2 rounded mb-3">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="email"
                            required
                        />
                        <input
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="password"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-300">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-blue-600 dark:text-blue-400 hover:underline">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Login;
