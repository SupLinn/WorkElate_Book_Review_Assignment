import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import BooksPage from '../pages/BooksPage';
import BookPage from '../pages/BookPage';
import ProfilePage from '../pages/ProfilePage';
import Login from '../pages/LoginPage';
import Signup from '../pages/SignupPage';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/books" element={<BooksPage />} />
      <Route path="/books/:id" element={<BookPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
}

export default AppRouter;
