import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';

const Register = () => {
    const { register, loading } = useAuth();
    const [form, setForm] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');
        const res = await register(form);
        if (!res.ok) setError(res.error || 'Registration failed');
    };

    return (
        <>
            <Header />
            <div className="min-h-screen flex items-center justify-center bg-variable dark:bg-gray-900 px-4">
                <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl p-8 shadow">
                    <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800 dark:text-white">Create account</h2>

                    {error && <div className="bg-red-100 dark:bg-red-900 text-red-800 px-3 py-2 rounded mb-3">{error}</div>}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            placeholder="Username"
                            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
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
                            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                            disabled={loading}
                        >
                            {loading ? 'Creating...' : 'Register'}
                        </button>
                    </form>

                    <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-300">
                        Already have an account? <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline">Login</Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Register;
