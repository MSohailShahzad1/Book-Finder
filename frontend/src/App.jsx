import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import MyLibrary from './pages/MyLibrary';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import BookDetails from './pages/BookDetails';

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/book/:id" element={<BookDetails />} />
        {/* Protected: My Library */}
        <Route path="/my-library" element={
          <ProtectedRoute>
            <MyLibrary />
          </ProtectedRoute>
        } />

        {/* add more routes like /book/:id later */}
      </Routes>
    </>
  );
}

export default App;
