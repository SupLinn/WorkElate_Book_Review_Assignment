import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md p-4 flex items-center justify-between">
      {/* Logo / Brand */}
      <Link to="/" className="text-xl font-bold text-blue-600">
        BookVerse
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-8 text-gray-700 font-medium text-sm">
        <NavLink to="/" className="hover:text-blue-600">Home</NavLink>
        <NavLink to="/books" className="hover:text-blue-600">Books</NavLink>
        <NavLink to="/profile" className="hover:text-blue-600">Profile</NavLink>
        {token ? (
          <button onClick={handleLogout} className="hover:text-red-600">Logout</button>
        ) : (
          <NavLink to="/login" className="hover:text-blue-600">Login</NavLink>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden text-gray-600" 
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* Mobile Sidebar */}
      {menuOpen && (
        <div className="absolute top-16 right-0 w-48 bg-white shadow-md flex flex-col gap-4 p-4 md:hidden">
          <NavLink to="/" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">Home</NavLink>
          <NavLink to="/books" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">Books</NavLink>
          <NavLink to="/profile" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">Profile</NavLink>
          {token ? (
            <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="hover:text-red-600 text-left">Logout</button>
          ) : (
            <NavLink to="/login" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">Login</NavLink>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
