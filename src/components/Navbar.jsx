import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Droplet, User, LogOut, LayoutDashboard, PlusCircle, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="glass-card sticky top-4 mx-4 z-50 mb-8 px-6 py-4 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
        <Droplet fill="currentColor" size={32} />
        <span>BloodBank</span>
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/" className="hover:text-primary transition-colors font-medium">Home</Link>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-surface-light/50 hover:bg-surface-light transition-colors text-text-muted hover:text-primary"
          aria-label="Toggle Theme"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <Link 
          to={user ? "/create-request" : "/login"} 
          className="flex items-center gap-2 hover:text-primary transition-colors"
        >
          <PlusCircle size={20} />
          <span>Request Blood</span>
        </Link>

        {user ? (
          <>
            <Link to="/dashboard" className="flex items-center gap-2 hover:text-primary transition-colors">
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </Link>

            <Link to="/profile" className="flex items-center gap-2 hover:text-primary transition-colors">
              <User size={20} />
              <span>{user.username}</span>
            </Link>
            <button
              onClick={handleLogout}
              className="btn btn-outline py-2 px-4 flex items-center gap-2"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-primary transition-colors">Login</Link>
            <Link to="/register" className="btn btn-primary py-2 px-6">Join as Donor</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
