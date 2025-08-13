require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Load environment variables
const bookRoutes = require('./routes/bookRoute');
const connectDB = require('./config/dbConnection');
const authRoutes = require('./routes/authRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/books', bookRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/favorites', favoriteRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});