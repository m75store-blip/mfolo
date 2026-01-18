import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            <span className="brand-icon">⚡</span>
            <span className="brand-text">متجر المتابعين</span>
          </Link>

          <div className="navbar-links">
            <Link to="/" className="nav-link">الرئيسية</Link>
            <Link to="/products" className="nav-link">المنتجات</Link>
            {user && (
              <>
                <Link to="/order" className="nav-link">إنشاء طلب</Link>
                <Link to="/profile" className="nav-link">حسابي</Link>
              </>
            )}
            {user?.isAdmin && (
              <Link to="/admin" className="nav-link admin-link">لوحة التحكم</Link>
            )}
            <Link to="/terms" className="nav-link">الشروط</Link>
          </div>

          <div className="navbar-auth">
            {user ? (
              <>
                <span className="user-name">مرحباً، {user.name}</span>
                <button onClick={handleLogout} className="btn btn-secondary">
                  تسجيل الخروج
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-secondary">تسجيل الدخول</Link>
                <Link to="/register" className="btn btn-primary">إنشاء حساب</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
