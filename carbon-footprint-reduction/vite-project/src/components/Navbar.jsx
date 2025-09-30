import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="bg-green-700 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">🌱 Carbon Tracker</h1>
      <div className="space-x-4 flex items-center">
        {!user ? (
          <>
            <Link to="/register" className="hover:underline">Register</Link>
            <Link to="/login" className="hover:underline">Login</Link>
          </>
        ) : (
          <>
            <Link to="/calculator" className="hover:underline">Calculator</Link>
            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
            <Link to="/suggestions" className="hover:underline">Suggestions</Link>
            <button
              onClick={handleLogout}
              className="ml-4 bg-white text-green-700 font-semibold px-3 py-1 rounded hover:bg-gray-100 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
